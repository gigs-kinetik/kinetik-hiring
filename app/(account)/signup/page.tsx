"use client";

import Link from "next/link";
import { HomeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Company, User } from "../../../util/server";

export default function SignupPage() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [isSignedUp, setIsSignedUp] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [passwordVisible, setPasswordVisible] = useState(false);
  // const [termsAccepted, setTermsAccepted] = useState(false);
  // const [userType, setUserType] = useState("Developer");
  // const [companyName, setCompanyName] = useState("");
  // const [companyTermsAccepted, setCompanyTermsAccepted] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    isSignedUp: false,
    isLoading: false,
    passwordVisible: false,
    termsAccepted: false,
    userType: "Developer",
    companyName: "",
    companyTermsAccepted: false,
  });
  const [firstName, setFirstName] = useState("");
  // const {
  //   firstName, lastName, email, password, error, isSignedUp, isLoading, passwordVisible, termsAccepted, userType, companyName, companyTermsAccepted
  // } = data
  const router = useRouter();

  useEffect(() => {
    // const savedFirstName = sessionStorage.getItem("firstName");
    // const savedLastName = sessionStorage.getItem("lastName");
    // const savedEmail = sessionStorage.getItem("email");
    // const savedPassword = sessionStorage.getItem("password");
    // const savedTermsAccepted =
    //   sessionStorage.getItem("termsAccepted") === "true";
    // if (savedFirstName) setFirstName(savedFirstName);
    // if (savedLastName) setLastName(savedLastName);
    // if (savedEmail) setEmail(savedEmail);
    // if (savedPassword) setPassword(savedPassword);
    // setTermsAccepted(savedTermsAccepted);
  }, []);

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
    if (!data.termsAccepted) {
      setData({
        error: "You must accept the terms and conditions to sign up.",
        ...data,
      });
      return;
    }
    if (data.userType === "Company" && !data.companyTermsAccepted) {
      setData({
        error: "You must accept the company-specific terms and conditions.",
        ...data,
      });
      return;
    }
    setData({ isLoading: true, ...data });
    if (data.password.length < 6) {
      setData({
        error: "Password must be at least 6 characters in length",
        ...data,
      });
    } else if (data.userType === "Developer") {
      const user = await User.register(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );
      if (!user) {
        setData({ error: "Email already in use", ...data });
      } else {
        router.push("/login/user");
        setData({ isLoading: false, ...data });
      }
    } else {
      const company = await Company.register(
        data.companyName,
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );
      if (!company) {
        setData({ error: "Email already in use", ...data });
      } else {
        router.push("/login/company");
        setData({ isLoading: false, ...data });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setData({ passwordVisible: !data.passwordVisible, ...data });
  };

  return (
    <div>
      <button className="absolute ml-5 mt-5">
        <Link href="/">
          <HomeIcon className="md:size-12 size-10 fill-logo-purple/85"></HomeIcon>
        </Link>
      </button>
      <div className="font-poppins flex h-screen flex-col justify-center px-6 lg:px-8 bg-gradient-to-bl from-logo-purple/95 via-mid-purple/40 via-70% to-transparent">
        {data.isSignedUp ? (
          <div className="text-center text-off-white">
            <p>Account created successfully!</p>
            <p>Email: {data.email}</p>
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
                        checked={data.userType === "Developer"}
                        onChange={() =>
                          setData({ userType: "Developer", ...data })
                        }
                        className="form-radio text-logo-purple/75 focus:ring-logo-purple focus:ring-2"
                      />
                      <span className="ml-2">Developer</span>
                    </label>
                    <label className="flex items-center text-off-white">
                      <input
                        type="radio"
                        name="userType"
                        value="Company"
                        checked={data.userType === "Company"}
                        onChange={() =>
                          setData({ userType: "Company", ...data })
                        }
                        className="form-radio text-logo-purple/75 focus:ring-logo-purple focus:ring-2"
                      />
                      <span className="ml-2">Company</span>
                    </label>
                  </div>
                </div>
                {data.userType === "Company" && (
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
                        value={data.companyName}
                        onChange={(e) =>
                          handleInputChange(
                            (companyName: string) =>
                              setData({ companyName: companyName, ...data }),
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
                        onChange={
                          (
                            e // setData({ firstName: e.target.value, ...data })
                          ) => setFirstName(e.target.value)
                          // handleInputChange(
                          //   (firstName: string) => setData({ firstName: firstName, ...data }),
                          //   "firstName",
                          //   e.target.value
                          // )
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
                        value={data.lastName}
                        onChange={(e) =>
                          handleInputChange(
                            (lastName: string) =>
                              setData({ lastName: lastName, ...data }),
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
                      value={data.email}
                      onChange={(e) =>
                        handleInputChange(
                          (email: string) => setData({ email: email, ...data }),
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
                      type={data.passwordVisible ? "text" : "password"}
                      autoComplete="current-password"
                      value={data.password}
                      onChange={(e) =>
                        handleInputChange(
                          (password: string) =>
                            setData({ password: password, ...data }),
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
                      {data.passwordVisible ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </span>
                  </div>
                </div>
                {data.userType === "Company" && (
                  <div className="flex items-center justify-center">
                    <input
                      id="companyTerms"
                      name="companyTerms"
                      type="checkbox"
                      checked={data.companyTermsAccepted}
                      onChange={() =>
                        setData({
                          companyTermsAccepted: !data.companyTermsAccepted,
                          ...data,
                        })
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
                    checked={data.termsAccepted}
                    onChange={() => {
                      setData({ termsAccepted: !data.termsAccepted, ...data });
                      sessionStorage.setItem(
                        "termsAccepted",
                        (!data.termsAccepted).toString()
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
                    disabled={data.isLoading}
                  >
                    {data.isLoading ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
                {data.error && (
                  <p className="text-red-700 font-medium text-sm text-center">
                    {data.error}
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
