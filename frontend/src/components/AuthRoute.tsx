"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.push("/chat");
  }, [isAuthenticated, isLoading, router]);

  if (isLoading)
    return <span className="loading loading-infinity loading-xl"></span>;

  return <>{children}</>;
}
