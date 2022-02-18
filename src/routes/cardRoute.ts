import express from "express";
import { SCHEMA } from "../constants";
import {
  createCard,
  deleteCard,
  fetchCard,
  updateCard,
} from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";

const cardRouter = express.Router();

cardRouter.route("/").post(validateSchema(SCHEMA.NEWCARD), createCard);
cardRouter
  .route("/:id")
  .get(fetchCard)
  .patch(validateSchema(SCHEMA.UPDATECARD), updateCard)
  .delete(deleteCard);

export default cardRouter;
