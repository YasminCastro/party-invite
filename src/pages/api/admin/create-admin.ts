import { ADMIN_PASSWORD } from "@/config";
import db from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CreateAdmin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const database = await db;

    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");

    const name = "aniversariante";

    const result = await collection.updateOne(
      { name },
      {
        $setOnInsert: {
          status: true,
          receivedInvitation: true,
          isAdmin: true,
        },
        $set: {
          password: ADMIN_PASSWORD, // WARNING: Storing passwords like this is insecure. Always hash them.
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      res
        .status(200)
        .json({ message: "User created successfully", acknowledged: true });
    } else if (result.modifiedCount > 0) {
      res
        .status(200)
        .json({
          message: "User password updated successfully",
          acknowledged: true,
        });
    } else {
      res
        .status(200)
        .json({
          message: "Operation performed but no changes were made",
          acknowledged: true,
        });
    }
  } catch (error: any) {
    res.status(200).json({ message: error.message, acknowledged: false });
  }
}
