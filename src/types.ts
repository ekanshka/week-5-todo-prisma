import zod from 'zod'

export const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(3),
    firstName: zod.string(),
    lastName: zod.string()
})

export const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(3),
})


export const todoCreateSchema = zod.object({
    body: zod.string().min(2)
})



