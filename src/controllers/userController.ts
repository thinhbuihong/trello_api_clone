import { hash } from "argon2";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { COOKIE_NAME } from "../constants";
import { UserModel } from "../models/user.model";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const exitingUser = await UserModel.findOne({
    username,
  });
  if (exitingUser) {
    res.status(400);
    throw new Error("username already existed");
  }

  const hashedPassword = await hash(password);
  const user = await UserModel.create({
    username,
    password: hashedPassword,
  });

  req.session.userId = user._id;
  res.status(201).json(user);
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await UserModel.findOne({ username }).select(
    "+password"
  );
  if (!existingUser) {
    res.status(400);
    throw new Error("username is incorrect");
  }

  // const passwordValid = await verify(existingUser.password, password);
  const passwordValid = await existingUser.matchPassword(password);
  if (!passwordValid) {
    res.status(400);
    throw new Error("password or username is incorrect");
  }

  req.session.userId = existingUser._id;
  res.json({
    user: existingUser,
  });
});

export const user = asyncHandler(async (req: Request, res: Response) => {
  if (!req.currentUser) {
    res.status(401);
    throw new Error("not authenticated");
  }
  res.json(req.currentUser);
});

export const signout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  req.session.destroy((err) => {
    if (err) {
      console.log("destroying session error", err.message);
    }
  });
  res.send(true);
});
