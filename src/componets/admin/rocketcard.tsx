import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function RocketCard() {
  const [users, setUsers] = useState(1);


  useEffect(() => {
    const savedUsers = localStorage.getItem("usersCount");
    if (savedUsers) {
      setUsers(parseInt(savedUsers, 10));
    }
  }, []);

  // Increment every second and store
  useEffect(() => {
    const timer = setInterval(() => {
      setUsers((prev) => {
        const updated = prev + 1;
        localStorage.setItem("usersCount", updated.toString());
        return updated;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div
        className="relative rounded-4xl flex items-center space-x-16 shadow-lg overflow-hidden"
        style={{
          backgroundColor: "#0F124D",
          width: "960px",
          height: "136px",
        }}
      >
        {/* Star background with slow movement */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full "
              style={{
                width: "2px",
                height: "2px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                // animationDelay: `${Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Time display */}
        <div className="flex flex-col items-center pl-35  text-white">
          <span className="text-6xl ">1</span>
          <span className="text-sm">Days</span>
        </div>

        <div className="flex flex-col items-center text-white">
          <span className="text-6xl ">1</span>
          <span className="text-sm">Hours</span>
        </div>

        <div className="flex flex-col items-center text-white">
          <span className="text-6xl ">
            {users.toString().padStart(7, "0")}
          </span>
          <span className="text-sm">Users</span>
        </div>

        {/* Rocket Image */}
        <div className="ml-auto pr-8">
          <Image
            src="/rocket.png"
            alt="Rocket"
            height={154}
            width={127}
            unoptimized
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes slowMove {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-5px) translateX(3px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        .animate-slow-move {
          animation: slowMove 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
