"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import FiltersPanel from "./FilterPanel";
import HeaderBar from "./header";
import Loading from "../../../packages/ui/loading";
import MemberProfile, { Member as ProfileMember } from "./MemberProfile";

/* ---------- Types ---------- */
type Filters = {
  portfolioType: string[];
  portfolioVerification: string[];
  idVerification: string[];
  subscription: string[];
  numberOfPortfolios: (number | string)[];
  sizeLimit: number;
  location: string[];
};

export type Member = {
  _id?: string;
  avatar?: string;
  "Member Name": string;
  Username: string;
  "No. Of Portfolios": string;
  "ID Verification": string;
  "Portfolio Verification": string;
  Location: string;
  "Size (KB)": string;
  Subscription: string;
};

/* ---------- Helpers ---------- */
// now styles all 4 statuses, incl. Blocked
const getBadgeClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case "verified":
      return "bg-[#A4DCFD] text-[#2C678A]";
    case "in progress":
      return "bg-[#D1EFFE] text-[#53A8F3]";
    case "not verified":
      return "bg-[#093488] text-white";
    case "blocked":
      return "bg-[#FFE2E1] text-[#B42318]";
    default:
      return "bg-gray-200 text-black";
  }
};

/* ---------- Component ---------- */
const CustomMemberTable = () => {
  const [data, setData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const [filtersVisible, setFiltersVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState<Filters>({
    portfolioType: [],
    portfolioVerification: [],
    idVerification: [],
    subscription: [],
    numberOfPortfolios: [],
    sizeLimit: 50000,
    location: [],
  });

  // inline expansion (no modal)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* --- Fetch --- */
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/members");
        const json = await res.json();
        if (json.success) {
          const raw: any[] = json.data;
          const formatted: Member[] = raw.map((item: any, idx: number) => {
            const base: Member = {
              _id: item._id?.toString?.() ?? item._id,
              avatar: item.avatar || "",
              "Member Name": item["Member Name"],
              Username: item.Username,
              "No. Of Portfolios": (item["No. Of Portfolios"] ?? "0").toString(),
              "ID Verification": item["ID Verification"],
              "Portfolio Verification": item["Portfolio Verification"],
              Location: item.Location,
              "Size (KB)": (item["Size (KB)"] ?? "0").toString(),
              Subscription: item.Subscription,
            };
            if (idx === 0) {
              base.avatar = "/john-smith.png";
              base["Member Name"] = base["Member Name"] || "John Smith";
            }
            return base;
          });
          setData(formatted);
        }
      } catch (e) {
        console.error("Error fetching members:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  /* --- Filter/paging --- */
  const filteredData = data.filter((row) => {
    const usernameMatch =
      searchQuery === "" ||
      row.Username.toLowerCase().includes(searchQuery.toLowerCase());
    const sizeMatch = Number(row["Size (KB)"]) <= filters.sizeLimit;
    const portfolioMatch =
      filters.portfolioVerification.length === 0 ||
      filters.portfolioVerification.includes(row["Portfolio Verification"]);
    const idMatch =
      filters.idVerification.length === 0 ||
      filters.idVerification.includes(row["ID Verification"]);
    const subscriptionMatch =
      filters.subscription.length === 0 ||
      filters.subscription.includes(row.Subscription);
    const portfolioCountMatch =
      filters.numberOfPortfolios.length === 0 ||
      filters.numberOfPortfolios.includes(
        row["No. Of Portfolios"] === "4" ? "4 or more" : row["No. Of Portfolios"]
      );
    const locationMatch =
      filters.location.length === 0 ||
      filters.location.some((loc) =>
        row.Location.toLowerCase().includes(loc.toLowerCase())
      );
    const portfolioTypeMatch =
      filters.portfolioType.length === 0 ||
      (row as any)["Portfolio Type"] === undefined ||
      filters.portfolioType.includes((row as any)["Portfolio Type"]);

    return (
      usernameMatch &&
      sizeMatch &&
      portfolioMatch &&
      idMatch &&
      subscriptionMatch &&
      portfolioCountMatch &&
      locationMatch &&
      portfolioTypeMatch
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // table columns (for colSpan)
  const headers = useMemo(
    () => [
      "",
      "Member Name",
      "Username",
      "No. Of Portfolios",
      "ID Verification",
      "Portfolio Verification",
      "Location",
      "Size",
      "Subscription",
      "",
    ],
    []
  );
  const columnCount = headers.length;

  /* --- Approve/Reject (ID) --- */
  async function updateVerification(member: Member, action: "approve" | "reject") {
    try {
      const body: any = { action };
      if (member._id) body.id = member._id;
      else body.username = member.Username;

      const res = await fetch("/api/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to update");

      const newStatus =
        (json.status as string) ||
        (action === "approve" ? "Verified" : "Not Verified");

      setData((prev) =>
        prev.map((m) =>
          (m._id && m._id === member._id) || (!m._id && m.Username === member.Username)
            ? { ...m, "ID Verification": newStatus }
            : m
        )
      );
    } catch (e) {
      console.error(e);
      alert("Could not update verification. See console for details.");
    }
  }

  /* --- Portfolio verification pill updater (from MemberProfile dropdown) --- */
  function setPortfolioVerification(
    member: Member,
    status: "Verified" | "In Progress" | "Not Verified" | "Blocked"
  ) {
    setData((prev) =>
      prev.map((m) =>
        (m._id && m._id === member._id) || (!m._id && m.Username === member.Username)
          ? { ...m, "Portfolio Verification": status }
          : m
      )
    );
  }

  if (loading) return <Loading />;
  if (!data.length) return <div className="p-4 text-gray-600">No data available</div>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <HeaderBar
        filtersVisible={filtersVisible}
        onOpenFilters={() => setFiltersVisible(true)}
        onCloseFilters={() => setFiltersVisible(false)}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {filtersVisible && (
        <div className="mt-4 mb-10">
          <FiltersPanel filters={filters} setFilters={setFilters} />
        </div>
      )}

      {/* Outer card — scrollable */}
      <div className="flex-1 bg-white text-gray-600 rounded-lg shadow-md overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm table-auto relative">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase sticky top-0 z-10">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-2 text-left whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((row) => {
                const id = row._id ?? row.Username;
                const isOpen = expandedId === id;

                return (
                  <React.Fragment key={id}>
                    {/* Data row */}
                    <tr className="align-middle">
                      <td className="px-4 py-2">
                        <button
                          onClick={() =>
                            setExpandedId((cur) => (cur === id ? null : id))
                          }
                          aria-expanded={isOpen}
                          className="inline-flex h-6 w-6 items-center justify-center rounded border text-sm"
                          title={isOpen ? "Collapse" : "Expand"}
                        >
                          {isOpen ? "–" : "+"}
                        </button>
                      </td>

                      <td className="px-4 py-2">
                        <div className="flex items-center gap-3 whitespace-nowrap">
                          {row.avatar ? (
                            <Image
                              src={row.avatar}
                              alt={row["Member Name"]}
                              width={32}
                              height={32}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                              {row["Member Name"].charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="font-medium">{row["Member Name"]}</span>
                        </div>
                      </td>

                      <td className="px-4 py-2 text-gray-500 whitespace-nowrap">
                        {row.Username}
                      </td>

                      <td className="px-4 py-2 text-center whitespace-nowrap">
                        {row["No. Of Portfolios"]}
                      </td>

                      <td className="py-2 text-center whitespace-nowrap">
                        <span
                          className={`${getBadgeClass(
                            row["ID Verification"]
                          )} rounded-full px-3 py-2 text-xs font-semibold`}
                        >
                          {row["ID Verification"]}
                        </span>
                      </td>

                      <td className="px-4 py-2 text-center whitespace-nowrap">
                        <span
                          className={`${getBadgeClass(
                            row["Portfolio Verification"]
                          )} rounded-full px-3 py-2 text-xs font-semibold`}
                        >
                          {row["Portfolio Verification"]}
                        </span>
                      </td>

                      <td className="px-4 py-2 text-center">
                        {(() => {
                          const parts = row.Location.split(",");
                          const firstLine = parts.slice(0, -1).join(",").trim();
                          const secondLine = parts.slice(-1)[0]?.trim();
                          return (
                            <div className="flex flex-col leading-tight">
                              <span className="whitespace-normal">{firstLine}</span>
                              <span className="text-gray-500 whitespace-normal">{secondLine}</span>
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-2 text-right whitespace-nowrap">
                        {Number(row["Size (KB)"]).toLocaleString()} KB
                      </td>

                      <td className="px-4 py-2 text-center whitespace-nowrap">
                        {row.Subscription}
                      </td>

                      <td className="px-4 py-2 text-center text-gray-400 font-bold">⋮</td>
                    </tr>

                    {/* Inline expanded details (NO overflow) */}
                    {isOpen && (
                      <tr className="bg-white">
                        <td
                          colSpan={columnCount}
                          className="pb-6 px-0"
                          style={{ overflow: "visible" }}
                        >
                          <div className="mt-2">
                            <MemberProfile
                              member={row as ProfileMember}
                              onApprove={() => updateVerification(row, "approve")}
                              onReject={() => updateVerification(row, "reject")}
                              onPortfolioVerifyChange={(status) =>
                                setPortfolioVerification(row, status)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination (stays outside table; no scroll) */}
        <div className="flex items-center justify-center gap-6 px-4 py-4">
          <div className="flex space-x-2">
            <button
              className="px-3 py-2 rounded bg-gray-200 text-gray-600"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 3))}
            >
              &lt;
            </button>
            {Array.from({ length: 3 }, (_, i) => {
              const page = Math.floor((currentPage - 1) / 3) * 3 + i + 1;
              return (
                page <= totalPages && (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded ${currentPage === page
                      ? "bg-blue-100 border border-blue-500 text-blue-600"
                      : "bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                )
              );
            })}
            <button
              className="px-3 py-2 rounded bg-gray-200 text-gray-600"
              disabled={currentPage + 3 > totalPages}
              onClick={() => setCurrentPage(Math.min(currentPage + 3, totalPages))}
            >
              &gt;
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-2"
            >
              {[10, 20, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span>/Page</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMemberTable;
