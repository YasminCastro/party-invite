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
        <div className="relative h-[400px] w-[700px] max-2xl:h-[300px] max-2xl:w-[600px] max-xl:w-[500px] max-lg:h-[200px] max-lg:w-[400px] max-phone:h-[150px] max-phone:w-[300px] ">
          <Image src={logo} alt="Logo" fill sizes="100vw" />
        </div>
        <LoginForm />
      </div>
    </>
  );
}
