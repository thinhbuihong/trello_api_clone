import { NextFunction, Request, Response } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    res.status(401);
    throw new Error("not authorized");
  }

  next();
};
