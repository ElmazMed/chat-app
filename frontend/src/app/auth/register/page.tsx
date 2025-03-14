"use client";
import Link from "next/link";
import React, { useEffect, useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { register } from "@/lib/slices/authSlice";
import { Toaster, toast } from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { data, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  interface User {
    fullName: string;
    email: string;
    password: string;
  }

  const { fullName, email, password } = form;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fullName.startsWith(" ") || email.startsWith(" "))
      return toast.error("All fields are required.");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Invalid email");

    const user: User = { fullName, email, password };
    dispatch(register(user));
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <Toaster />
        <div className="fieldset w-1/4 bg-base-200 border border-base-300 p-4 shadow-sm rounded-box">
          <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
            <legend className="fieldset-legend text-2xl">Sign up</legend>
            <div>
              <label className="fieldset-label mb-2">Full name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="bg-[#0f172a] rounded-lg border-slate-600 border-1 p-3 w-full outline-none"
                placeholder="Full name"
              />
            </div>
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

            <button type="submit" className="btn btn-neutral mb-3">
              {isLoading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Sign up"
              )}
            </button>
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
