import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // if (err instanceof CustomError) {
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }

  console.log("===", err.name, err.message);
  res.send({
    message: err.message,
  });
};
