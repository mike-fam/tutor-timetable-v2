import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";

type KVD = {
    email?: string;
    name?: string;
};

export const uqAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    console.log("running auth middleware");
    const username = req.get("X-Uq-User");
    // No username specified.
    if (!username) {
        return next();
    }

    // Return user if found
    let user = await User.findOne({ where: { username } });
    if (user) {
        req.user = user;
        return next();
    }

    // No user found, create new user and set up name and email
    const kvd = JSON.parse(req.get("X-Kvd-Payload") || "{}") as KVD;
    user = await User.create({
        username,
        email: kvd.email || "__redacted__",
        name: kvd.name || "__redacted__",
    }).save();
    req.user = user;
    return next();
};
