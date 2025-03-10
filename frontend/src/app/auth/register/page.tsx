"use client";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="fieldset w-1/4 bg-base-200 border border-base-300 p-4 shadow-sm rounded-box">
          <form className="flex flex-col gap-7">
            <legend className="fieldset-legend text-2xl">Sign up</legend>
            <div>
              <label className="fieldset-label mb-2">Full name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="fieldset-label mb-2">Email</label>
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none"
                placeholder="Email"
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

            <button className="btn btn-neutral mb-3">Sign up</button>
          </form>
          <div>
            <p className="text-[0.9rem] text-center">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="hover:underline text-amber-100 text-[1rem]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
