import express from "express";
import { SCHEMA } from "../constants";
import {
  createList,
  deleteList,
  fetchCardsByListId,
  fetchList,
  updateList,
} from "../controllers/listController";
import { validateSchema } from "../middlewares/validateSchema";

const listRouter = express.Router();

listRouter.route("/").post(validateSchema(SCHEMA.NEWLIST), createList);
listRouter
  .route("/:id")
  .get(fetchList)
  .delete(deleteList)
  .patch(validateSchema(SCHEMA.UPDATELIST), updateList);
listRouter.route("/:id/cards").get(fetchCardsByListId);

export default listRouter;
