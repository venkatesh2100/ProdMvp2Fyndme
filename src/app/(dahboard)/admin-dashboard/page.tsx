'use client'
import { useState } from "react";
import  RocketCard  from "@/componets/admin/rocketcard";
import Overview from "@/componets/admin/overview";
import TrafficDashboard from "@/componets/admin/trafficDashboard"; 

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="p-6 min-h-screen">
      <RocketCard />

      {/* Tabs */}
      <div className="border-b border-gray-200 pb-2 px-6 flex gap-4 text-sm mt-6">
        <button
          className={`font-bold ${
            activeTab === "overview" ? "text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`font-bold ${
            activeTab === "traffic" ? "text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("traffic")}
        >
          Traffic Info and Date
        </button>
      </div>

      {/* Conditional rendering based on activeTab */}
      {activeTab === "overview" ? <Overview /> : <TrafficDashboard />}
    </main>
  );
}