import { JSONSchemaType } from "ajv";

interface newCard {
  name: string;
  listId: string;
  boardId: string;
  order: number;
}

export const newCardSchema: JSONSchemaType<newCard> = {
  type: "object",
  properties: {
    name: { type: "string" },
    listId: { type: "string", minLength: 23 },
    boardId: { type: "string", minLength: 23 },
    order: { type: "integer", minimum: 0 },
  },
  required: ["name", "boardId", "listId", "order"],
  additionalProperties: false,
};
