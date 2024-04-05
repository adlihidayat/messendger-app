import { prisma } from "./db";

export async function getMessages(conversationId: string) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId,
            },
            orderBy: {
                timestamp: 'asc', // or 'desc' for descending order
            },
        });
        return messages;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch messages.'); // Handle errors gracefully
    }
}
export async function getConversation(conversationId: string) {
    try {
        const messages = await prisma.conversation.findMany({
            where: {
                id: conversationId,
            },
        });
        return messages;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch messages.'); // Handle errors gracefully
    }
}
