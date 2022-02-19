import request from "supertest";
import app from "../../../app";
import { COOKIE_NAME } from "../../../constants";

it("clears the cookie after signout", async () => {
  await request(app)
    .post("/api/users/")
    .send({
      username: "username",
      password: "password",
    })
    .expect(201);

  const response = await request(app).get("/api/users/signout").expect(200);

  expect(response.get("Set-Cookie")).toEqual([
    `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
  ]);
});
