import Ajv, { ErrorObject } from "ajv";
import { NextFunction, Request, Response } from "express";
import { SCHEMA } from "../constants";
import { newBoardSchema } from "../schemas/board/newBoardSchema";
import { newCardSchema } from "../schemas/card/newCardSchema";
import { updateCardSchema } from "../schemas/card/updateCardSchema";
import { newListSchema } from "../schemas/list/newListSchema";
import { updateListSchema } from "../schemas/list/updateListSchema";
import { signupSchema } from "../schemas/user/signupSchema";

const ajv = new Ajv({ allErrors: true, removeAdditional: "all" });

ajv.addSchema(signupSchema, SCHEMA.SIGNUP);
ajv.addSchema(newBoardSchema, SCHEMA.NEWBOARD);
ajv.addSchema(newListSchema, SCHEMA.NEWLIST);
ajv.addSchema(updateListSchema, SCHEMA.UPDATELIST);
ajv.addSchema(newCardSchema, SCHEMA.NEWCARD);
ajv.addSchema(updateCardSchema, SCHEMA.UPDATECARD);

export function errorResponse(schemaErrors: ErrorObject[]) {
  let errors = schemaErrors.map((error) => {
    return {
      path: error.instancePath,
      message: error.message,
    };
  });
  return {
    status: "failed",
    errors: errors,
  };
}

export const validateSchema = (schemaName: SCHEMA) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajv.validate(schemaName, req.body);
    if (!valid) {
      res.status(401).json(errorResponse(ajv.errors!));
      return;
    }
    next();
  };
};
