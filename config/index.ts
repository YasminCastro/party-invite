if (!process.env.MONGO_URL) {
  throw new Error("MONGO URL NOT DEFINED");
}

if (!process.env.DB_NAME) {
  throw new Error("DB_NAME NOT DEFINED");
}

if (!process.env.SECRET_TOKEN) {
  throw new Error("SECRET_TOKEN NOT DEFINED");
}

if (!process.env.GUESTS_PASSWORD) {
  throw new Error("GUESTS_PASSWORD NOT DEFINED");
}

if (!process.env.ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD NOT DEFINED");
}

export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_URL_GLOBAL = process.env.MONGO_URL_GLOBAL;
export const DB_NAME = process.env.DB_NAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const SECRET_TOKEN = process.env.SECRET_TOKEN;
export const GUESTS_PASSWORD = process.env.GUESTS_PASSWORD;
