import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Board } from "./board.model";

export class List {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, ref: () => Board })
  boardId!: Ref<Board>;

  @prop({ required: true })
  order!: number;
}

export const ListModel = getModelForClass(List);
