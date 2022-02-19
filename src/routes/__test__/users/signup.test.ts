import request from "supertest";
import app from "../../../app";
import { COOKIE_NAME } from "../../../constants";

it("returns a 201 on successful signup", async () => {
  await request(app)
    .post("/api/users")
    .send({
      username: "username",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid username (less then 6 character)", async () => {
  await request(app)
    .post("/api/users")
    .send({
      username: "user1",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password (less then 4 character)", async () => {
  await request(app)
    .post("/api/users")
    .send({
      username: "username",
      password: "asd",
    })
    .expect(400);
});

it("returns a 400 with missing user or password", async () => {
  await request(app)
    .post("/api/users")
    .send({
      username: "username",
    })
    .expect(400);
  request(app)
    .post("/api/users")
    .send({
      password: "password",
    })
    .expect(400);
  request(app).post("/api/users").send({}).expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users")
    .send({
      username: "username",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).not.toEqual(
    `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
});
