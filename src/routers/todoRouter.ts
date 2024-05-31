import { Router } from 'express'
import { getTodos, getSpecificTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todosController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const todosRouter = Router();

todosRouter.use(authMiddleware);

// /api/v1/todos
todosRouter.get('/', getTodos)
todosRouter.get('/:todoId', getSpecificTodos)
todosRouter.post('/createTodo', createTodo)
todosRouter.put('/updateTodo/:todoId', updateTodo)
todosRouter.delete('/deleteTodo/:todoId', deleteTodo)
