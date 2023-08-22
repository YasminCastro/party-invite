import LoginForm from "@/components/LoginForm";
import { NextSeo } from "next-seo";
import projectConfig from "@/config/project";
import Image from "next/image";
import logo from "../../public/login/rharynice.svg";

export default function Login() {
  return (
    <>
      <NextSeo
        title={`${projectConfig.seoName} • Login`}
        description="Login da festa!"
      />
      <div className="flex min-h-screen flex-col items-center bg-login bg-cover">
        <div className="relative -m-20">
          <Image
            src={logo}
            alt="popup background"
            sizes="(min-width: 60em) 24vw,
          (min-width: 28em) 45vw,
          100vw"
          />
        </div>

        <LoginForm />
      </div>
    </>
  );
}
