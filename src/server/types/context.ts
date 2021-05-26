import { Request, Response } from "express";
import { User } from "../entities";
import { DataLoaders } from "./dataloaders";

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}

export type MyContext = {
    req: Request;
    res: Response;
    loaders: DataLoaders;
};
