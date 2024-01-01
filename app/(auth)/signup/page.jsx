"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SuccessToast from "@/components/toasts/SuccessToast";
import ErrorToast from "@/components/toasts/ErrorToast";

import { toastIdGenerator } from "@/lib/toast/toastIdGenerator";

const Signup = () => {
  const handleSignup = async () => {
    if (actionDisable) {
      toast.custom(
        (t) => <ErrorToast message={"Details are incomplete"} toast={t} />,
        { id: toastIdGenerator() + "-form-disabled" }
      );
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.custom(
        (t) => <ErrorToast message={"Invalid email address"} toast={t} />,
        { id: toastIdGenerator() + "-email-invalid" }
      );
      return;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/signup`,
      { user }
    );
  };

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [actionDisable, setActionDisable] = useState(true);

  useEffect(() => {
    if (
      user.fullname.length > 2 &&
      user.password.length >= 8 &&
      user.email.length > 3
    ) {
      setActionDisable(false);
    } else {
      setActionDisable(true);
    }
  }, [user]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="bg-background/90 shadow-accent p-10 pb-6 rounded-2xl flex flex-col gap-y-7 itemce"
        style={{ boxShadow: "rgba(var(--primary)) 0 0 16px 1px" }}
      >
        <h2 className="text-3xl font-heading font-bold bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent">
          Create an Account
        </h2>

        <div className="flex flex-col gap-y-4 text-text/70">
          <div className="flex flex-col gap-2 focus-within:text-text">
            <label htmlFor="fullname">Full Name</label>
            <input
              id="fullname"
              type="text"
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="ring-1 ring-text/30 text-sm bg-transparent outline-none focus:ring-1 focus:ring-secondary p-2 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2 focus-within:text-text">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="ring-1 ring-text/30 text-sm bg-transparent outline-none focus:ring-1 focus:ring-secondary p-2 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2 focus-within:text-text">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="ring-1 ring-text/30 text-sm bg-transparent outline-none focus:ring-1 focus:ring-secondary p-2 rounded-sm"
            />
          </div>

          <button
            className={`py-2 rounded text-text transition-all ${
              actionDisable ? `bg-primary/50` : `bg-primary/90 hover:bg-primary`
            }`}
            onClick={handleSignup}
          >
            Sign up
          </button>
        </div>
        <div className="relative">
          <div className="h-[1px] top-3 z-0 absolute w-full bg-white"></div>
          <div className="relative z-10 px-1 w-fit mx-auto bg-background/90">
            <p className="text-center text-text/70">
              Already have an account?{"  "}
              <Link
                className="text-accent hover:underline transition-all"
                href={"/login"}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
