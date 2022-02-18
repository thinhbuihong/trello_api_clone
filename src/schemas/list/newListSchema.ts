import { JSONSchemaType } from "ajv";

interface newList {
  name: string;
  boardId: string;
  order: number;
}

export const newListSchema: JSONSchemaType<newList> = {
  type: "object",
  properties: {
    name: { type: "string" },
    boardId: { type: "string", minLength: 23 },
    order: { type: "integer", minimum: 0 },
  },
  required: ["boardId", "name", "order"],
  additionalProperties: false,
};
