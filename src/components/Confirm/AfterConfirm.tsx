import { useRouter } from "next/router";
import "xp.css/dist/98.css";
import Going from "./AfterConfirm/Going";
import NotGoing from "./AfterConfirm/NotGoing";


interface IProps {
  confirm: Boolean;
}

export default function AfterConfirm({ confirm }: IProps) {
  const router = useRouter();

  return (
    <div className="flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-80 bg-clip-padding p-4 max-sm:w-3/4">
      {confirm ? <Going /> : <NotGoing />}

      <button className="h-8 w-full text-base" onClick={() => router.push("/")}>
        Voltar
      </button>
    </div>
  );
}
