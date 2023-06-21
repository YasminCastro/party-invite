import { Dispatch, SetStateAction } from "react";
import "xp.css/dist/98.css";

interface IProps {
  setConfirmValue: Dispatch<SetStateAction<boolean>>;
  name: string;
  confirm: boolean;
}

export default function GuestForm({ setConfirmValue, name, confirm }: IProps) {
  return (
    <div>
      <div className="flex w-full flex-col ">
        <label className="text-base text-white">Nome</label>
        <input className="h-6 p-2 text-base" disabled defaultValue={name} />
      </div>
      <div className="m-4 flex gap-8 text-white">
        <input
          id="yes"
          type="radio"
          name="confirm"
          onClick={() => setConfirmValue(true)}
          defaultChecked={confirm}
        />
        <label htmlFor="yes" className="text-lg">
          Vou :D
        </label>

        <input
          id="no"
          type="radio"
          name="confirm"
          onClick={() => setConfirmValue(false)}
          defaultChecked={!confirm}
        />
        <label htmlFor="no" className="text-lg">
          Não Vou :(
        </label>
      </div>
    </div>
  );
}
