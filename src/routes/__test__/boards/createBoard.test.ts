import request from "supertest";
import app from "../../../app";
import { signinHelper } from "../../../test/signinHelper";

it("cant create new board without signin/signup", async () => {
  await request(app)
    .post("/api/boards")
    .send({
      name: "board1",
    })
    .expect(401);
});

it("cant create new board without name", async () => {
  await request(app)
    .post("/api/boards")
    .set("Cookie", await signinHelper(app))
    .send({})
    .expect(400);
});

it("sucessfully create new board", async () => {
  const cookie = await signinHelper(app);

  await request(app)
    .post("/api/boards")
    .set("Cookie", cookie)
    .send({
      name: "board1",
    })
    .expect(201);

  const response = await request(app)
    .get("/api/boards")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body[0].name).toEqual("board1");

  const boardDetail = await request(app)
    .get("/api/boards/" + response.body[0]._id)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(boardDetail.body.name).toBe("board1");
});
