import { Router } from 'express'
import { getTodos, getSpecificTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todosController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const todosRouter = Router();

todosRouter.use(authMiddleware);

todosRouter.get('/todos', getTodos)
todosRouter.get('/todos/:todoId', getSpecificTodos)
todosRouter.post('/createTodo', createTodo)
todosRouter.post('/updateTodo/:todoId', updateTodo)
todosRouter.post('/deleteTodo/:todoId', deleteTodo)
