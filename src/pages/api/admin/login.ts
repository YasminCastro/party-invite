import { CONFIG, SECRET_TOKEN, SENHA_SECRETA } from "@/config";
import db from "@/lib/client";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;

    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("admin");

    const configurationFound = await collection.find().toArray();

    if (configurationFound.length === 0) {
      res.status(404).json({
        message:
          "Configuração não encontrada, por favor, configure o sistema antes de logar",
      });

      return;
    }

    const { password: passwordFound, username: usernameFound } =
      configurationFound[0];

    const isPasswordMatching: boolean = await compare(password, passwordFound);

    if (!isPasswordMatching && usernameFound !== username) {
      res.status(401).json({
        message: "Credenciais incorretas.",
      });
    }

    const token = jwt.sign({ username }, CONFIG.ADMIN_SECRET_TOKEN);

    const cookieExpiresInSeconds = 60 * 60 * 24 * 30;

    res.status(201).json({
      token,
      cookieExpiresInSeconds,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
}
