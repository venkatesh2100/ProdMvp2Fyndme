"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function UserDataFilters() {
  const [selectedDate, setSelectedDate] = useState("2025-01-19");
  const [selectedUserType, setSelectedUserType] = useState("All User Data");
  const [groupBy, setGroupBy] = useState("Week");

  const groupOptions = ["Day", "Week", "Month", "Year"];
  const userTypes = ["New User", "Active User", "Download App"];

  return (
    <div className="bg-[#e6f0fa] px-6 py-5 rounded-lg  flex flex-wrap items-center gap-6 justify-between">
      {/* Left label and inputs */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="text-gray-800 font-semibold text-base min-w-[100px]">
          User data
        </div>

        {/* Select Time Period */}
        <div className="flex flex-col text-sm text-black">
          <label className="mb-1 font-normal text-left">Select Time Period</label> 
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white text-gray-700 px-4 py-2 pr-10 text-sm text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <ChevronDownIcon
              className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Select User Type */}
        <div className="flex flex-col text-sm ">
          <label className="mb-1 font-normal">Select User type</label>
          <div className="relative ">
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white text-gray-700 px-4   py-2 pr-10 text-sm text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              {userTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Group By Buttons */}
      <div className="flex flex-col text-sm text-gray-600 min-w-[220px]">
        <label className="mb-1 font-normal">Group By</label>
        <div className="flex gap-2 mt-1">
          {groupOptions.map((option) => (
            <button
              key={option}
              onClick={() => setGroupBy(option)}
              className={`px-5 py-2 rounded-full text-sm transition-all font-medium ${groupBy === option
                ? "bg-white text-blue-600 border border-blue-500 shadow-sm"
                : "bg-[#f0f4f9] text-gray-600 border border-transparent hover:border-gray-300"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
