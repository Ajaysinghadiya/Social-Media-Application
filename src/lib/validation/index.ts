import { z } from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message:"Too Short"}),
    username: z.string().min(2, {message:"Too Short"}),
    email:z.string().email(),
    password: z.string().min(6, { message:"Password must be atleast 6 characters"}),
});

export const SigninValidation = z.object({
    email:z.string().email(),
    password: z.string().min(6, { message:"Password must be atleast 6 characters"}),
});