"use client";

import Link from "next/link";
import "../globals.css";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EventsProvider } from "../../lib/eventsContext";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

export default function HomeLayout({ children }) {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setLoggedIn(true);
      setEmail(storedEmail);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleSignOut = () => {
    sessionStorage.clear();
    router.push("/");
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <EventsProvider>
      <html className="h-full w-full bg-off-white">
        <body className="flex flex-col min-h-full">
          <nav className="sticky top-0 bg-off-white mt-4">
            <div className="flex max-w-screen-5xl pl-10 pr-10 pt-4 pb-2 border-b-2 border-light-gray items-center justify-between">
              <div className="flex flex-row">
                <div className="flex items-center">
                  <Link href="/home">
                    <img
                      className="flex max-w-32 mb-4"
                      src="/name.png"
                      alt="Company Logo"
                    />
                  </Link>
                </div>
                <div className="group transition w-20 flex flex-row justify-start ml-2 mt-2">
                  <div className="text-logo-purple/85 duration-3000font-normal hover:font-semibold transition-all">
                    <Link
                      href="/home"
                      className="pt-5 pb-4 pl-6 font-poppins md:text-lg text-sm"
                    >
                      Home
                      <span className="ml-6 block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-logo-purple/85"></span>
                    </Link>
                  </div>
                </div>
              </div>

              <Menu>
                <MenuButton className="ml-8 justify-end font-semibold">
                  <UserCircleIcon className="lg:size-11 size-8" />
                </MenuButton>
                <Transition
                  enter="transition ease-out duration-75"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <MenuItems
                    anchor="bottom end"
                    className="w-56 my-2 font-poppins text-sm origin-top-right rounded-lg p-1 font-normal text-logo-purple bg-white border-box border-2 border-off-white"
                  >
                    <MenuItem>
                      <div className="group flex w-full font-semibold items-center gap-2 py-3 px-3 border-box border-b-2 border-off-white">
                        Welcome, {email}!
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="group flex w-full items-center gap-2 py-3 px-3 hover:bg-off-white hover:font-semibold"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </nav>
          <main className="flex-grow">{children}</main>
          <footer>
            <div className="flex flex-row text-sm pl-10 pr-10 pt-5 pb-5 font-poppins text-off-white bg-logo-purple/85 h-20 justify-between">
              <div className="flex self-center">
                Please contact for any inquiries.
              </div>
              <div className="flex text-center self-center">
                @2024 Kinetik. All Rights Reserved.
              </div>
              <div className="flex flex-col text-right self-end">
                <div>pran.singaraju@gmail.com</div>
                <div>agnithegreat@gmail.com</div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </EventsProvider>
  );
}
