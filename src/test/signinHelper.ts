import { Express } from "express";
import request from "supertest";

export const signinHelper = async (app: Express) => {
  const username = "username";
  const password = "password";

  const response = await request(app)
    .post("/api/users")
    .send({ username, password })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
