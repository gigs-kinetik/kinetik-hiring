"use client";

import Link from "next/link";
import { HomeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../../lib/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(auth.currentUser);
      setIsSignedUp(true);
      auth.signOut();
      setError("");
      router.push("/login");
      alert("An email verification has been sent to " + email);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError(
          "Email already in use, please login or sign up with another email."
        );
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(error.message);
      }
      setIsSignedUp(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="font-poppins flex h-screen flex-col justify-center px-6 lg:px-8 bg-gradient-to-bl from-logo-purple/95 via-mid-purple/40 via-70% to-transparent">
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
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 bg-off-white/40 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-logo-purple/75 sm:text-sm sm:leading-6"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  )}
                </span>
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
