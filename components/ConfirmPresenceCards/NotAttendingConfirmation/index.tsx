import GoBackButton from "@/components/GoBackButton/Index";
import projectConfig from "@/config/project";

export default function NotAttendingConfirmation() {
  return (
    <div>
      <GoBackButton path="/" title="Voltar" />
      <div className="flex min-h-screen items-center justify-evenly bg-home bg-cover">
        <div className="flex flex-col gap-4 rounded-lg bg-gray-950 bg-opacity-80 p-8 text-center  max-md:w-full">
          <div className="mb-4">
            <h2 className="font-title text-2xl text-blue-400">
              Muito triste que você não vai :/
            </h2>
            <h2 className="font-title text-2xl text-blue-400">
              talvez na próxima você consiga
            </h2>
          </div>

          <p className="font-alt text-xl text-white">
            ps. caso mude de ideia pode confirmar se vai até o dia{" "}
            {projectConfig.lastDateToConfirm} :)
          </p>
        </div>
      </div>
    </div>
  );
}
