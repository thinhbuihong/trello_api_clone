import express from "express";
import { SCHEMA } from "../constants";
import { signin, signout, signup, user } from "../controllers/userController";
import { currentUser } from "../middlewares/currentUser";
import { validateSchema } from "../middlewares/validateSchema";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(validateSchema(SCHEMA.SIGNUP), signup)
  .get(currentUser, user);
userRouter.route("/signin").post(validateSchema(SCHEMA.SIGNUP), signin);
userRouter.route("/signout").get(signout);

export default userRouter;
