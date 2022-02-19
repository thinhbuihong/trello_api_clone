import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("reponds with details about the current user", async () => {
  const cookie = await signinHelper(app);

  const response = await request(app)
    .get("/api/users")
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.username).toEqual("username");
});

it("responds 404 if not authenticated", async () => {
  const response = await request(app).get("/api/users").send().expect(401);
  expect(response.body.username).toBeUndefined;
});
