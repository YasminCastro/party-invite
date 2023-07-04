import AdminForm from "@/components/Admin/Form";
import { NextSeo } from "next-seo";

export default function Admin() {
  return (
    <>
      <NextSeo title="Admin" description="Área restrista" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-login bg-cover">
        <AdminForm />
      </div>
    </>
  );
}
