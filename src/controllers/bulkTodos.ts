import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient();

export const bulkTodos = async (req:Request, res:Response) => {
    try {
        const todos = await prisma.todo.findMany({});

        if (!todos) {
            res.json({
                msg: "no todos found"
            })
            return
        }

        res.status(200).json({todos: todos})

    } catch (error) {
        
        res.status(500).json({
            msg: "error fetching todos"
        })
    }
}