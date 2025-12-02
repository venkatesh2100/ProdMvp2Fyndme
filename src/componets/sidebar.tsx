"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LogoutModal from "./logout-modal";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { id: "admin", label: "Admin Dashboard", icon: "/home.png", activeIcon: "/home-blue.png", path: "/admin-dashboard" },
    { id: "users", label: "User Management", path: "/user-management" },
    { id: "tools", label: "Admin Tools", path: "/admin-tools" },
    { id: "performance", label: "Performance Metric", path: "/performance-metric" },
    { id: "feedback", label: "Feedback & Support", path: "/feedback" },
  ];

  const handleClick = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    // Clear any stored data
    localStorage.clear();
    // Redirect to home/login page
    router.push("/");
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <aside className="w-[280px] h-full bg-white shadow-md flex flex-col justify-between">
      <div className="pr-6 pt-4">
        <h2 className="text-lg font-semibold mb-8 text-center px-6 pt-8 text-gray-800">
          Welcome to <br /> Admin Dashboard
        </h2>

        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.path)}
            className="flex cursor-pointer group"
          >
            <div
              className={`w-1 rounded-r transition-colors duration-200 ${pathname === item.path ? "bg-blue-500" : "bg-transparent"
                }`}
            />
            <div className="flex items-center gap-3 px-4 pr-8 py-2 w-full">
              {item.icon ? (
                <Image
                  src={pathname === item.path && item.activeIcon ? item.activeIcon : item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${pathname === item.path ? "" : "opacity-70"}`}
                />
              ) : (
                <div className="w-[20px] h-[20px]" />
              )}
              <span
                className={`transition-colors leading-none ${pathname === item.path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 group-hover:text-gray-700"
                  }`}
              >
                {item.label}
              </span>
            </div>
          </div>
        ))}

        {/* Settings & Logout */}
        <div className="pt-10 space-y-4 text-sm text-gray-600 px-6">
          <button
            onClick={() => handleClick("/settings")}
            className="cursor-pointer hover:text-blue-500 flex items-center gap-2"
          >
            <Image src="/set.png" alt="Settings" width={20} height={20} />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogoutClick}
            className="cursor-pointer hover:text-blue-500 flex items-center gap-2 w-full text-left"
          >
            <Image src="/out.png" alt="Logout" width={20} height={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center mt-8 px-6">
        © 2025, Findme
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </aside>
  );
}
