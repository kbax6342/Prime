import * as z from "zod"

export const SignUpValidation = z.object({
   
    password: z.string().min(5 ,{ message: "Password must be longer passwsord"}),
    username: z.string().min(3, {message:"Too-short"}),
    email: z.string().email(),
    phone: z.string(),
    name: z.string(),
    zipcode: z.number()
    
  });

export const SigninValidation = z.object({
    //username:
})