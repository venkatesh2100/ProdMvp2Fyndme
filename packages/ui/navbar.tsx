import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm" style={{ padding: "12px 40px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            {/* Text + icon logo */}
            <div className="flex items-center space-x-1">
                <Image
                    src="/logo.png"
                    alt="Templates"
                    width={84}
                    height={34}
                    className="mr-1"
                  />
            </div>

            {/* Desktop menu */}
            <div className="hidden md:ml-8 md:block">
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="flex items-center text-sm text-gray-800 hover:text-indigo-600 transition-colors"
                >
                <Image
                    src="/sparkles.png"
                    alt="Templates"
                    width={17}
                    height={17}
                    className="mr-1"
                  />
                  Features
                </a>

                <a
                  href="#"
                  className="flex items-center text-sm text-gray-800 hover:text-indigo-600 transition-colors"
                >
                  <Image
                    src="/Layer_1.png"
                    alt="Templates"
                    width={16}
                    height={16}
                    className="mr-1"
                  />
                  Templates
                </a>

                <a
                  href="#"
                  className="flex items-center text-sm text-gray-800 hover:text-indigo-600 transition-colors"
                >
                <Image
                    src="/currency-dollar.png"
                    alt="Templates"
                    width={17}
                    height={17}
                    className="mr-1"
                  />
                  Pricing
                </a>

                <a
                  href="#"
                  className="flex items-center text-sm text-gray-800 hover:text-indigo-600 transition-colors"
                >
                  <Image
                    src="/Layer_4.png"
                    alt="Search"
                    width={17}
                    height={17}
                    className="mr-1"
                  />
                  Search
                </a>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <div className="hidden md:block">
              <button className="relative flex items-center justify-center rounded-full h-8 w-8 font-bold text-xs bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                <span>TC</span>
              </button>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
