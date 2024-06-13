import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas/route";
import bcrypt from "bcryptjs"
import { prisma } from "./lib/db";
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"

export default { providers: [
    Google,
    Github,
    Credentials({
        async authorize(credentials){
            const validatedFields = LoginSchema.safeParse(credentials);
            if (validatedFields.success) {
                const {email,password} = validatedFields.data;

                const user = await prisma.user.findUnique({
                    where:{
                        email
                    }
                  }); 

                  if (!user || !user.password) {
                     return null
                  }

                  const passwordMatch = await bcrypt.compare(password, user.password);
                  if (passwordMatch) {
                    return user;
                  }
            }

            return null;


        }
    })
    ] } satisfies NextAuthConfig;
