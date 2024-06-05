import Link from "next/link";
import "./globals.css";
import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

export default function RootLayout({ children }) {
  return (
    <html className="h-full w-full bg-off-white">
      <body className="flex flex-col min-h-full">
        <nav className="sticky top-0 bg-off-white">
          <div className="flex max-w-screen-5xl pl-10 pr-10 pt-4 pb-2 border-b-2 border-light-gray items-center">
            <div className="flex items-center">
              <Link href="/">
                <img className="w-48" src="/name.png" alt="Company Logo" />
              </Link>
            </div>
            <div className="w-full flex flex-row justify-start ml-2">
              <Link
                href="/"
                className="pt-4 pb-4 pl-6 font-poppins text-dark-gray md:text-lg text-sm font-light hover:font-semibold hover:text-mid-purple/80"
              >
                Home
              </Link>
            </div>
            <div className="lg:flex justify-end max-w-96 w-full h-12 rounded-full border-box border-2 border-gray-400 p-3 lg:text-sm hidden items-center overflow-hidden">
              <MagnifyingGlassIcon className="size-5 fill-gray-400 ml-2" />
              <input
                type="text"
                className="w-full pl-4 pr-4 bg-off-white text-dark-gray focus:outline-none font-poppins"
                placeholder="Search for a Gig"
              />
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
                  className="w-56 my-2 font-poppins text-md origin-top-right rounded-lg p-1 font-normal text-logo-purple bg-white border-box border-2 border-off-white"
                >
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 py-3 px-3 border-box border-b-2 border-off-white hover:bg-off-white hover:font-semibold">
                      Account
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 py-3 px-3 hover:bg-off-white hover:font-semibold">
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
          <div className="md:flex flex-row rounded-t-md hidden text-sm pl-10 pr-10 pt-5 pb-5 font-poppins text-off-white bg-mid-purple h-20 justify-between">
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
  );
}
