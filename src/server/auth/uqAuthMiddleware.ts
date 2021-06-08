import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { redacted } from "../constants";

type KVD = {
    email?: string;
    name?: string;
};

export const uqAuthMiddleware = async (
    req: Request,
    _: Response,
    next: NextFunction
): Promise<void> => {
    const username = req.get("X-Uq-User");
    // No username specified.
    if (!username) {
        return next();
    }

    // Return user if found
    let user = await User.findOne({ where: { username } });
    const kvd = JSON.parse(req.get("X-Kvd-Payload") || "{}") as KVD;
    if (user) {
        req.user = user;
        if (user.email === redacted) {
            user.email = kvd.email || redacted;
        }
        if (user.name === redacted) {
            user.name = kvd.name || redacted;
        }
        await user.save();
        return next();
    }

    // No user found, create new user and set up name and email
    user = await User.create({
        username,
        email: kvd.email || redacted,
        name: kvd.name || redacted,
    }).save();
    req.user = user;
    return next();
};
