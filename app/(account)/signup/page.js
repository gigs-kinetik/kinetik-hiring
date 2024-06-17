"use client";

import Link from "next/link";
import { HomeIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebaseAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("userEmail", email);
      setIsSignedUp(true);
      setError("");
      router.push("home");
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        setError(
          "Email already in use, please login or sign up with another email."
        );
      } else {
        setError(error.message);
      }
      setIsSignedUp(false);
    }
  };

  return (
    <div className="font-poppins flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-bl from-logo-purple/95 via-mid-purple/40 via-70% to-transparent">
      <button className="w-fit h-fit">
        <Link href="/">
          <HomeIcon className="size-12 ml-12 fill-logo-purple/85"></HomeIcon>
        </Link>
      </button>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-14 w-auto" src="/logo.png" alt="Kinetik" />
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-off-white/90">
          Create your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        {isSignedUp ? (
          <div className="text-center text-off-white">
            <p>Account created successfully!</p>
            <p>Email: {email}</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-off-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 bg-off-white/40 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-logo-purple/75 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-off-white"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 bg-off-white/40 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-logo-purple/75 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-logo-purple/85 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-logo-purple/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/70"
              >
                Sign Up
              </button>
            </div>
            {error && (
              <p className="text-red-700 font-medium text-md text-center">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
