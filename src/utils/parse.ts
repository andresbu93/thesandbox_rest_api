import type Ajv from "ajv";

export const parse = (data: Ajv.ErrorObject[] | null | undefined): Error => {
  if (data) {
    const message = data
      .map((error) => `${error.dataPath} ${error.message}`.trim())
      .join("\n");
    throw new Error(message);
  }
  throw new Error();
};
