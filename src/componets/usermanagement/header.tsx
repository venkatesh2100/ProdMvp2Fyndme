"use client";

import { Funnel } from "lucide-react";

type HeaderProps = {
  onOpenFilters: () => void;
  onCloseFilters: () => void;
  filtersVisible: boolean;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
};

export default function HeaderBar({
  onOpenFilters,
  onCloseFilters,
  searchQuery,
  onSearchQueryChange,
}: HeaderProps) {
  return (
    <div className="flex justify-between items-start p-4 pb-2">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Portfolio Database
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Type to Search (Username)"
            className="border border-gray-300 rounded-md px-4 py-2 w-64 shadow-sm text-sm"
          />
          <span className="bg-black text-white text-xs px-3 py-2 rounded-md cursor-default">
            All Portfolios ×
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <button
          onClick={onOpenFilters}
          className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
        >
          <Funnel className="w-4 h-4" />
        </button>

        <button
          onClick={onCloseFilters}
          className="flex items-center gap-2 text-white bg-black px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition"
        >
          Collapse
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}