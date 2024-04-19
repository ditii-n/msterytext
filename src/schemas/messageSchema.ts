import { Content } from "next/font/google";
import {z} from "zod";

export const messageSchema = z.object({
    content:z
    .string()
    .min(10,{message:"content must be atleast 10 characters"})
    .max(300,{message:"message cant be more than 300"})
})