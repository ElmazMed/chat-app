"use client";
import NavBar from "@/components/NavBar";
import ProtectRoutes from "@/components/ProtectRoutes";
import Image from "next/image";
import userImg from "@/assets/user-img.jpg";
import { Camera } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ChangeEvent, useState } from "react";
import { updateImg } from "@/lib/slices/authSlice";
export default function Profile() {
  const { data, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [selectImg, setSelectImg] = useState<string | undefined>(
    data?.profileImg
  );

  const user = {
    fullName: data?.fullName,
    email: data?.email,
    profileImg: data?.profileImg,
  };

  const handleImgUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = async () => {
        if (typeof fileReader.result === "string") {
          const base64Image = fileReader.result;
          setSelectImg(base64Image);
          await dispatch(updateImg({ profileImg: base64Image }));
        }
      };
    }
  };

  return (
    <ProtectRoutes>
      <NavBar />
      <div className="flex items-center justify-center p-4">
        <div className="bg-[#0c1425] w-2/5 p-5 rounded-md">
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold">Profile</h1>
            <span className="text-xs">Your profile information</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center w-full">
              <div className="my-6 relative">
                <div className="flex items-center justify-center rounded-full h-30 w-30 border-3 border-green-600">
                  <Image
                    src={
                      (typeof selectImg === "string" ? selectImg : undefined) ||
                      user.profileImg ||
                      userImg
                    }
                    width={112}
                    height={112}
                    alt="Profile image"
                    className="rounded-full w-28 h-28"
                  />
                </div>
                <label className="cursor-pointer absolute right-[-.5rem] bottom-[1rem] rounded-full bg-yellow-500 h-8 w-8 flex items-center justify-center">
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <Camera color="black" size={19} />
                  )}
                  <input
                    type="file"
                    id="img-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImgUpload}
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="fieldset-label mb-2">Full name</label>

              <input
                type="text"
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none cursor-not-allowed"
                placeholder="Full name"
                value={user.fullName}
                readOnly
              />
            </div>
            <div>
              <label className="fieldset-label mb-2">Email</label>
              <input
                type="text"
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none cursor-not-allowed"
                placeholder="example@example.com"
                value={user.email}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectRoutes>
  );
}
