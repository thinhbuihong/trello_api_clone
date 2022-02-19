import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("cant update list without signin/signup", async () => {
  await request(app)
    .post("/api/lists/620f3bf69159ad3a05c95a0a")
    .send({
      order: 2,
    })
    .expect(401);
});

it("sucessfully update list", async () => {
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

  await request(app)
    .patch("/api/lists/" + list.body._id)
    .set("Cookie", cookie)
    .send({
      name: "list2",
    })
    .expect(200);

  const updatedLists = await request(app)
    .get("/api/lists/" + list.body._id)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(updatedLists.body.name).toBe("list2");
});
