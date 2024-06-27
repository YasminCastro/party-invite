import Footer from "@/components/Global/Footer/Index";
import LoginForm from "@/components/Pages/Login/Form";
import projectConfig from "@/config/project";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-login bg-cover bg-center">
      <div className="flex flex-col items-center gap-8 max-sm:gap-10">
        <h1 className="whitespace-nowrap font-title text-8xl text-primary max-sm:text-6xl ">
          {projectConfig.partyName.toUpperCase()}
        </h1>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
