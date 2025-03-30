"use client";
import { logout } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function NavBar() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="flex justify-between">
        <h1>ChatMaz</h1>
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>
    </>
  );
}
