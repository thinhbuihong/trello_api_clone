import { JSONSchemaType } from "ajv";

interface updateCard {
  name: string;
  listId: string;
  boardId: string;
  order: number;
}

export const updateCardSchema: JSONSchemaType<updateCard> = {
  type: "object",
  properties: {
    name: { type: "string" },
    listId: { type: "string", minLength: 23 },
    boardId: { type: "string", minLength: 23 },
    order: { type: "integer", minimum: 0 },
  },
  required: [],
  additionalProperties: false,
};
