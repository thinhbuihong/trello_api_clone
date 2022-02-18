import { JSONSchemaType } from "ajv";

interface newBoard {
  name: string;
}

export const newBoardSchema: JSONSchemaType<newBoard> = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};
