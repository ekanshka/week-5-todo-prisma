import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { todoCreateSchema } from "../types";

const prisma = new PrismaClient();

export const getTodos = async (req: Request, res: Response) => {
    //get all todos of current user
    const userId = res.locals.userId;
    try {
        const userTodos = await prisma.todo.findMany({
            where: {
                userId: userId
            }
        })

        res.status(200).json({
            todos: userTodos
        })

    } catch (error) {
        console.log("im the error at getting all todos for the user or : ", error)
        res.status(500).json({
            msg: "error fetching data for current user"
        })
        return
    }
}

export const getSpecificTodos = async (req: Request, res: Response) => {
    //fetch todo with todoId in the url param
    const userId = res.locals.userId;
    const todoId = req.params.todoId;

    if (!todoId) {
        res.status(400).json({
            msg: "No todo id provided"
        })
        return
    }

    try {
        const todo = await prisma.todo.findFirst({
            where: {
                id: Number(todoId)
            }
        })

        if (todo?.userId != userId) {
            res.status(401).json({
                msg: "Not allowed to see others' todos"
            })
        } else {
            res.status(200).json({
                todo: todo
            })
        }


    } catch (error) {
        console.log("im the error at getting specific todo for the user or : ", error)
        res.status(500).json({
            msg: "error fetching data"
        })
        return
    }

}   

export const createTodo = async (req: Request, res: Response) => {
    
    //create a new todo with req body (validated)
    const userId = res.locals.userId;
    const parsedTodoBody = todoCreateSchema.safeParse(req.body);

    if (!parsedTodoBody.success) {
        res.status(400).json({
            msg: "incorrect inputs"
        })
        return
    }

    try {
        // how would i create a todo for the current user and have data on both the tables?
        const todo = await prisma.todo.create({
            data: {
                body: parsedTodoBody.data.body,
                userId: userId
            }
        })

        res.status(201).json({
            msg: "Successfully created a new todo!",
            todoId: todo.id
        })

    } catch (error) {
        console.log("im the error at getting all todos for the user or : ", error)
        res.status(500).json({
            msg: "error fetching data for current user"
        })
        return
    }

}  
 
export const updateTodo = async (req: Request, res: Response) => {
    //update a todo with the todoId in url param
    const userId = res.locals.userId;

}   

export const deleteTodo = async (req: Request, res: Response) => {
    //delete a todo with the todoId in url param
    const userId = res.locals.userId;

}   