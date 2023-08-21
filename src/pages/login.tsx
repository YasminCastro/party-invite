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
      <div className="flex min-h-screen flex-col items-center justify-center bg-login bg-cover">
        <div className="relative m-10">
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bungee text-6xl text-purple-950 max-lg:text-5xl  max-md:text-4xl max-sm:text-2xl max-phone:text-lg">
            {projectConfig.partyName.toUpperCase()}
          </h1>
        </div>

        <LoginForm />
      </div>
    </>
  );
}
