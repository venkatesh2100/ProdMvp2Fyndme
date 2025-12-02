"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const COLORS = {
  pageBg: "#f5f8fd",
  // cardBg: "#eaf0fa",
  cardBg: "#ffffff",
  border: "#cfe0ff",
  textDark: "#0f172a",
  text: "#1f2937",
  subText: "#6b7280", //
  blueMid: "#1564CA",
  blue: "#A4DCFD",
  blueDeep: "#052471",
  grayLite: "#E5E7EB",
  green: "#10B981",
  red: "#EF4444",
};

export default function PerformanceMetricPage() {
  const trendData = [
    { name: "Day 1", value: 30 },
    { name: "Day 2", value: 40 },
    { name: "Day 3", value: 35 },
    { name: "Day 4", value: 50 },
    { name: "Day 5", value: 45 },
    { name: "Day 6", value: 60 },
    { name: "Day 7", value: 55 },
  ];

  // System Health – donuts
  const systemUsageData = [
    { name: "Memory Usage", value: 35, color: COLORS.blueMid },
    { name: "CPU Usage", value: 55, color: COLORS.blue },
    { name: "Server", value: 10, color: COLORS.grayLite },
  ];

  const memoryUsageData = [
    { name: "Main Server", value: 45, color: COLORS.blue },
    { name: "Other Processes", value: 40, color: COLORS.blueMid },
    { name: "Free Memory", value: 15, color: COLORS.grayLite },
  ];

  // Server Usage – Country
  const countryData = [
    { name: "US", value: 85 },
    { name: "Canada", value: 70 },
    { name: "Japan", value: 95 },
    { name: "India", value: 88 },
    { name: "Mexico", value: 62 },
    { name: "Australia", value: 79 },
    { name: "UK", value: 48 },
    { name: "France", value: 55 },
    { name: "Spain", value: 72 },
    { name: "Germany", value: 66 },
    { name: "Italy", value: 58 },
    { name: "South Korea", value: 82 },
  ];

  const stateData = [
    { name: "AL", value: 42 },
    { name: "AK", value: 28 },
    { name: "AZ", value: 50 },
    { name: "AR", value: 35 },
    { name: "CA", value: 92 },
    { name: "CO", value: 61 },
    { name: "CT", value: 47 },
    { name: "DE", value: 39 },
    { name: "FL", value: 88 },
    { name: "GA", value: 73 },
    { name: "HI", value: 44 },
    { name: "ID", value: 33 },
    { name: "IL", value: 69 },
    { name: "IN", value: 56 },
    { name: "IA", value: 40 },
    { name: "KS", value: 49 },
    { name: "KY", value: 64 },
    { name: "LA", value: 58 },
    { name: "ME", value: 36 },
  ];

  const barColors = [
    "#9F9FF8",
    "#96E2D6",
    "#0EA5E9", // sky-500
    "#92BFFF", // amber-500
    "#AEC7ED", // emerald-400
    "#94E9B8",
    "#38BDF8",
    "#C084FC",
    "#64748B", // slate-500
    "#F472B6", // pink-400
    "#22C55E",
    "#5EA8F8",
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1100px] px-6 py-8">
        {/* Overview */}
        <h1
          className="text-[28px] leading-8 font-semibold mb-6"
          style={{ color: COLORS.textDark }}
        >
          Overview
        </h1>
        {/* Users */}
        <h2
          className="text-[24px] font-semibold mb-3"
          style={{ color: COLORS.text }}
        >
          Users
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "New Sign-Ups",
              value: "120",
              sub: "last 24 hours",
              change: 15.03,
              peak: "Peak Activity: 2,500 users at 8:00 PM",
              low: "Lowest Activity: 300 users at 4:00 AM",
            },
            {
              label: "Active Users",
              value: "1,870",
              sub: "",
              change: 15.03,
              peak: "Peak Activity: 2,500 users at 8:00 PM",
              low: "Lowest Activity: 300 users at 4:00 AM",
            },
            {
              label: "Inactive Users",
              value: "560",
              sub: "",
              change: -0.03,
              peak: "Peak Activity: 2,500 users at 8:00 PM",
              low: "Lowest Activity: 300 users at 4:00 AM",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-5 shadow border"
              style={{ borderColor: COLORS.border }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-[13px] mb-1"
                    style={{ color: COLORS.subText }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[28px] font-bold -mb-0.5"
                    style={{ color: COLORS.textDark }}
                  >
                    {item.value}
                  </p>
                  {item.sub ? (
                    <p
                      className="text-[12px] mt-1"
                      style={{ color: COLORS.subText }}
                    >
                      {item.sub}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <span
                    style={{
                      color: item.change < 0 ? COLORS.red : COLORS.green,
                    }}
                  >
                    {item.change > 0
                      ? `+${item.change.toFixed(2)}%`
                      : `${item.change.toFixed(2)}%`}
                  </span>
                  {item.change < 0 ? (
                    <TrendingDown size={14} color={COLORS.red} />
                  ) : (
                    <TrendingUp size={14} color={COLORS.green} />
                  )}
                </div>
              </div>
              {/* sparkline */}
              <div className="mt-2 h-16">
                <ResponsiveContainer>
                  <AreaChart
                    data={trendData}
                    margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id={`grad-${idx}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={item.change < 0 ? COLORS.red : COLORS.blue}
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="100%"
                          stopColor={item.change < 0 ? COLORS.red : COLORS.blue}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <YAxis hide domain={[0, 70]} />
                    <XAxis dataKey="name" hide />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={item.change < 0 ? COLORS.red : COLORS.blue}
                      strokeWidth={2}
                      fill={`url(#grad-${idx})`}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-0.5">
                <p className="text-[11px]" style={{ color: COLORS.subText }}>
                  {item.peak}
                </p>
                <p className="text-[11px]" style={{ color: COLORS.subText }}>
                  {item.low}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* App Performance */}
        <h2
          className="text-[24px] font-semibold  mb-3"
          style={{ color: COLORS.text }}
        >
          App Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Average Response Time",
              value: "250 ms",
              change: "+15.03%",
              up: true,
            },
            { label: "Error Rate", value: "0.7%", change: "-0.03%", up: false },
            {
              label: "Uptime",
              value: "98.9%",
              change: "past 30 days",
              up: null,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-5 shadow  bg-white border"
              style={{ borderColor: COLORS.border }}
            >
              17px
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-[13px] mb-1"
                    style={{ color: COLORS.subText }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[26px] font-bold -mb-0.5"
                    style={{ color: COLORS.textDark }}
                  >
                    {item.value}
                  </p>
                  <p
                    className="text-[12px] mt-1"
                    style={{ color: COLORS.subText }}
                  >
                    {item.change}
                  </p>
                </div>
                {item.up !== null && (
                  <div className="mt-1">
                    {item.up ? (
                      <TrendingUp size={18} color={COLORS.green} />
                    ) : (
                      <TrendingDown size={18} color={COLORS.red} />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* System Health */}
        <h2
          className="text-[24px] font-semibold mb-3"
          style={{ color: COLORS.text }}
        >
          System Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* System Usage Donut */}
          <div
            className="rounded-2xl p-6 shadow border"
            style={{
              backgroundColor: COLORS.cardBg,
              borderColor: COLORS.border,
            }}
          >
            <h3
              className="text-[13px] font-medium mb-4"
              style={{ color: COLORS.subText }}
            >
              System Usage
            </h3>
            <div className="relative mx-auto w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={systemUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {systemUsageData.map((entry, i) => (
                      <Cell key={`su-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-2xl font-bold"
                  style={{ color: COLORS.textDark }}
                >
                  55%
                </span>
                <span className="text-sm" style={{ color: COLORS.subText }}>
                  CPU Usage
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-[12px]">
              {systemUsageData.map((it, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: it.color }}
                  />
                  <div className="text-slate-700">
                    <div className="leading-tight">{it.name}</div>
                    <div
                      className="text-[11px]"
                      style={{ color: COLORS.subText }}
                    >
                      {it.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Memory Usage Donut */}
          <div
            className="rounded-2xl p-6 shadow border"
            style={{
              backgroundColor: COLORS.cardBg,
              borderColor: COLORS.border,
            }}
          >
            <h3
              className="text-[13px] font-medium mb-4"
              style={{ color: COLORS.subText }}
            >
              Memory Usage
            </h3>
            <div className="relative mx-auto w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={memoryUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {memoryUsageData.map((entry, i) => (
                      <Cell key={`mu-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  className="text-2xl font-bold"
                  style={{ color: COLORS.textDark }}
                >
                  85%
                </span>
                <span className="text-[12px]" style={{ color: COLORS.subText }}>
                  85GB out of 100GB
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-[12px]">
              {memoryUsageData.map((it, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: it.color }}
                  />
                  <div className="text-slate-700">
                    <div className="leading-tight">{it.name}</div>
                    <div
                      className="text-[11px]"
                      style={{ color: COLORS.subText }}
                    >
                      {it.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Server Usage */}
        <h2
          className="text-[24px] font-semibold mb-3"
          style={{ color: COLORS.text }}
        >
          Server Usage
        </h2>
        <div
          className="rounded-2xl p-6 shadow border mb-6"
          style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}
        >
          <h3
            className="text-[13px] font-medium mb-4"
            style={{ color: COLORS.subText }}
          >
            By Country
          </h3>
          <div className="h-48">
            <ResponsiveContainer>
              <BarChart
                data={countryData}
                margin={{ top: 10, right: 5, left: 5, bottom: 25 }}
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: COLORS.subText }}
                  interval={0}
                  angle={0}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  formatter={(v) => [`${v}`, "Usage"]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {countryData.map((_, i) => (
                    <Cell
                      key={`c-${i}`}
                      fill={barColors[i % barColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* By State */}
        <div
          className="rounded-2xl p-6 shadow border"
          style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}
        >
          <h3
            className="text-[13px] font-medium mb-4"
            style={{ color: COLORS.subText }}
          >
            By State
          </h3>
          <div className="h-48 overflow-x-auto">
            <div className="min-w-[720px] h-full">
              <ResponsiveContainer>
                <BarChart
                  data={stateData}
                  margin={{ top: 10, right: 5, left: 5, bottom: 25 }}
                >
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: COLORS.subText }}
                    interval={0}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    formatter={(v) => [`${v}`, "Usage"]}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {stateData.map((_, i) => (
                      <Cell
                        key={`s-${i}`}
                        fill={
                          barColors[
                            (((barColors.length - 1 - i) % barColors.length) +
                              barColors.length) %
                              barColors.length
                          ]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
