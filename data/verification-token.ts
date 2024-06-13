import { prisma } from "@/lib/db"

export const getPasswordResetTokenByToken = async (token:string)=>{
    try {
        const passwordResetToken = await prisma.passwordRestToken.findUnique({
            where:{token}
        });

        return passwordResetToken
    } catch {
        return null
    }
}



export const getPasswordResetTokenByEmail = async (email:string)=>{
    try {
        const passwordResetToken = await prisma.passwordRestToken.findFirst({
            where:{email}
        });

        return passwordResetToken
    } catch {
        return null
    }

}