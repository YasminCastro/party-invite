"use client";

import { useMemo, useState } from "react";

import { useUser } from "@/providers/User";

import AttendanceForm from "@/components/ConfirmPresenceCards/AttendanceForm";
import AttendingConfirmation from "@/components/ConfirmPresenceCards/AttendingConfirmation";
import NotAttendingConfirmation from "@/components/ConfirmPresenceCards/NotAttendingConfirmation";
import AttendingModal from "@/components/ConfirmPresenceCards/AttendingModal";

export type IConfirmPresenceStepActive = "Form" | "Attending" | "NotAttending";

export default function ConfirmPresence() {
  const [openModal, setOpenModal] = useState<string | undefined>();

  const { user } = useUser();

  const cardsMap = useMemo(
    () => ({
      Form: () => <AttendanceForm setOpenModal={setOpenModal} />,
      Attending: () => <AttendingConfirmation />,
      NotAttending: () => <NotAttendingConfirmation />,
    }),
    [user]
  );

  return (
    <>
      <AttendanceForm setOpenModal={setOpenModal} />

      {openModal === "Attending" && (
        <AttendingModal
          openModal={openModal}
          setOpenModal={(modal) => {
            setOpenModal(modal);
          }}
        />
      )}
    </>
  );
}
