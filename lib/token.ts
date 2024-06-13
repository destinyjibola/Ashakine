import {v4 as uuidv4} from 'uuid'
import { prisma } from './db'
import { getVerificationByEmail } from './verification-token';
import { getPasswordResetTokenByEmail } from '@/data/verification-token';
import crypto from "crypto"
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';


export const generateTwoFactorToken = async (email:string)=>{
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    // todo later changes to 15minute
    const expires = new Date(new Date().getTime() + 5 * 6 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await prisma.twoFactorToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }

    const twoFactorToken = await prisma.twoFactorToken.create({
        data:{
            email,token,expires
        }
    })

    return twoFactorToken


}


export const generatePasswordResetToken = async (email:string) =>{
    const token = uuidv4();
    // const expires = new Date(new Date().getTime() * 3600 * 1000);
    const expires = new Date(new Date().getTime() + 3600 * 1000); // Correctly calculate the expiration time

    
    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await prisma.passwordRestToken.delete({
           where: {id: existingToken.id}
        })
    };

    const passwordResetToken = await prisma.passwordRestToken.create({
        data:{
            email, token, expires
        }
    });

    return passwordResetToken;
}





export const generateVerificationByToken = async (email:string)=>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationByEmail(email);

    if(existingToken){
        await prisma.verificationToken.delete({
            where:{
                id: existingToken.id
            }
        })
    };

    const verificationToken = await prisma.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })

    return verificationToken;
}