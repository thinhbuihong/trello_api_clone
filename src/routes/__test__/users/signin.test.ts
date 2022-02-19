import request from "supertest";
import app from "../../../app";
import { COOKIE_NAME } from "../../../constants";

it("fails when username does not exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      username: "username",
      password: "password",
    })
    .expect(400);
});

it("signin with valid username and password", async () => {
  await request(app)
    .post("/api/users")
    .send({
      username: "username",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      username: "username",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).not.toEqual(
    `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
});

it("returns a 400 with an invalid password or username", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      username: "username",
      password: "asd",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({
      username: "user",
      password: "password",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({
      username: "user",
      password: "pard",
    })
    .expect(400);

  await request(app).post("/api/users/signin").send({}).expect(400);
});
