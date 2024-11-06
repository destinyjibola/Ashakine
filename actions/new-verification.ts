"use server"

import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db"
import { getVerificationByToken } from "@/lib/verification-token"
import { getUserByEmail } from "@/user";


export const Verification = async (token:string) =>{
    const isloggedin = await currentUser();

    const existingToken = await getVerificationByToken(token);

    if (!existingToken) {
        return {error : "Token does not exist"}
    }

    const hasExpired = new Date(existingToken.expires) <  new Date();

    if (hasExpired) {
        return {error: "Token has expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email);


    if (!isloggedin) {
        
    }

    if (!existingUser) {
        return {error: "Email does not exist"}
    }

    await prisma.user.update({
        where:{id: existingUser.id},
        data:{
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await prisma.verificationToken.delete({
        where: {id: existingToken.id}
    })

    return {success: "Email Verified"}

     



}