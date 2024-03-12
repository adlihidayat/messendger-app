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

export const getLatestOnline = async (user1Email: string) => {
    try {
        const latestQuery = await prisma.message.findMany({
            where: {
                user1Email: user1Email
            },
            orderBy: {
                id: 'desc',
            },
            take: 1,
        })
        return latestQuery;
    } catch (error) {
        console.error(error);
        return error; // Handle errors gracefully
    } finally {
        await prisma.$disconnect(); // Close Prisma connection to avoid resource leaks
    }
};

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

export const checkFriendStatus = async (user1Email: any, user2Email: any) => {
    try {
        const existingFriend1 = await prisma.friend.findFirst({
            where: {
                user1Email,
                user2Email,
            },
        });

        // Check for existing friendship (2nd user as user1)
        const existingFriend2 = await prisma.friend.findFirst({
            where: {
                user1Email: user2Email,
                user2Email: user1Email,
            },
        });

        if (existingFriend1 || existingFriend2) {
            return true
        }

    } catch (error) {
        return false;
    } finally {
        await prisma.$disconnect(); // Close Prisma connection to avoid resource leaks
    }
};
