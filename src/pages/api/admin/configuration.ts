import db from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import {
  createConfigurationScheme,
  updateConfigurationScheme,
} from "@/config/validationSchema";

export default async function configuration(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("admin");

    const isConfigured = await collection.find().toArray();

    const { username, password } = req.body;

    let result = null;

    if (isConfigured.length === 0) {
      // criar nova configuração
      await createConfigurationScheme.validate(req.body);
      const hashedPassword = await hash(password, 10);
      result = await collection.insertOne({
        username,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Configuração criada com sucesso" });
      return;
    } else {
      //editar configuração

      const { _id } = isConfigured[0];
      await updateConfigurationScheme.validate(req.body);

      let hashedPassword = null;

      let update = req.body;
      if (req.body.password) {
        hashedPassword = await hash(password, 10);
        update.password = hashedPassword;
      }

      result = await collection.findOneAndUpdate(
        { _id: _id },
        { $set: update },
        { returnDocument: "after" }
      );

      res.status(200).json({ message: "Configuração atualizada com sucesso" });
      return;
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
