import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("cant delete card without login", async () => {
  await request(app)
    .delete("/api/cards/620f3bf69159ad3a05c95a0a")
    .send()
    .expect(401);
});

it("cant delete list without card in db", async () => {
  const cookie = await signinHelper(app);

  await request(app)
    .delete("/api/cards/620f3bf69159ad3a05c95a0a")
    .set("Cookie", cookie)
    .send()
    .expect(404);
});

it("successfully delete card", async () => {
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

  const card = await request(app)
    .post("/api/cards")
    .set("Cookie", cookie)
    .send({
      name: "card1",
      listId: list.body._id,
      boardId: board.body._id,
      order: 1,
    })
    .expect(201);

  await request(app)
    .delete("/api/cards/" + card.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  await request(app)
    .get("/api/cards/" + card.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(404);
});
