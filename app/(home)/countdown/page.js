'use client';

import Link from "next/link";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function CountdownPage() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    // Set the date we're counting down to
    const countDownDate = new Date("Jun 30, 2024 11:59:00").getTime();

    // Update the countdown every second
    const timer = setInterval(() => {
      // Get the current date and time
      const now = new Date().getTime();

      // Find the distance between now and the countdown date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the countdown in the format you prefer
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      // If the countdown is finished, display a message
      if (distance < 0) {
        clearInterval(timer);
        setCountdown("EXPIRED");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleScrollDown = () => {
    if (window.scrollY === 0) {
      const viewportHeight = window.innerHeight;
      window.scrollBy({ top: viewportHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="font-poppins h-full flex flex-col">
      <div className="relative h-screen bg-gradient-to-tl from-logo-purple/95 via-mid-purple/40 via-65% to-transparent">
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="md:text-4xl text-xl font-bold text-white">
              LAUNCHING SOON...
            </div>
            <div className="md:text-8xl text-5xl font-bold text-logo-purple">
              {countdown}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
