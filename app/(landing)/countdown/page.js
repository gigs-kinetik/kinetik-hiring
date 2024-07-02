"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CountdownPage() {
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // if disabled then reroute to home
  const disable = true;
  useEffect(() => {
    if (disable) {
      router.push("/home");
    }
  }, [router]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (!storedEmail) {
      router.push("/login");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  useEffect(() => {
    if (email) {
      const countDownDate = new Date("July 15, 2024 23:59:59").getTime();
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setLoading(false);

        if (distance <= 0) {
          clearInterval(timer);
          setLoading(true);
          router.push("/home");
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [email]);

  if (loading) {
    return (
      <div className="font-poppins h-full flex flex-col">
        <div className="relative h-screen bg-gradient-to-tl from-logo-purple/95 via-mid-purple/40 via-65% to-transparent"></div>
      </div>
    );
  }

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
