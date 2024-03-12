import { PrismaAdapter } from "@auth/prisma-adapter";

import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db";

export const authOptions: NextAuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET_ID as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
};