import resend from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from:'Aditi.N@ibsfintech.com',
            to:'email',
            subject: 'Mystry Message|Verification code',
            react: VerificationEmail({username,otp:verifyCode}),
        });

        return{
            success:true,
            message:"verification email sent successfully"
        }
        
    } catch (emailError) {
        console.error("error sending verification email",emailError)
        return{
            success:false,
            message:"error sending verification email"
        }
    }
}
