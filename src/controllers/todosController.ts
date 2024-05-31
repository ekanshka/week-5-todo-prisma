import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { todoCreateSchema } from "../types";
import { number } from "zod";

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
        console.log("im the error at creating todo for the user or : ", error)
        res.status(500).json({
            msg: "error creating todo"
        })
        return
    }

}  
 
export const updateTodo = async (req: Request, res: Response) => {
    //update a todo with the todoId in url param
    const userId = res.locals.userId;
    const todoId = req.params.todoId;

    if (!todoId) {
        res.status(400).json({
            msg: "no todo id provided"
        })
        return
    }

    try {

        // basic check to confirm todo existence and ownership of todo
        const todo = await prisma.todo.findFirst({
            where: {
                id: Number(todoId)
            }
        })
        if (!todo) {
            res.status(400).json({
                msg: "no such todo exists"
            })
            return
        }
        if (todo.userId != userId) {
            res.status(401).json({
                msg: "not allowed to update others' todos"
            })
            return
        }
        if (todo.done === true) {
            res.status(200).json({
                msg: "Already marked as done"
            })
            return
        }

        //updating
        await prisma.todo.update({
            where: {
                id: Number(todoId)
            },
            data: {
                done: true
            }
        })

        res.status(201).json({
            msg: "Successfully marked todo as done!",
            todoId: todo.id
        })

    } catch (error) {
        console.log("im the error at updating todo as done for the user or : ", error)
        res.status(500).json({
            msg: "error updating todo"
        })
        return
    }
}   

export const deleteTodo = async (req: Request, res: Response) => {
    //delete a todo with the todoId in url param
    const userId = res.locals.userId;
    const todoId = req.params.todoId;

    try {

        // basic check to confirm todo existence and ownership of todo
        const todo = await prisma.todo.findFirst({
            where: {
                id: Number(todoId)
            }
        })
        if (!todo) {
            res.status(400).json({
                msg: "no such todo exists"
            })
            return
        }
        if (todo.userId != userId) {
            res.status(401).json({
                msg: "not allowed to delete others' todos"
            })
            return
        }

        //deleting
        await prisma.todo.delete({
            where: {
                id: Number(todoId)
            }
        })

        res.status(201).json({
            msg: "Deleted the todo",
            todoId: todo.id
        })

    } catch (error) {
        console.log("im the error at deleting todo for the user or : ", error)
        res.status(500).json({
            msg: "error deleting todo"
        })
        return
    }
}   