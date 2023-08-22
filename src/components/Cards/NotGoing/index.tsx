import projectConfig from "@/config/project";
import { NextSeo } from "next-seo";
import PurpleToBlueButton from "@/components/PurpleToBlueButton";

export default function NotGoingCard() {
  return (
    <>
      <NextSeo
        title={`${projectConfig.seoName}`}
        description="Presença confirmada ou não..."
      />

      <div className="flex min-h-screen items-center justify-evenly bg-home bg-cover">
        <PurpleToBlueButton path="/" title="Voltar" />

        <div className="flex flex-col gap-4 rounded-lg bg-gray-950 bg-opacity-80 p-8 text-center  max-md:w-full">
          <div className="mb-4">
            <h2 className="font-bebas text-2xl text-blue-400">
              Muito triste que você não vai :/
            </h2>
            <h2 className="font-bebas text-2xl text-blue-400">
              talvez na próxima você consiga
            </h2>
          </div>

          <p className="font-bebas text-xl text-white">
            ps. caso mude de ideia pode confirmar se vai até o dia{" "}
            {projectConfig.lastDateToConfirm} :)
          </p>
        </div>
      </div>
    </>
  );
}
