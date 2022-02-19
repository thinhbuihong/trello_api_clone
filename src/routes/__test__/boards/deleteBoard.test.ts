import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("cant delete board without login", async () => {
  await request(app)
    .delete("/api/boards/620f3bf69159ad3a05c95a0a")
    .send()
    .expect(401);
});

it("cant delete board without board in db", async () => {
  const cookie = await signinHelper(app);

  await request(app)
    .delete("/api/boards/620f3bf69159ad3a05c95a0a")
    .set("Cookie", cookie)
    .send()
    .expect(404);
});

it("successfully delete board", async () => {
  const cookie = await signinHelper(app);

  const response = await request(app)
    .post("/api/boards/")
    .set("Cookie", cookie)
    .send({
      name: "board1",
    })
    .expect(201);

  await request(app)
    .delete("/api/boards/" + response.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  await request(app)
    .get("/api/boards/" + response.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
