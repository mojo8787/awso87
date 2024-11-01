import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Note: a
    .model({
      title: a.string().required(),
      content: a.string().required(),
      createdAt: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
