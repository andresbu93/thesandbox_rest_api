import type { JSONSchema7 } from 'json-schema';

export const userAuthSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
};
