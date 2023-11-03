"use client";

import LoginForm from "@/components/Login/Form";
import projectConfig from "@/config/project";

export default function Login() {
  return (
    <div className="min-h-screen bg-login bg-cover bg-center flex items-center justify-center">
      <div className="flex flex-col items-center gap-20 py-16">
        <h1 className="whitespace-nowrap font-title text-7xl text-login-title font-bold max-lg:text-6xl  max-md:text-5xl max-sm:whitespace-normal max-sm:text-center max-sm:text-4xl">
          {projectConfig.partyName}
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
