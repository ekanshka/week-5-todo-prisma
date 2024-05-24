import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient();

export const bulkTodos = (req:Request, res:Response) => {
    try {
        const todos = prisma.todo.findMany({});

        res.status(200).json({todos: todos})

    } catch (error) {
        
        res.status(500).json({
            msg: "error fetching todos"
        })
    }
}