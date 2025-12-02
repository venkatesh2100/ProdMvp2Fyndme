"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ChloroplethMap from "./chloropethMap";
const COLORS = ["#009FFD", "#8CDEFC", "#D3F4FF"];
const returningColors = ["#009FFD", "#D3F4FF"];

type DataItem = { name: string; value: number };
type DashboardData = {
  deviceSessions: DataItem[];
  visitorType: DataItem[];
};

const TrafficDashboard = () => {
  const [selectedDate, setSelectedDate] = useState("19 January 2025");
  const [timeFrame, setTimeFrame] = useState("daily");
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const usaData = [
    { name: "California", code: "CA", value: 20 },
    { name: "New York", code: "NY", value: 10 },
  ]

  const indiaData = [
    { name: "Maharashtra", code: "MH", value: 250 },
    { name: "Karnataka", code: "KA", value: 180 },
    { name: "Tamil Nadu", code: "TN", value: 165 },
    { name: "Delhi", code: "DL", value: 150 },
    { name: "Uttar Pradesh", code: "UP", value: 140 },
    { name: "Gujarat", code: "GJ", value: 125 },
    { name: "West Bengal", code: "WB", value: 110 },
    { name: "Telangana", code: "TG", value: 95 },
    { name: "Rajasthan", code: "RJ", value: 85 },
    { name: "Haryana", code: "HR", value: 75 },
    { name: "Kerala", code: "KL", value: 70 },
    { name: "Madhya Pradesh", code: "MP", value: 65 },
    { name: "Punjab", code: "PB", value: 60 },
    { name: "Andhra Pradesh", code: "AP", value: 55 },
    { name: "Bihar", code: "BR", value: 50 },
    // Add more states as needed
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/dashboard?timeFrame=${timeFrame}`);
        const data = await res.json();
        setDashboardData({
          deviceSessions: data.deviceSessions || [],
          visitorType: data.visitorType || [],
        });
      } catch (error) {
        console.error("Failed to fetch traffic data", error);
      }
    };

    fetchData();
  }, [timeFrame]);

  const deviceData = dashboardData?.deviceSessions || [];
  const returningData = dashboardData?.visitorType || [];

  const totalSessions = deviceData.reduce((sum, d) => sum + d.value, 0);
  const totalVisitors = returningData.reduce((sum, d) => sum + d.value, 0);
  const stateSessions = [
    { state: "NY", value: 10 },
    { state: "CA", value: 20 },
  ];

  const maxSessions = Math.max(...stateSessions.map((s) => s.value));
  const countryData = selectedCountry === "United States" ? usaData : indiaData;
  const countryCode = selectedCountry === "United States" ? "USA" : "India";
  const countryTitle = selectedCountry === "United States" ? "USA" : "India";

  
  if (!dashboardData) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading traffic data...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-6 space-y-8 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center ">
        <h1 className="text-2xl font-semibold text-[#1F1F1F] mr-10 ">
          Traffic Data
        </h1>

        <div className="flex gap-3 mt-2 sm:mt-0 text-sm text-gray-600 flex-wrap">
          {["Daily", "Weekly", "Monthly", "Yearly", "Till Date"].map(
            (label, idx, arr) => (
              <span key={label} className="flex items-center gap-1">
                <button
                  onClick={() => setTimeFrame(label.toLowerCase())}
                  className={`transition-colors ${timeFrame === label.toLowerCase()
                    ? "text-[#2563EB] font-semibold"
                    : "text-gray-500"
                    }`}
                >
                  {label}
                </button>
                {idx < arr.length - 1 && (
                  <span className="text-gray-300">|</span>
                )}
              </span>
            )
          )}
        </div>
      </div>

      <div className="w-full border-b-2 border-black mt-1 mb-8"></div>

      {/* Date Picker and Stats */}
      <div className="space-y-4 flex ">
        <div className="mr-10">
          <label className="block text-gray-600 mb-1 text-sm ">
            Select Time Period
          </label>
          <input
            type="text"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-10  py-2 w-full text-sm shadow-sm"
          />
        </div>
        <div className="flex  gap-3">
          <div className="bg-white p-4  px-10 rounded-xl shadow-sm">
            <p className="text-gray-500 text-xs">Site Sessions</p>
            <h2 className="text-xl font-bold text-[#1F1F1F]">
              {totalSessions}
            </h2>
            <p className="text-green-500 text-xs mt-1">+32%</p>
          </div>
          <div className="bg-white p-4 px-10 rounded-xl shadow-sm">
            <p className="text-gray-500 text-xs">Unique Visitors</p>
            <h2 className="text-xl font-bold text-[#1F1F1F]">
              {totalVisitors}
            </h2>
            <p className="text-green-500 text-xs mt-1">+33%</p>
          </div>
        </div>
      </div>

      {/* Device + Returning Visitors */}
      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        {/* Sessions by Device */}
        <div className="bg-white flex-1 p-4 rounded-xl shadow-sm space-y-4">
          <div className="text-sm font-semibold">Sessions by Device</div>
          <ul className="space-y-1 text-xs">
            {deviceData.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                ></span>
                {d.name} — {d.value}
              </li>
            ))}
          </ul>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={({ cx, cy }) => (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-800"
                  >
                    <tspan x={cx} dy="-0.5em" className="text-xs ">
                      Site Sessions
                    </tspan>
                    <tspan x={cx} dy="1.2em" className="text-lg font-bold">
                      {totalSessions}
                    </tspan>
                  </text>
                )}
              >
                {deviceData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>


        <div className="bg-white flex-1 p-4 rounded-xl shadow-sm space-y-4">
          <div className="text-sm font-semibold">New vs Returning Visitors</div>
          <ul className="space-y-1 text-xs">
            {returningData.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{
                    background: returningColors[i % returningColors.length],
                  }}
                ></span>
                {d.name} — {d.value}
              </li>
            ))}
          </ul>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={returningData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ cx, cy }) => (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-800"
                  >
                    <tspan x={cx} dy="-0.5em" className="text-xs ">
                      Site Sessions
                    </tspan>
                    <tspan x={cx} dy="1.2em" className="text-lg font-bold">
                      {totalSessions}
                    </tspan>
                  </text>
                )}
              >
                {returningData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={returningColors[index % returningColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center font-bold text-lg">{totalVisitors}</p>
        </div>
      </div>
      <div>
        <label className="block text-gray-600  text-sm">Select Country</label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 w-70 text-sm bg-white shadow-sm"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option>United States</option>
          <option>India</option>
        </select>
      </div>
      {/* Country Map Section */}
      <div>
        <ChloroplethMap
          country={countryCode}
          regionData={countryData}
          title={`Session by ${countryTitle}`} />
      </div>
    </div>
  );
};

export default TrafficDashboard;
