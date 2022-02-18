import { DocumentType, getModelForClass, prop } from "@typegoose/typegoose";
import { verify } from "argon2";
import { Typegoose } from "typegoose";

export class User extends Typegoose {
  @prop({ required: true, unique: true, minlength: 6, maxlength: 25 })
  username!: string;

  @prop({
    required: true,
    select: false,
  })
  password!: string;

  public matchPassword(
    this: DocumentType<User>,
    password: string
  ): Promise<boolean> {
    return verify(this.password, password);
  }
}

export const UserModel = getModelForClass(User);
