import z from "zod"


const SignupSchema = z.object({
    email: z.string()
        .email()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid email format' }),
    password: z.
        string()
})


export default SignupSchema