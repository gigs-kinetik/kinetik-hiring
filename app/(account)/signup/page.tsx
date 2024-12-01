"use client";

import Link from "next/link";
import { HomeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Company, User } from "../../../util/server";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userType, setUserType] = useState("Developer");
  const [companyName, setCompanyName] = useState("");
  const [companyTermsAccepted, setCompanyTermsAccepted] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    setter: (value: string | boolean) => void,
    fieldName: string,
    value: string | boolean
  ) => {
    setter(value);
    sessionStorage.setItem(fieldName, value.toString());
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("You must accept the terms and conditions to sign up.");
      return;
    }
    if (userType === "Company" && !companyTermsAccepted) {
      alert("You must accept the company-specific terms and conditions.");
      return;
    }
    setLoading(true);
    if (password.length < 6) {
      alert("Password must be at least 6 characters in length");
    } else if (userType === "Developer") {
      const user = await User.register(firstName, lastName, email, password);
      if (!user) {
        alert("Email already in use");
      } else {
        await User.verify(user.id, user.email);
        alert('Verification email sent, please check your email');
        router.push("/login");
        setLoading(false);
      }
    } else {
      const company = await Company.register(
        companyName,
        firstName,
        lastName,
        email,
        password
      );
      if (!company) {
        alert("Email already in use");
      } else {
        await Company.verify(company.id, company.email);
        alert('Verification email sent, please check your email');
        router.push("/login");
        setLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

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
              <form className="space-y-3" onSubmit={handleSignUp}>
                <div>
                  <div className="flex space-x-4 mt-2 justify-center">
                    <label className="flex items-center text-off-white">
                      <input
                        type="radio"
                        name="userType"
                        value="Developer"
                        checked={userType === "Developer"}
                        onChange={() => setUserType("Developer")}
                        className="form-radio text-logo-purple/75 focus:ring-logo-purple focus:ring-2"
                      />
                      <span className="ml-2">Developer</span>
                    </label>
                    <label className="flex items-center text-off-white">
                      <input
                        type="radio"
                        name="userType"
                        value="Company"
                        checked={userType === "Company"}
                        onChange={() => setUserType("Company")}
                        className="form-radio text-logo-purple/75 focus:ring-logo-purple focus:ring-2"
                      />
                      <span className="ml-2">Company</span>
                    </label>
                  </div>
                </div>
                {userType === "Company" && (
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-semibold leading-6 text-off-white"
                    >
                      Company Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) =>
                          handleInputChange(
                            (companyName: string) =>
                              setCompanyName(companyName),
                            "companyName",
                            e.target.value
                          )
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 bg-off-white/40 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-logo-purple/75 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}
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
                            (firstName: string) => setFirstName(firstName),
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
                            (lastName: string) => setLastName(lastName),
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
                        handleInputChange(
                          (email: string) => setEmail(email),
                          "email",
                          e.target.value
                        )
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
                          (password: string) => setPassword(password),
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
                {userType === "Company" && (
                  <div className="flex items-center justify-center">
                    <input
                      id="companyTerms"
                      name="companyTerms"
                      type="checkbox"
                      checked={companyTermsAccepted}
                      onChange={() =>
                        setCompanyTermsAccepted(!companyTermsAccepted)
                      }
                      className="h-4 w-4 text-logo-purple/75 border-gray-300 rounded focus:ring-logo-purple"
                    />
                    <label
                      htmlFor="companyTerms"
                      className="ml-2 block text-sm text-off-white"
                    >
                      I confirm that I am an authorized employee from the
                      company stated above.
                    </label>
                  </div>
                )}
                <div className="flex">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={() => {
                      setTermsAccepted(!termsAccepted);
                      sessionStorage.setItem(
                        "termsAccepted",
                        (!termsAccepted).toString()
                      );
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
                    disabled={loading}
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
