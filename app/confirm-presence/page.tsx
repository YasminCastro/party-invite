"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { useUser } from "@/providers/User";

import AttendanceForm from "@/components/ConfirmPresenceCards/AttendanceForm";
import AttendingConfirmation from "@/components/ConfirmPresenceCards/AttendingConfirmation";
import NotAttendingConfirmation from "@/components/ConfirmPresenceCards/NotAttendingConfirmation";

export type IConfirmPresenceStepActive = "Form" | "Attending" | "NotAttending";

export default function ConfirmPresence() {
  const { user } = useUser();
  const { query } = useParams();

  const cardActiveFromQuery = (query as any)?.cardActive;

  const [cardActive, setCardActive] =
    useState<IConfirmPresenceStepActive>("Form");

  useEffect(() => {
    if (cardActiveFromQuery)
      setCardActive(cardActiveFromQuery as IConfirmPresenceStepActive);
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
