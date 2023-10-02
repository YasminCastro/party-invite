import { GUESTS_PASSWORD, SECRET_TOKEN } from "@/config";
import db from "@/lib/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { name, password } = await req.json();

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const collection = db.collection("guests");
    const result = await collection.findOne({ name });

    if (!result) {
      return NextResponse.json(
        {
          message: "Você não está na lista de convidades ://",
        },
        { status: 200 }
      );
    }

    if (result.isAdmin && result.password !== password) {
      return NextResponse.json(
        {
          message:
            "Senha incorreta, você deve utilizar a senha de administrador.",
        },
        { status: 200 }
      );
    }

    if (!result.isAdmin && GUESTS_PASSWORD !== password.toLowerCase()) {
      return NextResponse.json(
        {
          message: "iiih errou a senha secreta, tenta novamente ae!",
        },
        { status: 200 }
      );
    }

    const token = jwt.sign({ result }, SECRET_TOKEN);

    const cookieExpiresInSeconds = 60 * 60 * 24 * 30;

    return NextResponse.json(
      {
        token,
        cookieExpiresInSeconds,
        user: {
          name,
          status: result.status,
          _id: result._id,
          receivedInvitation: result.receivedInvitation,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
