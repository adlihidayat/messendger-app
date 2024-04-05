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
        const conversation = await prisma.conversation.create({
            data: {
                unreadMessageCount: 0,
                lastMessage: "Start chatting now!",
                lastMessageAt: new Date(),
            },
        });

        await prisma.participant.createMany({
            data: [
                { userEmail: body.user1Email, conversationId: conversation.id },
                { userEmail: body.user2Email, conversationId: conversation.id }
            ]
        });


        return NextResponse.json({ message: "Added" }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    const url = new URL(req.url);
    const user = url.searchParams.get('user');

    try {
        // Find conversations where the participant userEmail matches the provided user
        const participantConversations = await prisma.participant.findMany({
            where: {
                userEmail: `${String(user)}@gmail.com`
            },
            include: {
                conversation: {
                    include: {
                        participants: {
                            include: {
                                user: true // Include user details for each participant
                            }
                        }
                    }
                }
            }
        });

        // Extract conversation details from the fetched conversations
        const data = participantConversations.map(participantConversation => {
            const conversation = participantConversation.conversation;
            return {
                unreadMessageCount: conversation.unreadMessageCount,
                lastMessage: conversation.lastMessage,
                lastMessageAt: conversation.lastMessageAt,
                id: conversation.id,
                participants: conversation.participants.map(participant => ({
                    name: participant.user.name,
                    email: participant.user.email,
                    image: participant.user.image,
                    id: participant.user.id
                }))
            };
        });

        return NextResponse.json({ data }, { status: 200 });
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
        const conversation = await prisma.conversation.findFirst({
            where: {
                participants: {
                    some: {
                        OR: [
                            { userEmail: body.user1Email },
                            { userEmail: body.user2Email }
                        ]
                    }
                }
            }
        });

        if (!conversation) {
            return NextResponse.json({ message: 'Conversation not found' }, { status: 404 });
        }

        // Delete all messages associated with the conversation
        await prisma.message.deleteMany({
            where: {
                conversationId: conversation.id
            },
        });

        // Delete the conversation itself
        await prisma.conversation.delete({
            where: {
                id: conversation.id
            },
        });

        // Delete all participants associated with the conversation
        await prisma.participant.deleteMany({
            where: {
                conversationId: conversation.id
            }
        });
        return NextResponse.json({ message: "deleted" }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}






