import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BoardModel } from "../models/board.model";
import { CardModel } from "../models/card.model";
import { ListModel } from "../models/list.model";

export const createCard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { boardId, listId } = req.body;
    const { userId } = req.session;
    const board = await BoardModel.findOne({ _id: boardId, userId });
    if (!board) {
      res.status(404);
      throw new Error("board not found");
    }

    const list = await ListModel.findOne({ _id: listId, boardId });
    if (!list) {
      res.status(404);
      throw new Error("list not found");
    }

    const card = await CardModel.create({ ...req.body });
    if (!card) {
      res.status(422);
      throw new Error("validation error");
    }
    res.json(card);
  }
);
//:id
export const fetchCard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const card = await CardModel.findById(_id);
    if (!card) {
      res.status(404);
      throw new Error("card not found");
    }

    res.json(card);
  }
);

export const updateCard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "listId", "boardId", "order"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      res.status(400);
      throw new Error("invalid updates");
    }

    //TODO: validate user,list,board

    const card = await CardModel.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!card) {
      res.status(404);
      throw new Error("card not found");
    }
    res.json(card);
  }
);

export const deleteCard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const card = await CardModel.findByIdAndDelete(_id);
    //TODO: validate user
    if (!card) {
      res.status(404);
      throw new Error("card not found");
    }
    res.json(card);
  }
);
