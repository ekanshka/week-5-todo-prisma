import express from 'express'
import { userRouter } from './routers/userRouter';
import { todosRouter } from './routers/todoRouter';
import { bulkTodos } from './controllers/bulkTodos';
import { authMiddleware } from './middlewares/authMiddleware';


const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/todos', todosRouter);
app.get('/api/v1/bulk', bulkTodos);


export default app;