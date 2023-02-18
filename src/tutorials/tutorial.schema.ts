import type { JSONSchema7 } from 'json-schema';

const tutorialSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    videoURL: { type: 'string', format: 'uri' },
    description: { type: 'string' },
    publishedStatus: { type: 'string' },
    deletedAt: {
      type: 'string',
      pattern:
        '[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)date',
    },
  },
};

export const createdTutorialSchema: JSONSchema7 = {
  ...tutorialSchema,
  required: ['title'],
};

export const updatedTutorialSchema: JSONSchema7 = {
  ...tutorialSchema,
  minProperties: 1,
};
