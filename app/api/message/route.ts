import { prisma } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowedd' }, { status: 405 });
    }

    const body = await req.json();

    try {
        const message = await prisma.message.create({
            data: {
                user1Email: body.user1Email,
                user2Email: body.user2Email,
                content: body.content,
                readStatus: false,
                timestamp: new Date(),
            },
        });

        const friend = await prisma.friend.updateMany({
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
            data: {
                lastMessage: body.content,
                lastMessageAt: new Date(),
            },
        });

        await pusherServer.trigger(body.userId, 'newMsg', message);

        return NextResponse.json({ message: "message send" }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}