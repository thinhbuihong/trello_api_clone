import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Board {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, ref: () => User })
  userId!: Ref<User>;
}

export const BoardModel = getModelForClass(Board);
