import { prisma } from "./db";

export const getUserData = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
        });
        return user;
    } catch (error) {
        console.error(error);
        return error; // Handle errors gracefully
    } finally {
        await prisma.$disconnect(); // Close Prisma connection to avoid resource leaks
    }
};

// export const getLatestOnline = async (user1Email: any, user2Email: any) => {
//     try {
//         const latestQuery = await prisma.conversation.findMany({
//             where: {
//                 userEmails: {
//                     hasEvery: [user1Email, user2Email]
//                 },
//             },
//             orderBy: {
//                 id: 'desc',
//             },
//             take: 1,
//         })
//         return latestQuery;
//     } catch (error) {
//         console.error(error);
//         return error; // Handle errors gracefully
//     } finally {
//         await prisma.$disconnect(); // Close Prisma connection to avoid resource leaks
//     }
// };

export const checkUserExistence = async (email: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            },
        });

        return !!user; // Return true if user exists, false otherwise
    } catch (error) {
        console.error(error);
        return false; // Handle errors gracefully, consider returning a specific error code
    } finally {
        await prisma.$disconnect(); // Close Prisma connection to avoid resource leaks
    }
};

export async function getOppositeUserByConversationId(conversationId: string, user: string) {
    try {
        const participants = await prisma.participant.findMany({
            where: {
                conversationId: conversationId,
            },
            include: {
                user: true, // Include the user details
            },
        });

        // Extract user details from the fetched participants
        const users = participants.map(participant => participant.user);

        if (users[0].email === user) {
            return users[1];
        }
        return users[0];
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch users.'); // Handle errors gracefully
    }
}

export const checkFriendStatus = async (user1Email: string, user2Email: string) => {
    try {
        // Find conversations where user1 is a participant
        const user1Conversations = await prisma.participant.findMany({
            where: { userEmail: user1Email }
        });

        // Check if there exists a conversation where both users are participants
        for (const conversation of user1Conversations) {
            const existingParticipant = await prisma.participant.findFirst({
                where: {
                    conversationId: conversation.conversationId,
                    userEmail: user2Email
                }
            });

            if (existingParticipant) {
                // Conversation between the two users found
                return true;
            }
        }

        // No existing conversation found between the two users
        return false;
    } catch (error) {
        console.error("Error in checkFriendStatus:", error);
        return false;
    }
};

