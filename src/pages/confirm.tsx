import ConfirmCard from "@/components/Cards/ConfirmCard";
import GoingCard from "@/components/Cards/GoingCard";
import NotGoingCard from "@/components/Cards/NotGoing";
import { useUser } from "@/providers/user";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export type IStepActive = "confirm" | "going" | "notGoing";

export default function Confirm() {
  const { query } = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {}, [user]);

  const [cardActive, setCardActive] = useState<IStepActive>("confirm");
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
      confirm: () => (
        <ConfirmCard
          setCardActive={setCardActive}
          user={user}
          setUser={setUser}
        />
      ),
      going: () => <GoingCard />,
      notGoing: () => <NotGoingCard />,
    }),
    [user, setUser]
  );



  return <>{Cards[cardActive]()}</>;
}
