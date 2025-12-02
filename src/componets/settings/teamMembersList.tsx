import { useState } from "react";

interface TeamList {
  name: string;
  email: string;
  status: boolean;
  phoneNumber: string;
  joinDate: string;
  role: string;
  Team: string;
  username: string;
}

export default function TeamMembersList({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const members: TeamList[] = [
    {
      name: "Govardhan",
      email: "Team25@email.com",
      status: true,
      Team: "Software ",
      joinDate: "12/10/2024",
      phoneNumber: "101-203-2939",
      role: "Software",
      username: "Govardhan123",
    },
    {
      name: "Chandra",
      email: "Team225@gmail.com",
      status: false,
      Team: "UI/ UX",
      phoneNumber: "101-203-3322",
      joinDate: "02/11/2024",
      role: "UI / UX",
      username: "Chandra123",
    },
    {
      name: "Sandeep",
      email: "Team25@email.com",
      status: true,
      Team: "Team 3",
      joinDate: "21/10/2024",
      phoneNumber: "101-203-2939",
      role: "Cloud",
      username: "Sandeep",
    },
    {
      name: "Paul",
      email: "Team225@gmail.com",
      status: false,
      joinDate: "31/12/2025",
      Team: "Team 4",
      phoneNumber: "101-203-3322",
      role: "QA",
      username: "Paul123",
    },
  ];

  const [selectedEmail, setSelectedEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TeamList | null>(null);
  const [TeamStatus, setTeamStatus] = useState<boolean>(false);

  const handleResetClick = (email: string) => {
    setSelectedEmail(email);
    setShowPopup(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false);
    }
  };

  const handleTeamSelect = (ticket: TeamList) => {
    setTeamStatus(ticket.status);
    setSelectedTicket(ticket);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          List of Team Members
        </h2>
        <a href="#" className="text-sm underline mb-8 mx-3 inline-block">
          All Members
        </a>

        <div className="border border-gray-200 rounded-md">
          <div className="max-h-[240px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#F8F9FA] sticky top-0 z-10">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Member Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Active
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Team Role
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Join Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Reset Password
                  </th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>

              <tbody>
                {members.map((member, index) => (
                  <tr
                    key={index}
                    onClick={() => handleTeamSelect(member)}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"
                    } ${
                      member.username === selectedTicket?.username
                        ? "border-l-4 border-blue-400"
                        : ""
                    } cursor-pointer`}
                  >
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {member.name}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {member.email}
                    </td>
                    <td className="py-4 px-4">
                      {member.status ? (
                        <div className="w-5 h-5 bg-[#53A8F3] rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                          >
                            <path
                              d="M3.45912 4.36068L0.000634864 0.902197L0.902847 -1.51155e-05L4.36133 3.45847L7.81981 -1.51155e-05L8.72202 0.902197L5.26354 4.36068L8.72202 7.81916L7.81981 8.72137L4.36133 5.26289L0.902847 8.72137L0.000634864 7.81916L3.45912 4.36068Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600">
                          {member.role}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="text-sm tegra">{member.joinDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetClick(member.email);
                        }}
                        className="text-sm text-blue-600 underline"
                      >
                        Link
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.reload();
                        }}
                        className="bg-gray-900 text-white px-6 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-800"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end font-semibold text-[#666666]">
          <button className="flex items-center text-sm hover:text-gray-900">
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center mr-2">
              <span className="text-lg leading-none">+</span>
            </div>
            Add Team Member
          </button>
        </div>
      </div>

      {/* {selectedTicket && (
        <>
          <div className="mt-6 bg-white shadow-md rounded-2xl p-2">
            <div className="p-6">
              <h2 className="font-semibold text-gray-800 mb-6 text-lg">
                Overview of Team
              </h2>
              <div className="space-y-4 text-gray-500 text-md">
                <div>
                  <span className="font-medium mr-1">Full Name:</span>
                  {selectedTicket.name}
                </div>
                <div>
                  <span className="font-medium mr-1">Email address:</span>
                  {selectedTicket.email}
                </div>
                <div>
                  <span className="font-medium mr-1">Phone number:</span>
                  {selectedTicket.phoneNumber}
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <select
                    value={TeamStatus ? "Active" : "Inactive"}
                    onChange={(e) =>
                      setTeamStatus(e.target.value === "Active")
                    }
                    className="ml-2 border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <span className="font-medium mr-1">Role:</span>
                  {selectedTicket.role}
                </div>
                <div>
                  <span className="font-medium mr-1">Username:</span>
                  {selectedTicket.username}
                </div>
              </div>

              <div className="flex gap-4 mt-16 justify-end">
                <button className="bg-[#1A4BB5] hover:bg-[#153d91] text-white px-6 py-2 rounded-lg shadow-sm font-medium transition">
                  Save
                </button>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="bg-[#EAF2FA] hover:bg-[#d6e6f8] text-[#1A4BB5] px-6 py-2 rounded-lg shadow-sm font-medium transition"
                >
                  Close
                </button>
                <button className="border bg-[#1B1B1B] px-6 py-2 rounded-lg shadow-sm text-gray-100 font-medium transition">
                  Next Team
                </button>
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab("teamInfo")}
            className="mt-4 text-right text-[#2E6FF2] text-sm font-medium cursor-pointer"
          >
            <a href="#" className="hover:underline">
              Next Setting Page →
            </a>
          </div>
        </>
      )} */}

      {/* {showPopup && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div className="bg-white w-[600px] mt-40 rounded-md shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Reset password</h3>
            </div>
            <div className="px-6 py-6 text-gray-600 text-center">
              Reset password link has been sent to{" "}
              <span className="font-semibold text-gray-900">
                {selectedEmail}
              </span>
            </div>
            <button
              onClick={() => alert("Resend clicked")}
              className="w-full bg-[#0573E9] text-white py-3 font-semibold transition"
            >
              Resend link
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
