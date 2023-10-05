import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useUser } from "@/providers/User";
import { useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  async function login(name: string, password: string) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/login", {
        name: name.trim().toLocaleLowerCase(),
        password,
      });

      if (data.message) {
        throw new Error(data.message);
      }

      setCookie("token", data.token);
      setUser(data.user);
      router.push("/");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading };
}
