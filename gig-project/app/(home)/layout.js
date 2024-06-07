import Link from "next/link";
import "../globals.css";
import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

export default function HomeLayout({ children }) {
  return (
    <html className="h-full w-full bg-off-white">
      <body className="flex flex-col min-h-full">
        <nav className="sticky top-0 bg-off-white">
          <div className="flex max-w-screen-5xl pl-10 pr-10 pt-4 pb-2 border-b-2 border-light-gray items-center justify-between">
            <div className="flex flex-row">
              <div className="flex items-center">
                <Link href="/">
                  <img
                    className="flex max-w-32"
                    src="/name.png"
                    alt="Company Logo"
                  />
                </Link>
              </div>
              <div className="group transition w-20 flex flex-row justify-start ml-2 mt-2">
                <div className="text-gray-800 duration-3000 hover:text-mid-purple/80 font-normal hover:font-semibold transition-all">
                  <Link
                    href="/home"
                    className="pt-5 pb-4 pl-6 font-poppins md:text-lg text-sm"
                  >
                    Home
                    <span className="ml-6 block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-mid-purple/80"></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="lg:flex justify-end max-w-96 w-full h-12 rounded-full border-box border-2 border-gray-400 p-3 lg:text-sm hidden items-center overflow-hidden">
                <MagnifyingGlassIcon className="size-5 fill-gray-400 ml-2" />
                <input
                  type="text"
                  className="w-96 pl-4 pr-4 bg-off-white text-dark-gray focus:outline-none font-poppins"
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
                    className="w-56 my-2 font-poppins text-sm origin-top-right rounded-lg p-1 font-normal text-logo-purple bg-white border-box border-2 border-off-white"
                  >
                    <MenuItem>
                      <div className="group flex w-full font-semibold items-center gap-2 py-3 px-3 border-box border-b-2 border-off-white">
                        Welcome, Test User!
                      </div>
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
