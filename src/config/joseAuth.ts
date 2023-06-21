import * as jose from "jose";
import { SECRET_TOKEN } from ".";

const authMiddleware = async (token: string): Promise<boolean> => {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET_TOKEN)
    );

    if (!payload) {
      throw new Error("Token invalid");
    }

    return true;
  } catch (error) {
    return false;
  }
};
export default authMiddleware;
