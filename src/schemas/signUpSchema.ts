import {z} from "zod";

export const usernameValidation=z
 .string()
 .min(2,"username must be atleast two characters")
 .max(20,"username must not be more than twenty characters")
 .regex(/^[a-zA-Z0-9_]+$/,"username must contain special characters")

 export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"password must be aleast 6 characters"})

 })