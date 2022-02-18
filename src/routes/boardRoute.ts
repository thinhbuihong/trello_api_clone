import express from "express";
import { SCHEMA } from "../constants";
import {
  deleteBoard,
  fetchBoardById,
  fetchBoards,
  fetchCardsByBoardId,
  fetchListsByBoardId,
  newBoard,
  updateBoard,
} from "../controllers/boardController";
import { validateSchema } from "../middlewares/validateSchema";

const boardRouter = express.Router();

boardRouter
  .route("/")
  .post(validateSchema(SCHEMA.NEWBOARD), newBoard)
  .get(fetchBoards);
boardRouter
  .route("/:id")
  .get(fetchBoardById)
  .patch(validateSchema(SCHEMA.NEWBOARD), updateBoard)
  .delete(deleteBoard);
boardRouter.route("/:id/lists").get(fetchListsByBoardId);
boardRouter.route("/:id/cards").get(fetchCardsByBoardId);

export default boardRouter;
