"use client";
import NavBar from "@/components/NavBar";
import ProtectRoutes from "@/components/ProtectRoutes";
import { Users } from "lucide-react";
import Image from "next/image";
import userImg from "@/assets/user-img.jpg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { getUsers } from "@/lib/slices/chatSlice";

export default function Chat() {
  const { users } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <ProtectRoutes>
      <>
        <NavBar />
        <div className="flex items-center justify-center p-4">
          <div className="bg-[#0c1425] w-3/4 p-5 rounded-md">
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-2">
                <Users />
                <span>Contacts</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <p>
                  Show online only{" "}
                  <span className="text-xs text-gray-500">(0 online)</span>
                </p>
              </div>
            </div>
            <div className="flex">
              <aside className="w-1/3 h-[31rem] overflow-y-auto">
                {users.length > 0 ? (
                  users.map((user) => (
                    <button
                      key={user._id}
                      className="flex items-center gap-2 mb-5 cursor-pointer w-full"
                    >
                      <Image
                        src={user.profileImg || userImg}
                        alt="Profile image"
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="flex flex-col items-start">
                        <h1 className="text-xs">{user.fullName}</h1>
                        <span className="text-[.8rem] text-gray-500">
                          offline
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No users available</p>
                )}
              </aside>
              <div className="w-2/3 flex items-center justify-center">
                <h1>Welcome to chat app</h1>
              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectRoutes>
  );
}
