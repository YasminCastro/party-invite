import { object, string } from "yup";

export const createConfigurationScheme = object({
  username: string().required(),
  password: string().required(),
});

export const updateConfigurationScheme = object({
  username: string(),
  password: string(),
});
