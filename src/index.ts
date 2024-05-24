import express from 'express'
import { userRouter } from './routers/userRouter';
import { todosRouter } from './routers/todoRouter';


const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/todos', todosRouter);


export default app;