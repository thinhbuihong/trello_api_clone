import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export const currentUser = expressAsyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { userId } = req.session;

    if (userId) {
      const user = (await UserModel.findOne({ _id: userId })) || undefined;
      req.currentUser = user;
    }
    next();
  }
);
