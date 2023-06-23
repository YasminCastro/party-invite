import ConfirmCard from "@/components/Cards/ConfirmCard";
import GoingCard from "@/components/Cards/GoingCard";
import NotGoingCard from "@/components/Cards/NotGoing";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export type IStepActive = "confirm" | "going" | "notGoing";

export default function Confirm() {
  const { query } = useRouter();
  const [cardActive, setCardActive] = useState<IStepActive>("notGoing");
  const [confirmValue, setConfirmValue] = useState(false);

  useEffect(() => {
    if (query?.cardActive) setCardActive(query?.cardActive as IStepActive);
  }, [query]);

  useEffect(() => {
    if (confirmValue) {
      setConfirmValue(confirmValue);
    }
  }, [confirmValue, setConfirmValue]);

  const Cards = useMemo(
    () => ({
      confirm: () => <ConfirmCard />,
      going: () => <GoingCard />,
      notGoing: () => <NotGoingCard />,
    }),
    []
  );

  return <>{Cards[cardActive]()}</>;
}
