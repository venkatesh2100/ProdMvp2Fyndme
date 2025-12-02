"use client";

import React, { useState } from "react";

type Filters = {
  portfolioType: string[];
  portfolioVerification: string[];
  idVerification: string[];
  subscription: string[];
  numberOfPortfolios: (number | string)[];
  sizeLimit: number;
  location: string[];
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const FILTER_OPTIONS = {
  portfolioType: [
    "Personal",
    "Corporate",
    "Matrimonial",
    "Business",
    "Creative",
    "Academic",
    "Community & Service",
    "Lifestyle",
    "Professional",
  ],
  portfolioVerification: ["Verified", "In progress", "Not verified"],
  idVerification: ["Verified", "In progress", "Not verified"],
  subscription: ["Basic", "Standard", "Advanced", "Premium"],
  numberOfPortfolios: ["1", "2", "3", "4 or more"],
  location: ["United States", "India", "Canada", "Japan"],
};

const FiltersPanel = ({ filters, setFilters }: Props) => {
  const toggleValue = (category: keyof Filters, value: string | number) => {
    setFilters((prev) => {
      const arr = prev[category] as (string | number)[];
      return {
        ...prev,
        [category]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const [locationSearch, setLocationSearch] = useState("");
  const [portfolioTypeSearch, setPortfolioTypeSearch] = useState("");

  return (
    <div className="bg-white  rounded-md p-6 shadow-sm text-sm text-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filter</h2>
        <button
          onClick={() => {
            setFilters({
              portfolioType: [],
              portfolioVerification: [],
              idVerification: [],
              subscription: [],
              numberOfPortfolios: [],
              sizeLimit: 50000,
              location: [],
            });
            setPortfolioTypeSearch("");
            setLocationSearch("");
          }}
          className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors"
        >
          Clear all
        </button>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Portfolio Type</p>
            <input
              type="text"
              placeholder="Type to Search"
              className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
              value={portfolioTypeSearch}
              onChange={(e) => setPortfolioTypeSearch(e.target.value)}
            />
            {FILTER_OPTIONS.portfolioType
              .filter((type) =>
                type.toLowerCase().includes(portfolioTypeSearch.toLowerCase())
              )
              .map((type) => (
                <label key={type} className="block">
                  <input
                    type="checkbox"
                    checked={filters.portfolioType.includes(type)}
                    onChange={() => toggleValue("portfolioType", type)}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Portfolio Verification</p>
            {FILTER_OPTIONS.portfolioVerification.map((option) => (
              <label key={option} className="block">
                <input
                  type="checkbox"
                  checked={filters.portfolioVerification.includes(option)}
                  onChange={() => toggleValue("portfolioVerification", option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          <div>
            <p className="font-medium mb-2">ID Verification</p>
            {FILTER_OPTIONS.idVerification.map((option) => (
              <label key={option} className="block">
                <input
                  type="checkbox"
                  checked={filters.idVerification.includes(option)}
                  onChange={() => toggleValue("idVerification", option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          <div>
            <p className="font-medium mb-2">Number of Portfolios</p>
            {FILTER_OPTIONS.numberOfPortfolios.map((option) => (
              <label key={option} className="inline-block mr-4 mb-2">
                <input
                  type="checkbox"
                  checked={filters.numberOfPortfolios.includes(option)}
                  onChange={() => toggleValue("numberOfPortfolios", option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Size</p>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500">0 KB</span>
              <input
                type="range"
                min={0}
                max={50000}
                value={filters.sizeLimit}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sizeLimit: Number(e.target.value),
                  }))
                }
                className="w-full"
              />
              <span className="text-xs text-gray-500">50,000 KB</span>
            </div>
            <div className="text-blue-600 font-medium text-xs pl-1">
              {filters.sizeLimit} KB
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Location</p>
            <input
              type="text"
              placeholder="Type to Search"
              className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
              value={locationSearch}
              onChange={(e) => {
                const value = e.target.value;
                setLocationSearch(value);
                setFilters((prev) => ({
                  ...prev,
                  location: value ? [value.trim()] : [],
                }));
              }}
            />
            {FILTER_OPTIONS.location.map((loc) => (
              <label key={loc} className="block">
                <input
                  type="checkbox"
                  checked={filters.location.includes(loc)}
                  onChange={() => toggleValue("location", loc)}
                  className="mr-2"
                />
                {loc}
              </label>
            ))}
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <p className="font-medium mb-2">Subscription</p>
          {FILTER_OPTIONS.subscription.map((option) => (
            <label key={option} className="block">
              <input
                type="checkbox"
                checked={filters.subscription.includes(option)}
                onChange={() => toggleValue("subscription", option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
