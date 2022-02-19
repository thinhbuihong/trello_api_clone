import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("cant update board without login", async () => {
  await request(app)
    .patch("/api/boards/620f3bf69159ad3a05c95a0a")
    .send({
      name: "board1",
    })
    .expect(401);
});

it("cant update board without board in db", async () => {
  const cookie = await signinHelper(app);

  await request(app)
    .patch("/api/boards/620f3bf69159ad3a05c95a0a")
    .set("Cookie", cookie)
    .send({
      name: "board1",
    })
    .expect(400);
});

it("cant update board without board name", async () => {
  const cookie = await signinHelper(app);

  const response = await request(app)
    .post("/api/boards/")
    .set("Cookie", cookie)
    .send({
      name: "board1",
    })
    .expect(201);

  await request(app)
    .patch("/api/boards/" + response.body._id)
    .set("Cookie", cookie)
    .send({})
    .expect(400);
});

it("successfully update board", async () => {
  const cookie = await signinHelper(app);

  const response = await request(app)
    .post("/api/boards/")
    .set("Cookie", cookie)
    .send({
      name: "board1",
    })
    .expect(201);

  const updatedBoard = await request(app)
    .patch("/api/boards/" + response.body._id)
    .set("Cookie", cookie)
    .send({
      name: "board2",
    })
    .expect(200);

  expect(updatedBoard.body.name).toEqual("board2");
});
