import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    const url = new URL(req.url);
    const user = url.searchParams.get('user');
    const targetName = url.searchParams.get('target');

    try {
        // Find users whose names contain the input string
        const targetUsers = await prisma.user.findMany({
            where: {
                name: {
                    contains: targetName || ""// Filter for names containing the input string
                }
            },
            select: {
                email: true
            }
        });

        if (targetUsers.length === 0) {
            return NextResponse.json({ message: 'No users found' }, { status: 404 });
        }

        const userConversations = await prisma.participant.findMany({
            where: {
                userEmail: `${String(user)}@gmail.com`
            },
            select: {
                conversationId: true
            }
        });

        const targetConversations = await prisma.participant.findMany({
            where: {
                userEmail: {
                    in: targetUsers.map(user => user.email || "") // Get conversations for all found users
                }
            },
            select: {
                conversationId: true
            }
        });

        const commonConversations = userConversations.filter(uc =>
            targetConversations.some(tc => tc.conversationId === uc.conversationId)
        );

        // Fetch conversation details for the common conversations
        const data = await Promise.all(commonConversations.map(async conversation => {
            const convData = await prisma.conversation.findUnique({
                where: {
                    id: conversation.conversationId
                },
                include: {
                    participants: {
                        include: {
                            user: true
                        }
                    }
                }
            });
            if (convData) {
                return {
                    unreadMessageCount: convData.unreadMessageCount || "",
                    lastMessage: convData.lastMessage,
                    lastMessageAt: convData.lastMessageAt,
                    id: convData.id,
                    participants: convData.participants.map(participant => ({
                        name: participant.user.name,
                        email: participant.user.email,
                        image: participant.user.image,
                        id: participant.user.id
                    }))
                };
            }
        }));

        return NextResponse.json({ data }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
