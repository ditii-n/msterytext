import dbConnect from "@/lib/dbConnect";
import {z} from "zod";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { messageSchema } from "@/schemas/messageSchema";

const usernameQuerySchema=z.object({
    username: usernameValidation
})

export async function GET(request:Request){
    await dbConnect();
    try {
        const {searchParams}= new URL(request.url)
        const queryParam ={
            username:searchParams.get("username")
        }
        //validate with zod
        const result = usernameQuerySchema.safeParse(queryParam)
        console.log(result)
        if(!result.success){
            const usernameErrors=result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message:usernameErrors.length>0?usernameErrors.join(',') : "Invalid query parameters",
            },{status:400})

        }

        const {username}=result.data
        const existingUser = await UserModel.findOne({username,isVerified:true})
        if(existingUser){
            return Response.json({
                success:false,
                message:"username is already taken",
            },{status:400})
        }

        return Response.json({
            success:true,
            message:"username is unique",
        },{status:400})

    } catch (error) {
        console.error("error checking username",error)
        return Response.json({
            success:false,
            message: "error checking username"
        },
    {status:500})
            
    }
}