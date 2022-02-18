import { JSONSchemaType } from "ajv";

interface signup {
  username: string;
  password: string;
}

export const signupSchema: JSONSchemaType<signup> = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 6 },
    password: { type: "string", minLength: 4 },
  },
  required: ["password", "username"],
  additionalProperties: false,
};
