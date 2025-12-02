"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Decision = "Verified" | "Not Verified" | "In Review";
type Status = "New" | "Open" | "Closed";
type Platform = "Web" | "App";

type Row = {
  _id: string;
  userName: string;
  platform: Platform;
  documentUrl: string;
  read: boolean;
  status: Status;
  verification: Decision;
  submittedAt: string;
  closedAt?: string;
  userEmail?: string;
  solvedOnce?: boolean;
};

type Member = {
  _id: string;
  userName: string;
  email: string;
  active: boolean;
  verified: boolean;
  joinedAt: string;
};

type Tab = "userInfo";

// Seed data
const seed: Row[] = [
  {
    _id: "ver_1005",
    userName: "John R. Smith",
    platform: "Web",
    documentUrl:
      "https://l450v.alamy.com/450v/2h5rd8j/open-passport-blank-template-vector-international-flat-design-style-2h5rd8j.jpg",
    read: true,
    status: "New",
    verification: "Not Verified",
    submittedAt: "2024-01-02T11:00:00.000Z",
    closedAt: "2024-02-02T11:00:00.000Z",
    userEmail: "team25@email.com",
  },
  {
    _id: "ver_1006",
    userName: "Jolie Hoskins",
    platform: "Web",
    documentUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTXiPuk0PZwrmpMKx-JWWZfCkEAhtYcn4PPFdvI8qMf2MUBOVIs",
    read: false,
    status: "New",
    verification: "Not Verified",
    submittedAt: "2025-02-03T10:12:00.000Z",
    userEmail: "team25@gmail.com",
  },
  {
    _id: "ver_1007",
    userName: "Pennington Joy",
    platform: "App",
    documentUrl:
      "https://cdn.vectorstock.com/i/1000v/61/68/international-passport-template-with-sample-vector-23456168.jpg",
    read: false,
    status: "New",
    verification: "Not Verified",
    submittedAt: "2024-04-11T09:00:00.000Z",
    userEmail: "pen@email.com",
  },
];

export default function VerificationInfo() {
  const [rows, setRows] = useState<Row[]>(seed);
  const [selected, setSelected] = useState<Row | null>(null);
  const [tab, setTab] = useState<Tab>("userInfo");
  const [members, setMembers] = useState<Member[]>([]);

  const [expanded, setExpanded] = useState<boolean>(false);
  const [showOverview, setShowOverview] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  // filter UI state
  const [searchName, setSearchName] = useState("");
  const [filterRead, setFilterRead] = useState(false);
  const [filterUnread, setFilterUnread] = useState(false);

  // NEW: status filter UI state
  const [filterStatusNew, setFilterStatusNew] = useState(false);
  const [filterStatusOpen, setFilterStatusOpen] = useState(false);
  const [filterStatusClosed, setFilterStatusClosed] = useState(false);

  // applied filters
  const [appliedSearchName, setAppliedSearchName] = useState("");
  const [appliedFilterRead, setAppliedFilterRead] = useState(false);
  const [appliedFilterUnread, setAppliedFilterUnread] = useState(false);

  // NEW: applied status filters
  const [appliedFilterStatusNew, setAppliedFilterStatusNew] = useState(false);
  const [appliedFilterStatusOpen, setAppliedFilterStatusOpen] =
    useState(false);
  const [appliedFilterStatusClosed, setAppliedFilterStatusClosed] =
    useState(false);

  function updateRow(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r._id === id ? { ...r, ...patch } : r)));
    if (selected?._id === id) setSelected({ ...(selected as Row), ...patch });
  }

  function markRead(r: Row) {
    if (!r.read) updateRow(r._id, { read: true });
  }

  async function persistRow(id: string, patch: Partial<Row>) {
    updateRow(id, patch);
  }

  function addToMembersFromRow(r: Row) {
    const exists = members.some(
      (m) => m.email === (r.userEmail ?? "") || m.userName === r.userName
    );
    if (exists) return;
    const joined = r.closedAt ?? new Date().toISOString();
    const mem: Member = {
      _id: `mem_${r._id}`,
      userName: r.userName,
      email: r.userEmail || "unknown@email.com",
      active: true,
      verified: true,
      joinedAt: joined,
    };
    setMembers((prev) => [...prev, mem]);
  }

  // Save (previously Solve)
  function handleSave() {
    if (!selected) return;
    const cur = selected;

    const basePatch: Partial<Row> = {
      verification: cur.verification,
      status: cur.status,
      solvedOnce: true,
    };

    if (cur.status !== "Closed") {
      persistRow(cur._id, basePatch);
      return;
    }

    const ensureClosedAt = cur.closedAt ?? new Date().toISOString();
    const closedPatch: Partial<Row> = {
      ...basePatch,
      status: "Closed",
      closedAt: ensureClosedAt,
    };

    if (cur.verification === "Verified") {
      persistRow(cur._id, closedPatch);
      addToMembersFromRow({ ...cur, ...closedPatch });
    } else {
      persistRow(cur._id, closedPatch);
    }
  }

  // applied-filtered rows
  const filteredRows = rows.filter((r) => {
    if (
      appliedSearchName.trim() &&
      !r.userName
        .toLowerCase()
        .includes(appliedSearchName.trim().toLowerCase())
    ) {
      return false;
    }
    if (appliedFilterRead && !r.read) return false;
    if (appliedFilterUnread && r.read) return false;

    // NEW: filter by Status (New / Open / Closed) instead of solvedOnce
    const anyStatusFilter =
      appliedFilterStatusNew ||
      appliedFilterStatusOpen ||
      appliedFilterStatusClosed;

    if (anyStatusFilter) {
      const matchesStatus =
        (appliedFilterStatusNew && r.status === "New") ||
        (appliedFilterStatusOpen && r.status === "Open") ||
        (appliedFilterStatusClosed && r.status === "Closed");
      if (!matchesStatus) return false;
    }

    return true;
  });

  const visibleRows = filteredRows.slice(0, expanded ? 15 : 5);

  function clearAllFilters() {
    setSearchName("");
    setFilterRead(false);
    setFilterUnread(false);
    setFilterStatusNew(false);
    setFilterStatusOpen(false);
    setFilterStatusClosed(false);

    setAppliedSearchName("");
    setAppliedFilterRead(false);
    setAppliedFilterUnread(false);
    setAppliedFilterStatusNew(false);
    setAppliedFilterStatusOpen(false);
    setAppliedFilterStatusClosed(false);
  }

  function applyFilters() {
    setAppliedSearchName(searchName);
    setAppliedFilterRead(filterRead);
    setAppliedFilterUnread(filterUnread);
    setAppliedFilterStatusNew(filterStatusNew);
    setAppliedFilterStatusOpen(filterStatusOpen);
    setAppliedFilterStatusClosed(filterStatusClosed);
  }

  // Read Next Document: move to next filtered row
  function handleReadNext() {
    if (!filteredRows.length) return;

    if (!selected) {
      const first = filteredRows[0];
      setSelected(first);
      setShowOverview(true);
      markRead(first);
      return;
    }

    const idx = filteredRows.findIndex((r) => r._id === selected._id);
    if (idx === -1) return;
    const nextIdx = idx + 1;
    if (nextIdx >= filteredRows.length) return;

    const next = filteredRows[nextIdx];
    setSelected(next);
    setShowOverview(true);
    markRead(next);
  }

  return (
    <div className="flex flex-col items-center gap-[25px] pb-[25px] w-[995px]">
      {/* Sub-tabs (only User Info now) */}
      <div className="w-full">
        <nav className="flex gap-6 text-sm">
          <button
            onClick={() => setTab("userInfo")}
            className={`pb-1 ${
              tab === "userInfo"
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            User Info
          </button>
        </nav>
      </div>

      {/* ===== USER INFO TAB ===== */}
      {tab === "userInfo" && (
        <>
          {/* Requests table */}
          <div className="bg-white shadow-sm rounded-lg p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <h2
                style={{
                  color: "#000000",
                  fontFamily:
                    '"Source Sans Pro", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "21.6px",
                }}
              >
                Request to Verified Users
              </h2>

              <div className="flex items-center gap-3">
                {/* Expand / Collapse button with new arrow icon */}
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full px-5 py-1.5 text-xs font-medium text-white"
                  style={{ backgroundColor: "#000000" }}
                >
                  <span className="text-sm">
                    {expanded ? "Collapse" : "Expand"}
                  </span>
                  <ExpandIcon />
                </button>

                {/* Filter button - black circle */}
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full w-8 h-8"
                  style={{ backgroundColor: "#000000" }}
                  onClick={() =>
                    setShowFilter((prev) => {
                      const next = !prev;
                      if (!prev) {
                        setSearchName(appliedSearchName);
                        setFilterRead(appliedFilterRead);
                        setFilterUnread(appliedFilterUnread);
                        setFilterStatusNew(appliedFilterStatusNew);
                        setFilterStatusOpen(appliedFilterStatusOpen);
                        setFilterStatusClosed(appliedFilterStatusClosed);
                      }
                      return next;
                    })
                  }
                >
                  <FilterIcon />
                </button>
              </div>
            </div>

            {/* FILTER BAR */}
            {showFilter && (
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-700 mb-3">
                  Filter
                </h3>
                <div className="flex flex-wrap items-center gap-8 text-sm">
                  {/* Search by username */}
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-700">
                      Search By Username
                    </span>
                    <input
                      className="border rounded-md px-3 py-2 text-sm w-56"
                      placeholder="Enter here"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                  </div>

                  {/* Search by document status */}
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-gray-700">
                      Search By Document Status
                    </span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={filterRead}
                          onChange={(e) => setFilterRead(e.target.checked)}
                        />
                        <span>Read</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={filterUnread}
                          onChange={(e) => setFilterUnread(e.target.checked)}
                        />
                        <span>Unread</span>
                      </label>
                    </div>
                  </div>

                  {/* NEW: Search by Status */}
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-gray-700">
                      Search By Status
                    </span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={filterStatusNew}
                          onChange={(e) =>
                            setFilterStatusNew(e.target.checked)
                          }
                        />
                        <span>New</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={filterStatusOpen}
                          onChange={(e) =>
                            setFilterStatusOpen(e.target.checked)
                          }
                        />
                        <span>Open</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={filterStatusClosed}
                          onChange={(e) =>
                            setFilterStatusClosed(e.target.checked)
                          }
                        />
                        <span>Closed</span>
                      </label>
                    </div>
                  </div>

                  {/* Clear / Apply */}
                  <div className="ml-auto flex items-center gap-4 text-xs font-medium">
                    <button
                      type="button"
                      className="underline text-gray-600"
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </button>
                    <button
                      type="button"
                      className="text-blue-600"
                      onClick={applyFilters}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="border-t mt-3" />
              </div>
            )}

            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">User Name</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Verification
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Document</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Date Submission
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Close Date</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r, i) => (
                  <tr
                    key={r._id}
                    className={`${
                      i % 2 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-50 cursor-pointer`}
                    onClick={() => {
                      setSelected(r);
                      setShowOverview(true);
                      markRead(r);
                    }}
                  >
                    <td className="px-4 py-3">{r.userName}</td>
                    <td className="px-4 py-3">{r.verification}</td>
                    <td className="px-4 py-3">
                      <button
                        className={`underline ${
                          r.read
                            ? "text-blue-600 font-semibold"
                            : "text-blue-600"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(r);
                          setShowOverview(true);
                          markRead(r);
                        }}
                      >
                        {r.read ? "Read" : "Unread"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(r.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{r.status}</td>
                    <td className="px-4 py-3">
                      {r.closedAt
                        ? new Date(r.closedAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Overview */}
          {showOverview && selected && (
            <div className="bg-white rounded-xl w-full relative pb-[350px]">
              <div className="p-4 font-semibold text-left">
                Over View of Request from User
              </div>

              <div className="p-4 space-y-4">
                <InlineRow label="User Name :" content={selected.userName} />
                <InlineRow label="Platform :" content={selected.platform} />
                <InlineRow
                  label="Date Submission and Time :"
                  content={`${new Date(
                    selected.submittedAt
                  ).toLocaleDateString()} ${new Date(
                    selected.submittedAt
                  ).toLocaleTimeString()}`}
                />
                <InlineRow
                  label="Close Date :"
                  content={
                    selected.closedAt
                      ? new Date(selected.closedAt).toLocaleDateString()
                      : "-"
                  }
                />
                <InlineRow
                  label="Verification :"
                  content={
                    <select
                      className="border rounded-md px-2 py-1"
                      value={selected.verification}
                      onChange={(e) => {
                        if (!selected) return;
                        const value = e.target.value as Decision;
                        setSelected({
                          ...selected,
                          verification: value,
                          solvedOnce: false,
                        });
                      }}
                    >
                      <option>Not Verified</option>
                      <option>Verified</option>
                      <option>In Review</option>
                    </select>
                  }
                />
                <InlineRow
                  label="Status :"
                  content={
                    <select
                      className="border rounded-md px-2 py-1"
                      value={selected.status}
                      onChange={(e) => {
                        if (!selected) return;
                        const value = e.target.value as Status;
                        const newClosedAt =
                          value === "Closed"
                            ? selected.closedAt ?? new Date().toISOString()
                            : undefined;
                        setSelected({
                          ...selected,
                          status: value,
                          closedAt: newClosedAt,
                          solvedOnce: false,
                        });
                      }}
                    >
                      <option>New</option>
                      <option>Open</option>
                      <option>Closed</option>
                    </select>
                  }
                />
                <InlineRow
                  label="File and Attachment :"

                  content={
                    <a
                      href={selected.documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-blue-600"
                    >
                      View Document
                    </a>
                  }
                />

                {/* Open Document box */}
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    Open Document
                  </div>
                  <div
                    style={{
                      border: "0.755px solid rgba(0, 0, 0, 0.35)",
                      background: "rgba(217, 217, 217, 0.07)",
                      position: "absolute",
                      left: "30.199px",
                      bottom: "84px",
                      width: "950px",
                      height: "250px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => window.open(selected.documentUrl, "_blank")}
                  >
                    <img
                      src={selected.documentUrl}
                      alt="Document Preview"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </div>

                {/* Actions: Save, Close, Read Next Document on right side */}
                <div className="flex gap-3 pt-2 absolute bottom-5 right-8">
                  <button
                    className="px-5 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ backgroundColor: "#093488" }}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-5 py-2 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: "#D1EFFE",
                      color: "#53A8F3",
                    }}
                    onClick={() => {
                      // only close panel, no data change in table
                      setShowOverview(false);
                      setSelected(null);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="px-5 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ backgroundColor: "#000000" }}
                    onClick={handleReadNext}
                  >
                    Read Next Document
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* Inline label/value row */
function InlineRow({
  label,
  content,
}: {
  label: string;
  content: React.ReactNode;
}) {
  return (
    <div className="text-sm text-gray-500 flex items-center gap-2">
      <span>{label}</span>
      <span className="inline-flex items-center">{content}</span>
    </div>
  );
}

/** ✔ checkmark icon */
function RightMarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8.468"
      height="10.008"
      viewBox="0 0 12 11"
      fill="none"
      style={{ flexShrink: 0, display: "block", marginLeft: "-25px" }}
    >
      <path
        d="M0.461125 6.64597L3.54039 8.95542L10.4688 0.487427"
        stroke="var(--Line_icon, #33363F)"
        strokeWidth="1.54"
      />
    </svg>
  );
}

/** ✖ cross icon */
function CrossMarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8.468"
      height="10.008"
      viewBox="0 0 12 11"
      fill="none"
      style={{ flexShrink: 0, display: "block", marginLeft: "-25px" }}
    >
      <path
        d="M1 1L11 10M11 1L1 10"
        stroke="var(--Line_icon, #33363F)"
        strokeWidth="1.54"
      />
    </svg>
  );
}

/** Filter icon – white stroke for black button */
function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M2 3H12L8.5 7.2V11L5.5 9.5V7.2L2 3Z"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Expand icon – two diagonal arrows like screenshot */
function ExpandIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
    >
      {/* top-right arrow ↗ */}
      <path
        d="M12 3H18M18 3V9M18 3L13.5 7.5"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* bottom-left arrow ↙ */}
      <path
        d="M10 13H4M4 13V7M4 13L8.5 8.5"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

//verification info
