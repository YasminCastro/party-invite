import LoginForm from "@/components/LoginForm";
import { NextSeo } from "next-seo";
import Image from "next/image";
import popup from "../../public/login/popup.svg";

export default function Login() {
  return (
    <>
      <NextSeo title="404 • Login" description="Login para a festa 404" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-login bg-cover">
        <div className="relative m-10">
          <Image
            src={popup}
            alt="popup background"
            sizes="(min-width: 60em) 24vw,
          (min-width: 28em) 45vw,
          100vw"
          />
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bungee text-6xl text-purple-950 max-lg:text-5xl  max-md:text-4xl max-sm:text-2xl max-phone:text-lg">
            404 PARTY NOT FOUND
          </h1>
        </div>

        <LoginForm />
      </div>
    </>
  );
}
