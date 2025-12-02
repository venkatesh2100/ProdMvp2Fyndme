"use client";

import Sidebar from "@/componets/sidebar";
import Navbar from "../../../packages/ui/navbar";
import HeaderRightProfile from "@/componets/owner";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTrafficReport = pathname === "/traffic-report";
  const hideSidebarRoutes = [
    "/traffic-report",
    "/admin-tools/requests-pending",
    "/admin-tools/requests-completed",
    "/admin-tools/performance-summary"
  ];

  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return (
  <div className="w-full h-screen flex flex-col overflow-hidden">
    <div className="flex-none z-50">
      <Navbar />
    </div>
    <div className="flex flex-1 overflow-hidden">
      {!isTrafficReport && (
        <div className="flex-none h-full overflow-y-auto border-r bg-white">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col bg-[#e6f0fa] overflow-hidden relative">
        {!isTrafficReport && <HeaderRightProfile />}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  </div>
);

}
