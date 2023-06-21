import AfterConfirm from "@/components/Confirm/AfterConfirm";
import BeforeConfirm from "@/components/Confirm/BeforeConfirm";
import { useState } from "react";

export default function Home() {
  const [didConfirm, setDidConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [name, setName] = useState("yasmin");

  return (
    <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover">
      {didConfirm ? (
        <AfterConfirm didConfirm={didConfirm} confirm={confirm} />
      ) : (
        <BeforeConfirm
          setDidConfirm={setDidConfirm}
          setConfirm={setConfirm}
          confirm={confirm}
          name={name}
        />
      )}
    </div>
  );
}
