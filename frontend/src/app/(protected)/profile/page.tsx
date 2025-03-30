import ProtectRoutes from "@/components/ProtectRoutes";
import React from "react";

export default function Profile() {
  return (
    <ProtectRoutes>
      <div>Profile</div>
    </ProtectRoutes>
  );
}
