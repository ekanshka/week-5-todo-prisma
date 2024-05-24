import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { signinSchema, signupSchema } from "../types"
import { PrismaClient } from "@prisma/client"
import { compareSync, hashSync } from "bcryptjs"

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
    const parsedSignupBody = signupSchema.safeParse(req.body)

    if (!parsedSignupBody.success || !parsedSignupBody.data) {
        res.status(400).json({
            msg: "wrong inputs"
        })

        return;
    }

    try {
        const hashedPassword = hashSync(parsedSignupBody.data.password, 10);

        const user = await prisma.user.create({
            data: {
                email: parsedSignupBody.data.email,
                password: hashedPassword,
                firstName: parsedSignupBody.data.firstName,
                lastName: parsedSignupBody.data.lastName
            }
        })

        const access_token = jwt.sign(user.id.toString(), process.env.JWT_SECRET as string)

        res.status(201).json({
            msg: "User created successfully",
            token: access_token
        })

    } catch (error) {
        
        console.log("I'm the error at user signup", error)
        res.status(500).json({
            msg: "error creating user"
        })
    }
}


export const signin = async (req: Request, res: Response) => {
    const parsedSigninBody = signinSchema.safeParse(req.body)

    if (!parsedSigninBody.success || !parsedSigninBody.data) {
        res.status(400).json({
            msg: "wrong inputs"
        })

        return;
    }

    try {
        
        const user = await prisma.user.findUnique({where: { email: parsedSigninBody.data.email }})

        if (!user) {
            res.status(400).json({
                msg: "no such user found"
            })
            return
        }
            
        const correctPass = compareSync(parsedSigninBody.data.password, user.password);

        if (!correctPass) {
            res.status(400).json({
                msg: "wrong password"
            })
            return
        }

        const access_token = jwt.sign(user.id.toString(), process.env.JWT_SECRET as string)

        res.status(200).json({
            msg: "Logged in successfully",
            token: access_token
        })

    } catch (error) {
        
        console.log("I'm the error at user signin", error)      
        res.status(500).json({
            msg: "error creating user"
        })
    }
}