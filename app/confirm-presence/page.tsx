"use client";

import { useState } from "react";

import AttendanceForm from "@/components/ConfirmPresenceCards/AttendanceForm";
import AttendingModal from "@/components/ConfirmPresenceCards/AttendingModal";
import NotAttendingModal from "@/components/ConfirmPresenceCards/NotAttendingModal";

export type IConfirmPresenceStepActive = "Form" | "Attending" | "NotAttending";

export default function ConfirmPresence() {
  const [openModal, setOpenModal] = useState<string | undefined>();

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

      {openModal === "NotAttending" && (
        <NotAttendingModal
          openModal={openModal}
          setOpenModal={(modal) => {
            setOpenModal(modal);
          }}
        />
      )}
    </>
  );
}
