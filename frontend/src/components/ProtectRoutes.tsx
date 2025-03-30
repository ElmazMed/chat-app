"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function ProtectRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [router, isAuthenticated, isLoading]);

  if (isLoading)
    return <span className="loading loading-infinity loading-xl"></span>;

  if (!isAuthenticated) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }
  return <>{children}</>;
}
