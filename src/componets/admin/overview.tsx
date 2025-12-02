"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrafficBarChart } from "./trafficCard";
import { PortfolioDonutChart } from "./portflioDonut";
import EngagementChart from "./engagementCard";
import SocialMediaChart from "./socialMediua";
import UserDataFilters from "./userBar";
import SocialMediaFilters from "./socialmediaBar";
import { ChartCard } from "./chartCard";
import { StatCard } from "./statCard";
import Loading from "../../../packages/ui/loading";

// Full data type
type DashboardData = {
  timeFrame: string;
  stats: {
    title: string;
    value: string;
    change: string;
  }[];
  traffic: {
    country: string;
    value: number;
  }[];
  portfolio: {
    name: string;
    value: number;
  }[];
};

export default function Overview() {
  const router = useRouter();
  const [timeFrame, setTimeFrame] = useState("yearly");
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const timeOptions = ["daily", "weekly", "monthly", "yearly", "till date"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/dashboard?timeFrame=${timeFrame}`);
        const data = await res.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, [timeFrame]);

  return (
    <div>
      <div className="flex mt-4 mb-2">
        <h1 className="text-3xl font-bold mb-2 pr-20">Overview</h1>
        <div className="flex gap-3 text-sm text-gray-600">
          {timeOptions.map((time, idx, arr) => (
            <span key={time} className="flex items-center gap-1">
              <button
                className={`capitalize ${
                  timeFrame === time ? "text-blue-600 font-semibold" : ""
                }`}
                onClick={() => setTimeFrame(time)}
              >
                {time}
              </button>
              {idx < arr.length - 1 && <span className="text-gray-400">|</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full border-b-2 border-black mt-2 mb-6"></div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {!dashboardData ? (
          <Loading/>
        ) : (
          dashboardData.stats.map((s, i) => <StatCard key={i} {...s} />)
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {!dashboardData ? (
          <Loading />
        ) : (
          <>
            <ChartCard title="Traffic Location">
              <TrafficBarChart data={dashboardData.traffic} />
              <p 
                onClick={() => router.push("/traffic-report")}
                className="text-blue-600 text-right pr-4 pt-4 text-sm cursor-pointer hover:underline"
              >
                View More Report
              </p>
            </ChartCard>

            <PortfolioDonutChart data={dashboardData.portfolio} />
          </>
        )}
      </div>

      {/* Engagement Section */}
      <UserDataFilters />
      <EngagementChart />

      {/* Social Media Section */}
      <div className="border-b border-gray-200 pb-2 mt-8 flex gap-4 text-sm">
        <button
          className={`${
            activeTab === "marketing"
              ? "text-blue-600 font-bold"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("marketing")}
        >
          Marketing
        </button>
        <span className="font-bold text-blue-600">Weekly</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">
        {[
          "Social Events",
          "Visits LinkedIn",
          "Visits Instagram",
          "Visits Website",
          "Download App",
        ].map((title, i) => (
          <StatCard key={i} title={title} value="3,671" change="-0.03%" />
        ))}
      </div>

      <SocialMediaFilters />
      <SocialMediaChart />
    </div>
  );
}
