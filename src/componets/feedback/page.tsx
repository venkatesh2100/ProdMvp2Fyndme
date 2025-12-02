// app/feedback/page.tsx
"use client";

import { useState } from "react";
import UserFeeback from "./userFeedback";
import SupportTicket from "./supportTicket";
export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("userFeedback");

  return (
    <div className=" px-8 py-6 font-sans">
      <nav className="mb-8 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">User Feedback</h1>
        <div className="flex gap-6 mt-1 text-sm ">
          <button
            onClick={() => setActiveTab("userFeedback")}
            className={`pb-1 ${
              activeTab === "userFeedback"
                ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            User Feedback
          </button>
          <button
            onClick={() => setActiveTab("support")}
            className={`pb-1 ${
              activeTab === "support"
                ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Suppport Ticket
          </button>
          {/* No need of Response Tracker for Now */}
          {/* <button
            onClick={() => setActiveTab("response")}
            className={`pb-1 ${
              activeTab === "response"
                ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Response Tracker
          </button> */}
        </div>
      </nav>

      {activeTab === "userFeedback" && <UserFeeback />}
      {activeTab === "support" && <SupportTicket />}
      {activeTab === "response" && <SupportTicket />}
    </div>
  );
}
