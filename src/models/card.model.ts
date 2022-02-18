import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Board } from "./board.model";
import { List } from "./list.model";

export class Card {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, ref: () => Board })
  boardId!: Ref<Board>;

  @prop({ required: true, ref: () => List })
  listId!: Ref<List>;

  @prop({ required: true })
  order!: number;
}

export const CardModel = getModelForClass(Card);
