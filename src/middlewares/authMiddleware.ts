import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        res.status(401).json({msg: 'unauthorized'})
        return; 
    }

    const token = authHeaders.split(' ')[1];

    if (!token) {
        res.status(401).json({msg: 'unauthorized'});
        return;
    }

    try {
        const verified = <jwt.JwtPayload>jwt.verify(token, process.env.JWT_SECRET as string);
    
        if (!verified.userId) {
            res.status(401).json({msg: 'unauthorized'});
            return;
        }
    
        res.locals.userId = verified.userId;
        next();
    } catch (error) {
        res.status(403).json({msg: 'unauthorized'});
        return;
    }
}