import { Router } from 'express'
import { signin, signup } from '../controllers/authController';

export const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
