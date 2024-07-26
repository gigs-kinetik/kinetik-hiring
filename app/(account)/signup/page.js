"use client";

import Link from "next/link";
import { HomeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebaseConfig";

export default function LoginPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedFirstName = sessionStorage.getItem("firstName");
    const savedLastName = sessionStorage.getItem("lastName");
    const savedEmail = sessionStorage.getItem("email");
    const savedPassword = sessionStorage.getItem("password");
    const savedTermsAccepted =
      sessionStorage.getItem("termsAccepted") === "true";

    if (savedFirstName) setFirstName(savedFirstName);
    if (savedLastName) setLastName(savedLastName);
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
    setTermsAccepted(savedTermsAccepted);
  }, []);

  const handleInputChange = (setter, fieldName, value) => {
    setter(value);
    sessionStorage.setItem(fieldName, value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("You must accept the terms and conditions to sign up.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(auth.currentUser);
      setIsSignedUp(true);
      const options = { timeZone: "America/Chicago", timeZoneName: "short" };
      const currDate = new Date()
        .toLocaleDateString("en-US", options)
        .split(", ")[0];
      const currTime = new Date().toLocaleTimeString("en-US", options);
      await setDoc(doc(db, "User Information", email), {
        "First Name": firstName,
        "Last Name": lastName,
        "Last Login": currDate + ", " + currTime,
      });
      auth.signOut();
      setError("");
      sessionStorage.clear();
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
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <button className="absolute ml-5 mt-5">
        <Link href="/">
          <HomeIcon className="md:size-12 size-10 fill-logo-purple/85"></HomeIcon>
        </Link>
      </button>
      <div className="font-poppins flex h-screen flex-col justify-center px-6 lg:px-8 bg-gradient-to-bl from-logo-purple/95 via-mid-purple/40 via-70% to-transparent">
        {isSignedUp ? (
          <div className="text-center text-off-white">
            <p>Account created successfully!</p>
            <p>Email: {email}</p>
          </div>
        ) : (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-14 w-auto"
                src="/logo.png"
                alt="Kinetik"
              />
              <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-off-white/90">
                Create your account
              </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSignUp}>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold leading-6 text-off-white"
                    >
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) =>
                          handleInputChange(
                            setFirstName,
                            "firstName",
                            e.target.value
                          )
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 bg-off-white/40 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-logo-purple/75 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold leading-6 text-off-white"
                    >
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) =>
                          handleInputChange(
                            setLastName,
                            "lastName",
                            e.target.value
                          )
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 bg-off-white/40 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-logo-purple/75 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-off-white"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) =>
                        handleInputChange(setEmail, "email", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange(
                          setPassword,
                          "password",
                          e.target.value
                        )
                      }
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
                <div className="flex items-center justify-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={() => {
                      setTermsAccepted(!termsAccepted);
                      sessionStorage.setItem("termsAccepted", !termsAccepted);
                    }}
                    className="h-4 w-4 text-logo-purple/75 border-gray-300 rounded focus:ring-logo-purple"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-off-white"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-logo-purple/75 underline font-semibold"
                    >
                      terms and conditions
                    </Link>
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-logo-purple/85 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-logo-purple/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-logo-purple/70"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
                {error && (
                  <p className="text-red-700 font-medium text-md text-center">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
