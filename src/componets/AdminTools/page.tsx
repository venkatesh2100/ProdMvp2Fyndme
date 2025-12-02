"use client";
import { useRouter } from "next/navigation";
import React from "react";
import SiteVisitsFilters from "./siteVisitsBar";
import ConversionDataFilters from "./conversionsBar";
import SiteVisitsClicks from "./siteVisitsClicks";
import Conversions from "./conversions";
export default function DashboardOverview() {
  const router = useRouter();
  return (
    <div className="min-h-screen px-8 py-6 font-sans">
      {/* Title */}
      <h1 className="text-[22px] font-bold mb-8">Overview</h1>

      {/* Top Stats */}
      <div className="flex gap-4 ">
        {[
          { label: "User Feedback", value: "3,671" },
          { label: "Ticket Submit", value: "100" },
          { label: "Ticket Closed", value: "50" },
          { label: "Teams", value: "50" },
          { label: "Admin", value: "2" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-4 px-8  text-left"
          >
            <p className="text-gray-600 text-sm">{item.label}</p>
            <p className="text-[22px] font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* User Verification */}
      <h2 className="text-[15px] font-bold mt-10 mb-4">User Verification</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Requests Pending */}
        <div className="rounded-lg shadow p-4 bg-white from-pink-50  ">
          <div className="flex justify-between items-center mb-3 ">
            <h3 className="text-[13px] font-semibold text-gray-800">
              Requests Pending
            </h3>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-[22px] font-semibold mb-3">25</p>
            <button 
               onClick={() => router.push("/admin-tools/requests-pending")}
              className="flex items-center gap-1 text-white bg-black px-3 py-0.5 rounded-full text-xs hover:bg-gray-800 transition">
              Expand
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                />
              </svg>
            </button>
          </div>
          <table className="w-full text-sm border text-left border-gray-300">
            <tbody>
              <tr className="border-t border-b border-gray-300">
                <td className="p-[10px] py-2 border-r border-gray-300">Sam Owens</td>
                <td className="p-[10px] py-2 border-r border-gray-300">samowens678</td>
                <td className="p-[10px] py-2">Submitted 5 min ago</td>
              </tr>
              <tr className="border-t border-b border-gray-300">
                <td className="p-[10px] py-2 border-r border-gray-300">John Doe</td>
                <td className="p-[10px] py-2 border-r border-gray-300">johndoe0000</td>
                <td className="p-[10px] py-2">Submitted 15 min ago</td>
              </tr>
              <tr className="border-t border-b border-gray-300">
                <td className="p-[10px] py-2 border-r border-gray-300">Jane Smith</td>
                <td className="p-[10px] py-2 border-r border-gray-300">janesmith1234</td>
                <td className="p-[10px] py-2">Submitted 1 hr ago</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Requests Completed */}
        <div className="rounded-lg shadow p-4 bg-white from-pink-50 to-white">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[13px] font-semibold text-gray-800">
              Requests Completed
            </h3>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-[22px] font-semibold mb-3">578</p>
            <button 
               onClick={() => router.push("/admin-tools/requests-completed")}
              className="flex items-center gap-1 text-white bg-black px-3 py-0.5 rounded-full text-xs hover:bg-gray-800 transition">
              Expand
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                />
              </svg>
            </button>
          </div>
          <table className="w-full text-sm border text-left border-gray-300">
            <tbody>
              <tr className="border-t border-b border-gray-300">
                <td className="p-[10px] border-r border-gray-300 flex items-center gap-2">
                  <svg className="w-2 h-2" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="#10B981" />
                  </svg>
                  Alice Brown
                </td>
                <td className="p-[10px] border-r border-gray-300">alicebrown2000</td>
                <td className="p-[10px]">Submitted 5 min ago</td>
              </tr>

              <tr className="border-t border-b border-gray-300">
                <td className="p-[10px] border-r border-gray-300 flex items-center gap-2">
                  <svg className="w-2 h-2" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="#EF4444" />
                  </svg>
                  Bob Martin
                </td>
                <td className="p-[10px] border-r border-gray-300">robertsmith99</td>
                <td className="p-[10px]">Submitted 15 min ago</td>
              </tr>

              <tr className="border-t border-b border-gray-300">
                <td className="p-[10px] border-r border-gray-300 flex items-center gap-2">
                  <svg className="w-2 h-2" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="#10B981" />
                  </svg>
                  Emma James
                </td>
                <td className="p-[10px] border-r border-gray-300">emmajames543</td>
                <td className="p-[10px]">Submitted 1 hr ago</td>
              </tr>

            </tbody>
          </table>

        </div>
      </div>

      {/* Promotions Management */}
      <h2 className="text-[15px]  font-bold mt-20 mb-4">
        Promotions Management
      </h2>
      <div className="flex  gap-4">
        {[
          { label: "Ongoing Promotions", value: "2" },
          { label: "Upcoming Promotions", value: "3" },
          { label: "Past Promotions", value: "56" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-4 px-10 text-left"
          >
            <p className="text-gray-600 text-sm">{item.label}</p>
            <p className="text-[22px] font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[13px] font-semibold text-gray-800">
            Performance Summary
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => router.push("/admin-tools/performance-summary")}
              className="bg-black text-white text-xs px-3 py-1 rounded-full shadow">
              Expand
            </button>
            <button
              onClick={() => router.push("/admin-tools/performance-summary")}
              className="bg-black text-white text-xs w-[38px] h-[38px] px-3 py-3 rounded-full shadow"
            >
              <img 
                src="/Filter.svg"
                alt="collapse"
                className="w-[14.4px] h-[14.4px]"
              />
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300  text-left">
              <th className="py-2">Title</th>
              <th className="py-2">Status</th>
              <th className="py-2">Conversions Rate</th>
              <th className="py-2">Clicks/Last 24 Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-300">
              <td className="py-2">Buy 1 Get 1 Free</td>
              <td className="py-2 ">Expires 3 days</td>
              <td className="py-2">22%</td>
              <td className="py-2">1,240</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="py-2">30% off Selected Items</td>
              <td className="py-2 ">Expires 1 day</td>
              <td className="py-2">19%</td>
              <td className="py-2">1,090</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="py-2">Black Friday Sale</td>
              <td className="py-2 ">Expired 1 week</td>
              <td className="py-2">25%</td>
              <td className="py-2">—</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Site Visits/Clicks Section */}
            <SiteVisitsFilters />
            <SiteVisitsClicks />
      {/* Site Visits/Clicks Section */}
            <ConversionDataFilters />
            <Conversions />
    </div>
  );
}
