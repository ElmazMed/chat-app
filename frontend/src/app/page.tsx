"use client";
import React from "react";
import Login from "./auth/login/page";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
export default function page() {
  const { data } = useAppSelector((state) => state.auth);
  const router = useRouter();
  return (
    <>
      <Login />
    </>
  );
}
