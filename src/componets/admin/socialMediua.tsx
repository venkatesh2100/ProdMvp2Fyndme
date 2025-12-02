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
  { month: "Jul", instagram: 0.5, facebook: 0.2, linkedin: 0.3, website: 0.1 },
  { month: "Aug", instagram: 4, facebook: 1.5, linkedin: 2, website: 1 },
  { month: "Sep", instagram: 40, facebook: 18, linkedin: 20, website: 10 },
  { month: "Oct", instagram: 200, facebook: 80, linkedin: 100, website: 50 },
  { month: "Nov", instagram: 10, facebook: 4, linkedin: 5, website: 3 },
  { month: "Dec", instagram: 50, facebook: 20, linkedin: 20, website: 10 },
  { month: "Jan", instagram: 100, facebook: 40, linkedin: 40, website: 20 },
];

export default function SocialMediaChart() {
  const [selectedGraph, setSelectedGraph] = useState("all"); // "all" = show all graphs

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
        Social Media Engagement
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
        {/* All */}
        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("all")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#000",
              borderRadius: "4px",
              opacity: selectedGraph === "all" ? 1 : 0.3,
            }}
          />
          All
        </span>

        {/* Instagram */}
        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("instagram")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#A114F3",
              borderRadius: "4px",
              opacity:
                selectedGraph === "all" || selectedGraph === "instagram"
                  ? 1
                  : 0.3,
            }}
          />
          Instagram
        </span>

        {/* Facebook */}
        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("facebook")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#0573E9",
              borderRadius: "4px",
              opacity:
                selectedGraph === "all" || selectedGraph === "facebook"
                  ? 1
                  : 0.3,
            }}
          />
          Facebook
        </span>

        {/* LinkedIn */}
        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("linkedin")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#1814F3",
              borderRadius: "4px",
              opacity:
                selectedGraph === "all" || selectedGraph === "linkedin"
                  ? 1
                  : 0.3,
            }}
          />
          LinkedIn
        </span>

        {/* Website */}
        <span
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle("website")}
        >
          <span
            style={{
              width: "47.71px",
              height: "6.729px",
              background: "#D4C239",
              borderRadius: "4px",
              opacity:
                selectedGraph === "all" || selectedGraph === "website"
                  ? 1
                  : 0.3,
            }}
          />
          Visit to Website
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
              {/* Instagram */}
              <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A114F3" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#A114F3" stopOpacity={0} />
              </linearGradient>

              {/* Facebook */}
              <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0573E9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0573E9" stopOpacity={0} />
              </linearGradient>

              {/* LinkedIn */}
              <linearGradient id="colorLinkedIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1814F3" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#1814F3" stopOpacity={0} />
              </linearGradient>

              {/* Website */}
              <linearGradient id="colorWebsite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4C239" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#D4C239" stopOpacity={0} />
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
                  fontFamily: "Inter",
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
            />

            <YAxis
              tick={{ fill: "#4b5563", fontSize: 12 }}
              tickFormatter={(value) => value.toString()}
              label={{
                value: "Visitor Numbers",
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

            {/* Graph Lines based on selection */}
            {(selectedGraph === "all" || selectedGraph === "instagram") && (
              <Area
                type="monotone"
                dataKey="instagram"
                stroke="#A114F3"
                fill="url(#colorInstagram)"
                strokeWidth={2}
              />
            )}
            {(selectedGraph === "all" || selectedGraph === "facebook") && (
              <Area
                type="monotone"
                dataKey="facebook"
                stroke="#0573E9"
                fill="url(#colorFacebook)"
                strokeWidth={2}
              />
            )}
            {(selectedGraph === "all" || selectedGraph === "linkedin") && (
              <Area
                type="monotone"
                dataKey="linkedin"
                stroke="#1814F3"
                fill="url(#colorLinkedIn)"
                strokeWidth={2}
              />
            )}
            {(selectedGraph === "all" || selectedGraph === "website") && (
              <Area
                type="monotone"
                dataKey="website"
                stroke="#D4C239"
                fill="url(#colorWebsite)"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
