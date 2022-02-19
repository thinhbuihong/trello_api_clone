import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BoardModel } from "../models/board.model";
import { CardModel } from "../models/card.model";
import { List, ListModel } from "../models/list.model";

export const fetchBoards = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const boardList = await BoardModel.find({ userId: req.session.userId });
    res.json(boardList);
  }
);

export const newBoard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.session.userId!;
    const board = await BoardModel.create({ ...req.body, userId });

    if (!board) {
      res.status(400);
      throw new Error("validationn error");
    }
    res.status(201).json(board);
  }
);

export const fetchBoardById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const { userId } = req.session;
    const board = await BoardModel.findOne({ _id, userId });

    if (!board) {
      res.status(404);
      throw new Error("board not found");
    }
    res.json(board);
  }
);

export const fetchListsByBoardId = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const { userId } = req.session;
    const board = await BoardModel.findOne({ _id, userId });

    if (!board) {
      res.status(404);
      throw new Error("board not found");
    }

    const lists = await ListModel.find({ boardId: _id });
    res.json(lists);
  }
);

export const fetchCardsByBoardId = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const { userId } = req.session;
    const board = await BoardModel.findOne({ _id, userId });

    if (!board) {
      res.status(404);
      throw new Error("board not found");
    }

    const cards = await CardModel.find({ boardId: _id });
    res.json(cards);
  }
);

export const updateBoard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const { userId } = req.session;

    const updates = Object.keys(req.body);
    const allowedUpdates = ["name"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      res.status(400);
      throw new Error("invalid updates");
    }

    const board = await BoardModel.findOneAndUpdate({ _id, userId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!board) {
      res.status(400);
      throw new Error("board not found");
    }
    res.json(board);
  }
);

export const deleteBoard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const { userId } = req.session;

    const board = await BoardModel.findOneAndDelete({ _id, userId });
    if (!board) {
      res.status(404);
      throw new Error("board not found");
    }

    //delete list and card
    const lists = await ListModel.find({ boardId: _id }).select("+_id");
    lists.forEach(async (list: List & { _id: string }) => {
      const cardDeleted = await CardModel.deleteMany({
        listId: list._id,
        boardId: _id,
      });
      console.log(cardDeleted);

      await ListModel.deleteOne({ _id: list._id });
    });

    res.json(board);
  }
);
