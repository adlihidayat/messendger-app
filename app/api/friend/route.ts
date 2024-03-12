import { prisma } from '@/lib/db';
import { checkFriendStatus, checkUserExistence } from '@/lib/user-utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowedd' }, { status: 405 });
    }

    const body = await req.json();

    try {
        const userExists = await checkUserExistence(body.user2Email);
        const friendExists = await checkFriendStatus(body.user1Email, body.user2Email);
        console.log(friendExists)

        if (body.user1Email === body.user2Email) {
            return NextResponse.json({ message: 'you cant add yourself' }, { status: 400 }); // Use 400 for bad request here
        }
        if (!userExists) {
            return NextResponse.json({ message: 'User not found!' }, { status: 400 }); // Use 400 for bad request here
        }

        if (friendExists) {
            return NextResponse.json({ message: 'Already A Friend!' }, { status: 400 }); // Use 400 for bad request here
        }

        // Create the friend request if user2 exists
        const friend = await prisma.friend.create({
            data: {
                user1Email: body.user1Email,
                user2Email: body.user2Email,
                unreadMessageCount: 0,
                lastMessage: "Start chatting now!",
                lastMessageAt: new Date(),
            },
        });
        const friend2 = await prisma.friend.create({
            data: {
                user1Email: body.user2Email,
                user2Email: body.user1Email,
                unreadMessageCount: 0,
                lastMessage: "Start chatting now!",
                lastMessageAt: new Date(),
            },
        });
        return NextResponse.json({ message: "Added" }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method Not Allowedd' }, { status: 405 });
    }

    const url = new URL(req.url); // Create a URL object
    const user = url.searchParams.get('user');

    try {
        const data = await prisma.friend.findMany({
            where: {
                user1Email: { contains: String(user) }
            },
            select: {
                unreadMessageCount: true,
                lastMessage: true,
                lastMessageAt: true,
                id: true,
                user: {
                    select: {
                        name: true,
                        image: true,
                        id: true
                    },
                },
            },
        })
        return NextResponse.json({ data }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    if (req.method !== 'DELETE') {
        return NextResponse.json({ message: 'Method Not Allowedd' }, { status: 405 });
    }

    const body = await req.json();

    try {
        const friend = await prisma.friend.deleteMany({
            where: {
                OR: [
                    {
                        user1Email: body.user1Email,
                        user2Email: body.user2Email
                    },
                    {
                        user1Email: body.user2Email,
                        user2Email: body.user1Email
                    },
                ],
            },
        })
        const message = await prisma.message.deleteMany({
            where: {
                OR: [
                    {
                        user1Email: body.user1Email,
                        user2Email: body.user2Email
                    },
                    {
                        user1Email: body.user2Email,
                        user2Email: body.user1Email
                    },
                ],
            },
        })
        return NextResponse.json({ message: "deleted" }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}






