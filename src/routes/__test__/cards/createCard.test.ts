import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("cant create new card without signin/signup", async () => {
  await request(app)
    .post("/api/cards/")
    .send({
      name: "card1",
      listId: "620f3bf69159ad3a05c95a0a",
      boardId: "620f3bf69159ad3a05c95a0a",
      order: 1,
    })
    .expect(401);
});

it("cant create new board without name/listId/boardId/order", async () => {
  const cookie = await signinHelper(app);

  await request(app)
    .post("/api/cards")
    .set("Cookie", cookie)
    .send({})
    .expect(400);

  await request(app)
    .post("/api/cards")
    .set("Cookie", cookie)
    .send({
      listId: "620f3bf69159ad3a05c95a0a",
      boardId: "620f3bf69159ad3a05c95a0a",
      order: 1,
    })
    .expect(400);

  await request(app)
    .post("/api/cards")
    .set("Cookie", cookie)
    .send({
      name: "card1",
      boardId: "620f3bf69159ad3a05c95a0a",
      order: 1,
    })
    .expect(400);

  await request(app)
    .post("/api/cards")
    .set("Cookie", cookie)
    .send({
      name: "card1",
      listId: "620f3bf69159ad3a05c95a0a",
      order: 1,
    })
    .expect(400);

  await request(app)
    .post("/api/cards")
    .set("Cookie", cookie)
    .send({
      name: "card1",
      listId: "620f3bf69159ad3a05c95a0a",
      boardId: "620f3bf69159ad3a05c95a0a",
    })
    .expect(400);
});

it("sucessfully create new card", async () => {
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

  const cardDetail = await request(app)
    .get("/api/cards/" + card.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(cardDetail.body.name).toBe("card1");
});
