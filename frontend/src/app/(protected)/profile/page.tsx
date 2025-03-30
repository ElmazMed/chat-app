import NavBar from "@/components/NavBar";
import ProtectRoutes from "@/components/ProtectRoutes";
import Image from "next/image";
import userImg from "@/assets/user-img.jpg";
import { Camera } from "lucide-react";
export default function Profile() {
  return (
    <ProtectRoutes>
      <NavBar />
      <div className="flex items-center justify-center p-4">
        <div className="bg-[#0c1425] p-5 rounded-md">
          <div className="flex flex-col items-center ">
            <h1 className="text-lg font-semibold">Profile</h1>
            <span className="text-xs">Your profile information</span>
            <div className="my-6 relative">
              <Image
                src={userImg}
                alt="Profile image"
                className="rounded-full w-30 h-30 p-3"
              />
              <button className="cursor-pointer h-8 w-8">
                <div className="absolute right-[.2rem] bottom-[3rem] rounded-full bg-yellow-500 h-8 w-8 flex items-center justify-center">
                  <Camera color="black" size={19} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectRoutes>
  );
}
