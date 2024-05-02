"use client";

import GuestList from "@/components/Global/GuestList/Index";
import { useState } from "react";

export default function Convidades() {
  const [refreshList, setRefreshList] = useState("");

  return (
    <div>
      <GuestList
        isAdmin={false}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />
    </div>
  );
}
