"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function SiteVisitsFilters() {
  const [selectedDate, setSelectedDate] = useState("2025-01-19");
  const [groupBy, setGroupBy] = useState("Week");

  const groupOptions = ["Day", "Week", "Month", "Year"];

  return (
    <div className="bg-[#e6f0fa] px-6 py-5 rounded-lg flex flex-col gap-4">

      {/* Title */}
      <div className="text-gray-800 font-semibold text-base">Visits/Click data</div>

      {/* Line Gap */}
      <div className="w-full h-0.5 bg-transparent"></div>

      {/* Row containing: Select Time Period & Group By */}
      <div className="flex flex-wrap items-center justify-between gap-6">

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
            />
          </div>
        </div>

        {/* Group By */}
        <div className="flex flex-col text-sm text-gray-600 min-w-[220px]">
          <label className="mb-1 font-normal">Group By</label>
          <div className="flex gap-2 mt-1">
            {groupOptions.map((option) => (
              <button
                key={option}
                onClick={() => setGroupBy(option)}
                className={`px-5 py-2 rounded-full text-sm transition-all font-medium ${
                  groupBy === option
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
    </div>
  );
}
