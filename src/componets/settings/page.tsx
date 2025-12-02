"use client";
import { useState, useEffect } from "react";
import AdminInfoForm from "./adminInfo";
import AdminMembersList from "./adminMemberList";
import TeamInfoForm from "./teamInfo";
import TeamMembersList from "./teamMembersList";
import VerificationInfo from "./verificationInfo";  // ✅ Add this

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const saveTab = localStorage.getItem("activeTab");
    if (saveTab) {
      setActiveTab(saveTab);
    } else {
      setActiveTab("adminInfo");
    }
  }, []);

  useEffect(() => {
    if (activeTab !== null) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  if (!activeTab) return null;

  return (
    <div className="min-h-screen my-10 mx-30 font-sans text-gray-900">
      <h1 className="text-3xl font-semibold mb-10">Setting</h1>

      <nav className="flex space-x-10 text-sm mb-6 font-normal">
        <button
          onClick={() => setActiveTab("adminInfo")}
          className={`pb-1 ${
            activeTab === "adminInfo"
              ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Add Admin Member
        </button>

        <button
          onClick={() => setActiveTab("listAdmin")}
          className={`pb-1 ${
            activeTab === "listAdmin"
              ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          List of Admin Members
        </button>

        <button
          onClick={() => setActiveTab("teamInfo")}
          className={`pb-1 ${
            activeTab === "teamInfo"
              ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Add Team Member
        </button>

        <button
          onClick={() => setActiveTab("listTeam")}
          className={`pb-1 ${
            activeTab === "listTeam"
              ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          List of Team Members
        </button>

        {/* ✅ FIX: Make Verification Info a button */}
        <button
          onClick={() => setActiveTab("verificationInfo")}
          className={`pb-1 ${
            activeTab === "verificationInfo"
              ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Verification Info
        </button>
      </nav>

      {activeTab === "adminInfo" && (
        <AdminInfoForm setActiveTab={setActiveTab} />
      )}
      {activeTab === "listAdmin" && (
        <AdminMembersList setActiveTab={setActiveTab} />
      )}
      {activeTab === "teamInfo" && <TeamInfoForm setActiveTab={setActiveTab} />}
      {activeTab === "listTeam" && (
        <TeamMembersList setActiveTab={setActiveTab} />
      )}

      {/* ✅ Add verification content */}
      {activeTab === "verificationInfo" && <VerificationInfo />}
    </div>
  );
}
