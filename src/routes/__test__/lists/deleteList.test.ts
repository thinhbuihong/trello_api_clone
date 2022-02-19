import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("cant delete list without login", async () => {
  await request(app)
    .delete("/api/lists/620f3bf69159ad3a05c95a0a")
    .send()
    .expect(401);
});

it("cant delete list without list in db", async () => {
  const cookie = await signinHelper(app);

  await request(app)
    .delete("/api/boards/620f3bf69159ad3a05c95a0a")
    .set("Cookie", cookie)
    .send()
    .expect(404);
});

it("successfully delete board", async () => {
  const cookie = await signinHelper(app);

  const board = await request(app)
    .post("/api/boards/")
    .set("Cookie", cookie)
    .send({
      name: "board1",
    })
    .expect(201);

  const list = await request(app)
    .post("/api/lists")
    .set("Cookie", cookie)
    .send({
      name: "lists1",
      boardId: board.body._id,
      order: 1,
    })
    .expect(201);

  await request(app)
    .delete("/api/lists/" + list.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  await request(app)
    .get("/api/lists/" + list.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
