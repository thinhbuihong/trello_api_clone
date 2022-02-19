import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("cant update card without signin/signup", async () => {
  await request(app)
    .post("/api/cards/620f3bf69159ad3a05c95a0a")
    .send({
      order: 2,
    })
    .expect(401);
});

it("sucessfully update card", async () => {
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
    .patch("/api/cards/" + card.body._id)
    .set("Cookie", cookie)
    .send({
      name: "card5",
      order: 2,
    })
    .expect(200);

  const updatedCard = await request(app)
    .get("/api/cards/" + card.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(updatedCard.body.name).toBe("card5");
  expect(updatedCard.body.order).toBe(2);
});
