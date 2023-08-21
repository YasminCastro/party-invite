if (!process.env.MONGO_URL) {
  throw new Error("MONGO URL NOT DEFINED");
}

if (!process.env.DB_NAME) {
  throw new Error("DB_NAME NOT DEFINED");
}

if (!process.env.SECRET_TOKEN) {
  throw new Error("SECRET_TOKEN NOT DEFINED");
}

if (!process.env.SENHA_SECRETA) {
  throw new Error("SENHA_SECRETA NOT DEFINED");
}

if (!process.env.ADMIN_SECRET_TOKEN) {
  throw new Error("ADMIN_SECRET_TOKEN NOT DEFINED");
}

export const MONGO_URL = process.env.MONGO_URL;
export const SECRET_TOKEN = process.env.SECRET_TOKEN;
export const SENHA_SECRETA = process.env.SENHA_SECRETA;

export const CONFIG = {
  MONGO_URL: process.env.MONGO_URL,
  ADMIN_SECRET_TOKEN: process.env.ADMIN_SECRET_TOKEN,
  DB_NAME: process.env.DB_NAME,
};
