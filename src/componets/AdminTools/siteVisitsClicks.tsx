"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jul", visits: 5, adClicks: 2 },
  { month: "Aug", visits: 15, adClicks: 8 },
  { month: "Sep", visits: 40, adClicks: 20 },
  { month: "Oct", visits: 80, adClicks: 45 },
  { month: "Nov", visits: 20, adClicks: 10 },
  { month: "Dec", visits: 50, adClicks: 25 },
  { month: "Jan", visits: 70, adClicks: 35 },
];

export default function SiteVisitsClicks() {
  const [selectedGraph, setSelectedGraph] = useState("all");

  const handleToggle = (key) => {
    setSelectedGraph((prev) => (prev === key ? "all" : key));
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "548px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        padding: "35px 10px",
        borderRadius: "25px",
        background: "#FFF",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <h2
        style={{
          height: "28px",
          color: "#343C6A",
          fontFamily: "Inter",
          fontSize: "22px",
          fontWeight: "600",
          marginLeft: "40px",
        }}
      >
        Site Visits / Clicks
      </h2>

      {/* LEGEND */}
      <div
        style={{
          display: "flex",
          padding: "0 148px",
          alignItems: "center",
          gap: "50px",
          alignSelf: "stretch",
          color: "#49699F",
          fontFamily: "Inter",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >

        {/* Visits */}
        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("visits")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#A114F3",
              borderRadius: "4px",
              opacity:
                selectedGraph === "all" || selectedGraph === "visits" ? 1 : 0.3,
            }}
          />
          Visits
        </span>

        {/* Ad Clicks */}
        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("adClicks")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#1814F3",
              borderRadius: "4px",
              opacity:
                selectedGraph === "all" || selectedGraph === "adClicks"
                  ? 1
                  : 0.3,
            }}
          />
          Ad Clicks
        </span>
      </div>

      {/* Chart */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "3px",
          width: "100%",
          height: "100%",
          padding: "0 40px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <defs>
              {/* Visits */}
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A114F3" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#A114F3" stopOpacity={0} />
              </linearGradient>

              {/* Ad Clicks */}
              <linearGradient id="colorAdClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1814F3" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#1814F3" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              stroke="#E5E7EB"
              strokeWidth={1}
              vertical={true}
              horizontal={true}
              strokeDasharray="3 3"
            />

            {/* X-Axis */}
            <XAxis
              dataKey="month"
              tick={{ fill: "#4b5563", fontSize: 12 }}
              label={{
                value: "2024 - 2025 YEAR",
                position: "bottom",
                offset: 10,
                style: {
                  fill: "#718EBF",
                  fontFamily: "Inter",
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
            />

            {/* Y-Axis */}
            <YAxis
              tick={{ fill: "#4b5563", fontSize: 12 }}
              tickFormatter={(value) => value.toString()}
              label={{
                value: "Visitor/Click Numbers",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: "#718EBF",
                  fontFamily: "Inter",
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
            />

            <Tooltip />

            {/* Graph Lines */}
            {(selectedGraph === "all" || selectedGraph === "visits") && (
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#A114F3"
                fill="url(#colorVisits)"
                strokeWidth={2}
              />
            )}
            {(selectedGraph === "all" || selectedGraph === "adClicks") && (
              <Area
                type="monotone"
                dataKey="adClicks"
                stroke="#1814F3"
                fill="url(#colorAdClicks)"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
