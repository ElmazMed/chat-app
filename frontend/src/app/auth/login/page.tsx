"use client";
import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("====================================");
      console.log(res.data);
      console.log("====================================");
    } catch (error) {
      console.log(`Error in the login UI ${error}`);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="fieldset w-1/4 bg-base-200 border border-base-300 p-4 shadow-sm rounded-box">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <legend className="fieldset-legend text-2xl">Login</legend>
            <div>
              <label className="fieldset-label mb-2">Email</label>
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label className="fieldset-label mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none"
                placeholder="Password"
              />
            </div>

            <button className="btn btn-neutral mb-3">Login</button>
          </form>
          <div>
            <p className="text-[0.9rem] text-center">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="hover:underline text-amber-100 text-[1rem]"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
