"use client";

import Link from "next/link";
import { HomeIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user.emailVerified) {
        sessionStorage.setItem("userEmail", email);
        setLoggedInEmail(email);
        setError("");
        router.push("/countdown");
      } else {
        setError(
          "Email not verified. Please check your inbox for the verification email."
        );
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Invalid username or password.");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Too many attempts, account has been temporarily disabled. Please reset your password."
        );
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <button className="w-fit h-fit">
        <Link href="/">
          <HomeIcon className="size-12 ml-12 fill-logo-purple/85" />
        </Link>
      </button>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-14 w-auto" src="/logo.png" alt="Kinetik" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-off-white/90">
          Log in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
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
          {error && (
            <p className="text-red-700 font-medium text-md text-center">
              {error}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-logo-purple/85 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-logo-purple/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/70"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
