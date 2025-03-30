"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { checkUser } from "@/lib/slices/authSlice";

export default function AuthInit({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return <>{children}</>;
}
