import { JSONSchemaType } from "ajv";

interface updateList {
  name: string;
  boardId: string;
  order: number;
}

export const updateListSchema: JSONSchemaType<updateList> = {
  type: "object",
  properties: {
    name: { type: "string" },
    boardId: { type: "string", minLength: 23 },
    order: { type: "integer", minimum: 0 },
  },
  required: [],
  additionalProperties: false,
};
