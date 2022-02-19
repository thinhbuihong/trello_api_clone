import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("cant create new list without signin/signup", async () => {
  await request(app)
    .post("/api/lists")
    .send({
      name: "list1",
      boardId: "620f3bf69159ad3a05c95a0a",
      order: 1,
    })
    .expect(401);
});

it("cant create new list without name/ boardId/ order", async () => {
  const cookie = await signinHelper(app);

  await request(app)
    .post("/api/lists")
    .set("Cookie", cookie)
    .send({})
    .expect(400);

  await request(app)
    .post("/api/lists")
    .set("Cookie", cookie)
    .send({
      name: "lists1",
      boardId: "620f3bf69159ad3a05c95a0a",
    })
    .expect(400);

  await request(app)
    .post("/api/lists")
    .set("Cookie", cookie)
    .send({
      boardId: "620f3bf69159ad3a05c95a0a",
      order: 1,
    })
    .expect(400);

  await request(app)
    .post("/api/lists")
    .set("Cookie", cookie)
    .send({
      name: "lists1",
      order: 1,
    })
    .expect(400);
});

it("sucessfully create new list", async () => {
  const cookie = await signinHelper(app);

  const board = await request(app)
    .post("/api/boards")
    .set("Cookie", cookie)
    .send({
      name: "board1",
    })
    .expect(201);

  const list = await request(app)
    .post("/api/lists")
    .set("Cookie", cookie)
    .send({
      name: "list1",
      boardId: board.body._id,
      order: 1,
    })
    .expect(201);

  const listDetail = await request(app)
    .get("/api/lists/" + list.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(listDetail.body.name).toBe("list1");
});
