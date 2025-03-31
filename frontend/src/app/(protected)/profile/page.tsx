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
        <div className="bg-[#0c1425] w-2/5 p-5 rounded-md">
          <div className="flex flex-col items-center ">
            <h1 className="text-lg font-semibold">Profile</h1>
            <span className="text-xs">Your profile information</span>
            <div className="my-6 relative">
              <div className="flex items-center justify-center rounded-full h-30 w-30 border-3 border-green-600">
                <Image
                  src={userImg}
                  alt="Profile image"
                  className="rounded-full w-28 h-28"
                />
              </div>
              <button className="cursor-pointer h-8 w-8">
                <div className="absolute right-[.2rem] bottom-[3rem] rounded-full bg-yellow-500 h-8 w-8 flex items-center justify-center">
                  <Camera color="black" size={19} />
                </div>
              </button>
            </div>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <label className="fieldset-label mb-2">Full name</label>

              <input
                type="text"
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="fieldset-label mb-2">Email</label>
              <input
                type="text"
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label className="fieldset-label mb-2">Password</label>
              <input
                type="password"
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none"
                placeholder="Password"
              />
            </div>
          </form>
        </div>
      </div>
    </ProtectRoutes>
  );
}
