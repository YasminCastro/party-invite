import LoginForm from "@/components/LoginForm";
import { NextSeo } from "next-seo";
import projectConfig from "@/config/project";

export default function Login() {
  return (
    <>
      <NextSeo
        title={`${projectConfig.seoName} • Login`}
        description="Login da festa!"
      />
      <div className="flex min-h-screen flex-col items-center justify-around bg-login bg-cover">
        <h1 className=" mt-20 whitespace-nowrap font-bungee text-6xl text-slate-50 max-lg:text-5xl  max-md:text-4xl max-sm:text-2xl max-phone:text-lg">
          {projectConfig.partyName}
        </h1>
        <LoginForm />
      </div>
    </>
  );
}
