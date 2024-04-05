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
                sender: body.sender,
                conversationId: body.conversationId,
                content: body.content,
                readStatus: false,
                timestamp: new Date(),
            },
        });

        await prisma.conversation.update({
            where: {
                id: body.conversationId,
            },
            data: {
                lastMessage: body.content,
                lastMessageAt: new Date(),
            },
        });


        await pusherServer.trigger(body.conversationId, 'newMsg', message);

        return NextResponse.json({ message: "message send" }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}