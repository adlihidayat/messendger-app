import { prisma } from "./db";

export async function getMessage(user1Email: any, user2Email: any) {
    try {
        const data = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        user1Email: user1Email,
                        user2Email: user2Email
                    },
                    {
                        user1Email: user2Email,
                        user2Email: user1Email
                    },
                ],
            },
            orderBy: {
                timestamp: "asc",
            },
        });

        return data;
    } catch (error) {
        console.error(error);
        return error; // Handle errors gracefully
    } finally {
        await prisma.$disconnect(); // Close Prisma connection to avoid resource leaks
    }
}
