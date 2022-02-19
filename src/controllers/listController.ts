import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BoardModel } from "../models/board.model";
import { Card, CardModel } from "../models/card.model";
import { ListModel } from "../models/list.model";

export const createList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { boardId } = req.body;
    const { userId } = req.session;
    const board = await BoardModel.findOne({ _id: boardId, userId });

    if (!board) {
      res.status(404);
      throw new Error("board not found");
    }

    const list = await ListModel.create({
      ...req.body,
      userId,
    });
    if (!list) {
      res.status(400);
      throw new Error("validation error");
    }

    res.status(201).json(list);
  }
);

export const fetchList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const list = await ListModel.findById(_id);

    if (!list) {
      res.status(404);
      throw new Error("list not found");
    }
    res.json(list);
  }
);

export const fetchCardsByListId = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const list = await ListModel.findById(_id);
    if (!list) {
      res.status(404);
      throw new Error("list not found");
    }

    const cards = await CardModel.find({ listID: _id });
    res.json(cards);
  }
);

export const updateList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "order", "boardId"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      res.status(400);
      throw new Error("invalid updates");
    }

    const list = await ListModel.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!list) {
      res.status(404);
      throw new Error("list not found");
    }
    res.json(list);
  }
);

export const deleteList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const list = await ListModel.findByIdAndDelete(_id);
    if (!list) {
      res.status(404);
      throw new Error("list not found");
    }

    const cards = await CardModel.find({ listid: _id }).select("+_id");
    cards.forEach(
      async (card: Card & { _id: string }) =>
        await CardModel.deleteOne({ _id: card._id })
    );

    res.json(list);
  }
);
