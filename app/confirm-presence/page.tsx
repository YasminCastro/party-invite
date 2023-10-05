"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { useUser } from "@/providers/User";

import AttendanceForm from "@/components/Cards/AttendanceForm";
import AttendingConfirmation from "@/components/Cards/AttendingConfirmation";
import NotAttendingConfirmation from "@/components/Cards/NotAttendingConfirmation";

export type IStepActive = "Form" | "Attending" | "NotAttending";

export default function ConfirmPresence() {
  const { user } = useUser();
  const { query } = useParams();

  const cardActiveFromQuery = (query as any)?.cardActive;

  const [cardActive, setCardActive] = useState<IStepActive>("Form");

  useEffect(() => {
    if (cardActiveFromQuery) setCardActive(cardActiveFromQuery as IStepActive);
  }, [cardActiveFromQuery]);

  const cardsMap = useMemo(
    () => ({
      Form: () => <AttendanceForm setCardActive={setCardActive} />,
      Attending: () => <AttendingConfirmation />,
      NotAttending: () => <NotAttendingConfirmation />,
    }),
    [user]
  );

  return <>{cardsMap[cardActive]()}</>;
}
