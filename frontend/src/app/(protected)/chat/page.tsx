"use client";
import NavBar from "@/components/NavBar";
import ProtectRoutes from "@/components/ProtectRoutes";

export default function Chat() {
  return (
    <ProtectRoutes>
      <>
        <NavBar />
        <p>Chat page</p>
      </>
    </ProtectRoutes>
  );
}
