import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";

export default function ApplyPage() {
  return (
    <div className="flex flex-col ml-10 mr-10 mb-10 mt-4">
      <div className="flex flex-row mb-4">
        <Link href="/">
          <ArrowUturnLeftIcon className="flex-shrink-0 size-8 mt-1 mr-3" />
        </Link>
        <p className="font-poppins mt-1 ml-4 text-gray-600 font-normal text-lg">
          Challenge Submission
        </p>
      </div>

      <div className="flex flex-col bg-white rounded-lg p-5">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-col">
            <div className="font-poppins lg:text-3xl text-xl font-semibold text-logo-purple">
              Lorem Ipsum Dolor
            </div>
            <div className="font-poppins mt-2 lg:flex lg:text-xs hidden text-gray-500">
              Posted 10 mins ago by XYZ
            </div>
          </div>
          <button className="rounded-lg bg-mid-purple text-white font-poppins w-32 h-10 font-medium">
            Apply
          </button>
        </div>
        <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
          Task
        </div>
        <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          imperdiet sem non ante ornare, ut iaculis dui iaculis. Maecenas
          blandit porta libero, id sollicitudin ex aliquam ut. Nullam tortor
          neque, tempor non lacus nec, porta viverra erat. Vivamus in euismod
          ipsum. Proin luctus non tellus sed dapibus. Fusce sodales metus eget
          suscipit ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Nunc imperdiet sem non ante ornare, ut iaculis dui iaculis.
          Maecenas blandit porta libero, id sollicitudin ex aliquam ut. Nullam
          tortor neque, tempor non lacus nec, porta viverra erat. Vivamus in
          euismod ipsum. Proin luctus non tellus sed dapibus. Fusce sodales
          metus eget suscipit ultricies.
        </div>
        <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
          Prize Pool
        </div>
        <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          imperdiet sem non ante ornare, ut iaculis dui iaculis. Maecenas
          blandit porta libero, id sollicitudin ex aliquam ut. Nullam tortor
          neque, tempor non lacus nec, porta viverra erat. Vivamus in euismod
          ipsum. Proin luctus non tellus sed dapibus. Fusce sodales metus eget
          suscipit ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </div>
        <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
          Difficulty
        </div>
        <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          imperdiet sem non ante ornare, ut iaculis dui iaculis. Maecenas
          blandit porta libero, id sollicitudin ex aliquam ut. Nullam tortor
          neque, tempor non lacus nec, porta viverra erat. Vivamus in euismod
          ipsum. Proin luctus non tellus sed dapibus. Fusce sodales metus eget
          suscipit ultricies.
        </div>
        <div className="font-poppins sm:text-lg font-semibold text-sm mt-4 text-logo-purple">
          Skill Requirements
        </div>
        <div className="font-poppins sm:text-sm text-xs mt-1 mb-4 text-logo-purple">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          imperdiet sem non ante ornare, ut iaculis dui iaculis.
        </div>
      </div>
    </div>
  );
}
