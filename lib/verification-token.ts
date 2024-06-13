import { prisma } from "./db";

export const getVerificationByToken = async (token: string)  =>{
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where:{token}
        });

        return verificationToken;

    } catch {
        return null
    }
}



export const getVerificationByEmail = async (email: string)  =>{
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where:{email}
        });

        return verificationToken;

    } catch {
        return null
    }
}



