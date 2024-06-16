import Link from "next/link";
import { StarIcon } from "@heroicons/react/16/solid";

export default function HomePage() {
  return (
    <div className="flex flex-row max-w-full max-h-full">
      <div className="flex flex-col m-4 mb-10 pl-6 pr-6 md:w-[75%]">
        <div className="flex w-6/12 max-w-6/12">
          <p className="font-poppins mt-1 text-dark-gray font-normal text-lg">
            Challenges for you
          </p>
        </div>
        <div className="w-full mt-4 space-y-4">
          <div className="bg-white h-fit rounded-lg p-5">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="lg:flex flex-row hidden space-x-2 mb-2">
                    <div className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white">
                      $1,000 Cash Prize to Top 3
                    </div>
                    <div className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white">
                      Potential Intern Role
                    </div>
                    <div className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white">
                      $50 Free XYZ Credits
                    </div>
                  </div>
                  <div className="font-poppins lg:text-xl text-lg font-semibold text-logo-purple">
                    Lorem Ipsum Dolor
                  </div>
                  <div className="font-poppins lg:flex lg:text-xs hidden text-gray-500">
                    Posted 10 mins ago by XYZ
                  </div>
                </div>
                <Link href="/apply">
                  <button className="rounded-lg bg-logo-purple/85 text-white font-poppins w-32 h-10 font-medium">
                    Apply
                  </button>
                </Link>
              </div>
              <div className="font-poppins sm:text-sm text-xs mt-4 mb-4 text-logo-purple">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                imperdiet sem non ante ornare, ut iaculis dui iaculis. Maecenas
                blandit porta libero, id sollicitudin ex aliquam ut. Nullam
                tortor neque, tempor non lacus nec, porta viverra erat. Vivamus
                in euismod ipsum. Proin luctus non tellus sed dapibus. Fusce
                sodales metus eget suscipit ultricies.
              </div>
              <div className="lg:flex hidden flex-row justify-between">
                <div className="flex flex-row mt-1 items-center">
                  <StarIcon className="size-5 fill-logo-purple/85" />
                  <StarIcon className="size-5 fill-logo-purple/85" />
                  <StarIcon className="size-5 fill-logo-purple/85" />
                  <StarIcon className="size-5 fill-gray-400" />
                  <StarIcon className="size-5 fill-gray-400" />
                  <div className="font-poppins text-xs pr-2 text-gray-500">
                    &nbsp; Difficulty&nbsp; / ~ 2 hours of work
                  </div>
                </div>
                <div className="font-poppins text-sm pr-2 text-gray-500">
                  Python, React, and AWS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex hidden flex-col m-4 pr-6 mb-6 md:w-[25%] h-full">
        <p className="font-poppins mt-1 text-gray-600 font-normal text-lg">
          Filters
        </p>
        <div className="mt-4 rounded-lg bg-white h-full">
          <div className="ml-4 mt-6 font-poppins font-semibold">
            Challenge Difficulty
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              Easy (1-2 star)
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              Medium (3 star)
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              Hard (4-5 star)
            </label>
          </div>
          <div className="ml-4 mt-6 font-poppins font-semibold">Prize Pool</div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              &lt; $500
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              $500 to $1,000
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              $1,000 to $5,000
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              &gt; $5,000
            </label>
          </div>
          <div className="ml-4 mt-6 font-poppins font-semibold">
            Skill Requirement
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              &lt; 2 skills
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              2 to 4 skills
            </label>
          </div>
          <div className="ml-8 mt-2 font-poppins">
            <input
              id="default-checkbox"
              type="checkbox"
              className="size-4 accent-logo-purple/85"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 lg:text-sm text-xs text-gray-900 dark:text-gray-300"
            >
              &gt; 4 skills
            </label>
          </div>
          <div className="flex w-full justify-end mb-4">
            <Link href="/home">
              <button className="rounded-lg bg-logo-purple/85 text-white font-poppins w-24 h-10 font-medium text-sm ml-4 mr-8 mt-8">
                Filter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}