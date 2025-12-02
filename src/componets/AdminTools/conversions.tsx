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
  { month: "Jul", googleAds: 5, facebook: 2, instagram: 3, total: 10 },
  { month: "Aug", googleAds: 15, facebook: 8, instagram: 10, total: 35 },
  { month: "Sep", googleAds: 40, facebook: 20, instagram: 25, total: 85 },
  { month: "Oct", googleAds: 80, facebook: 45, instagram: 50, total: 175 },
  { month: "Nov", googleAds: 20, facebook: 10, instagram: 12, total: 42 },
  { month: "Dec", googleAds: 50, facebook: 25, instagram: 30, total: 105 },
  { month: "Jan", googleAds: 70, facebook: 35, instagram: 40, total: 145 },
];

export default function Conversions() {
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
        Conversions
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
        {[
          { key: "googleAds", label: "Google Ads", color: "#A114F3" },
          { key: "facebook", label: "Facebook", color: "#1814F3" },
          { key: "instagram", label: "Instagram", color: "#D4C239" },
          { key: "total", label: "Total", color: "#14D9F3" },
        ].map((item) => (
          <span
            key={item.key}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleToggle(item.key)}
          >
            <span
              style={{
                width: "47.71px",
                height: "6.729px",
                background: item.color,
                borderRadius: "4px",
                opacity:
                  selectedGraph === "all" || selectedGraph === item.key ? 1 : 0.3,
              }}
            />
            {item.label}
          </span>
        ))}
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
              <linearGradient id="colorGoogleAds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A114F3" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#A114F3" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1814F3" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#1814F3" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4C239" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#D4C239" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14D9F3" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#14D9F3" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#E5E7EB"
              strokeWidth={1}
              vertical
              horizontal
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
                  fontFamily: "Inter",
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
            />

            <YAxis
              tick={{ fill: "#4b5563", fontSize: 12 }}
              label={{
                value: "Conversions",
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

            {(selectedGraph === "all" || selectedGraph === "googleAds") && (
              <Area
                type="monotone"
                dataKey="googleAds"
                stroke="#A114F3"
                fill="url(#colorGoogleAds)"
                strokeWidth={2}
              />
            )}
            {(selectedGraph === "all" || selectedGraph === "facebook") && (
              <Area
                type="monotone"
                dataKey="facebook"
                stroke="#1814F3"
                fill="url(#colorFacebook)"
                strokeWidth={2}
              />
            )}
            {(selectedGraph === "all" || selectedGraph === "instagram") && (
              <Area
                type="monotone"
                dataKey="instagram"
                stroke="#D4C239"
                fill="url(#colorInstagram)"
                strokeWidth={2}
              />
            )}
            {(selectedGraph === "all" || selectedGraph === "total") && (
              <Area
                type="monotone"
                dataKey="total"
                stroke="#14D9F3"
                fill="url(#colorTotal)"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
