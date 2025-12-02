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
  { month: "Jul", newUser: 10, activeUser: 5, downloadApp: 12 },
  { month: "Aug", newUser: 30, activeUser: 15, downloadApp: 35 },
  { month: "Sep", newUser: 60, activeUser: 25, downloadApp: 80 },
  { month: "Oct", newUser: 150, activeUser: 50, downloadApp: 200 },
  { month: "Nov", newUser: 40, activeUser: 20, downloadApp: 60 },
  { month: "Dec", newUser: 90, activeUser: 40, downloadApp: 110 },
  { month: "Jan", newUser: 130, activeUser: 60, downloadApp: 170 },
];

export default function EngagementChart() {
  // null = show all, otherwise show only selected graph
  const [selectedGraph, setSelectedGraph] = useState(null);

  // toggle graph selection
  const handleToggle = (key) => {
    setSelectedGraph((prev) => (prev === key ? null : key));
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
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <h2
        style={{
          height: "28px",
          alignSelf: "stretch",
          color: "#343C6A",
          fontFamily: "Inter",
          fontSize: "22px",
          fontWeight: "600",
          marginLeft: "40px",
        }}
      >
        User Engagement
      </h2>

      {/* Legend / Toggle */}
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
        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("newUser")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#A114F3",
              borderRadius: "4px",
              opacity: selectedGraph === null || selectedGraph === "newUser" ? 1 : 0.3,
            }}
          />
          New User
        </span>

        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("activeUser")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#1814F3",
              borderRadius: "4px",
              opacity: selectedGraph === null || selectedGraph === "activeUser" ? 1 : 0.3,
            }}
          />
          Active User
        </span>

        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("downloadApp")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#D4C239",
              borderRadius: "4px",
              opacity: selectedGraph === null || selectedGraph === "downloadApp" ? 1 : 0.3,
            }}
          />
          Download App
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
              <linearGradient id="colorNewUser" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B21A8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6B21A8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorActiveUser" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDownloadApp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FACC15" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#E5E7EB"
              strokeWidth={1}
              vertical={true}
              horizontal={true}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#4b5563", fontSize: 12 }}
              label={{
                value: "2024 - 2025 YEAR",
                position: "bottom",
                offset: 10,
                style: {
                  fill: "#718EBF",
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextStrokeColor: "#718EBF",
                  fontFamily: "Inter",
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
            />
            <YAxis
              tick={{ fill: "#4b5563", fontSize: 12 }}
              tickFormatter={(value) =>
                value >= 1000 ? "1000" : value.toString()
              }
              label={{
                value: "Visitor Numbers",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: "#718EBF",
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextStrokeColor: "#718EBF",
                  fontFamily: "Inter",
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
            />
            <Tooltip />

            {/* Render graphs */}
            {(selectedGraph === null || selectedGraph === "newUser") && (
              <Area
                type="monotone"
                dataKey="newUser"
                stroke="#6B21A8"
                fill="url(#colorNewUser)"
                strokeWidth={2}
              />
            )}
            {(selectedGraph === null || selectedGraph === "activeUser") && (
              <Area
                type="monotone"
                dataKey="activeUser"
                stroke="#1D4ED8"
                fill="url(#colorActiveUser)"
                strokeWidth={2}
              />
            )}
            {(selectedGraph === null || selectedGraph === "downloadApp") && (
              <Area
                type="monotone"
                dataKey="downloadApp"
                stroke="#FACC15"
                fill="url(#colorDownloadApp)"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
