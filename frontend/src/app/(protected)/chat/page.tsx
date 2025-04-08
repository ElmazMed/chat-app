"use client";
import NavBar from "@/components/NavBar";
import ProtectRoutes from "@/components/ProtectRoutes";
import { Users } from "lucide-react";
import Image from "next/image";
import userImg from "@/assets/user-img.jpg";

export default function Chat() {
  return (
    <ProtectRoutes>
      <>
        <NavBar />
        <div className="flex items-center justify-center p-4">
          <div className="bg-[#0c1425] w-2/5 p-5 rounded-md">
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
              <div className="w-1/3 h-[31rem] overflow-auto">
                <div className="flex items-center gap-2 mb-5">
                  <Image
                    src={userImg}
                    alt="Profile image"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h1 className="text-xs -mb-1">Mohamed El mazgour</h1>
                    <span className="text-[.8rem] text-gray-500">offline</span>
                  </div>
                </div>
              </div>
              <div className="w-2/3">
                <h1>Welcome to chat app</h1>
              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectRoutes>
  );
}
