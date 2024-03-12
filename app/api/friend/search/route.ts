import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method Not Allowedd' }, { status: 405 });
    }

    const url = new URL(req.url); // Create a URL object
    const friend = url.searchParams.get('name');
    const user = url.searchParams.get('user');
    try {
        const data = await prisma.friend.findMany({
            where: {
                user1Email: {
                    contains: String(user)
                },
                user: {
                    name: { contains: String(friend) }
                }
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
        });
        return NextResponse.json({ data }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
}
