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

export const todoCreateSchema = zod.string().min(2)

export const todoUpdateSchema = zod.string().min(2)
