import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <div className="flex flex-col max-w-full max-h-full ml-20 mr-20 mt-5">
        <div className="flex flex-row max-w-full h-20 font-poppins p-5 justify-between">
          <div className="text-4xl font-extrabold text-logo-purple">
            <img className="w-36" src="/name.png" alt="Company Logo" />
          </div>
          <div className="flex flex-row max-w-full space-x-8 md:text-lg text-sm font-semibold text-logo-purple hover:text-mid-purple/80">
            <div className="mt-2 max-w-20 content-center font-poppins justify-center">
              <Link href="/home" className="group transition-all duration-1000">
                Log In
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-mid-purple/80"></span>
              </Link>
            </div>
            <Link href="/home">
              <button className="w-28 max-w-28 rounded-lg bg-mid-purple text-off-white font-poppins h-12 hover:bg-mid-purple/90">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col font-poppins ml-5 mt-24 ">
          <div className="mb-3 font-semibold text-lg text-gray-500">
            Simple. Easy. Transformative.
          </div>
          <div className="text-6xl font-semibold space-y-2 transition-all ease-in duration-200 text-logo-purple hover:text-mid-purple/85 hover:cursor-default">
            <div className="flex flex-row space-x-5 items-center">
              <div>Rediscover What</div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row space-x-5">
                <div>It Means To Gig.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
