"use client";
import { logout } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { User, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="flex justify-between p-4">
        <Link href="/chat">
          <h1 className="text-lg font-semibold">Chat App</h1>
        </Link>
        <div className="flex gap-4">
          <Link href="/profile" className="btn">
            <div className="flex items-center justify-center gap-2">
              <User size={20} />
              <span>Profile</span>
            </div>
          </Link>

          <Link href="/settings" className="btn">
            <Settings size={20} />
            Settings
          </Link>
          <button onClick={handleLogout} className="btn">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
