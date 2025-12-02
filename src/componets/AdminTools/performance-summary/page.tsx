"use client";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

export default function PerformanceSummaryExpanded() {
  const router = useRouter();
  const allRows = [
    { title: "Buy 1 Get 1 Free", status: "Expires 3 days", rate: 220, clicks: 1240 },
    { title: "30% off Selected Items", status: "Expires 1 day", rate: 19, clicks: 1090 },
    { title: "Black Friday Sale", status: "Expired 1 week", rate: 25, clicks: null },
    { title: "Buy 1 Get 1 Free", status: "Expires 3 days", rate: 22, clicks: 1240 },
    { title: "30% off Selected Items", status: "Expires 1 day", rate: 19, clicks: 1090 },
    { title: "Black Friday Sale", status: "Expired 1 week", rate: 5, clicks: null },
    { title: "Buy 1 Get 1 Free", status: "Expires 3 days", rate: 22, clicks: 1240 },
    { title: "30% off Selected Items", status: "Expires 1 day", rate: 19, clicks: 1090 },
    { title: "Black Friday Sale", status: "Expired 1 week", rate: 25, clicks: null },
    { title: "Buy 1 Get 1 Free", status: "Expires 3 days", rate: 22, clicks: 1240 },
    { title: "30% off Selected Items", status: "Expires 1 day", rate: 19, clicks: 1090 },
    { title: "Black Friday Sale", status: "Expired 1 week", rate: 25, clicks: null },
    { title: "Buy 1 Get 1 Free", status: "Expires 3 days", rate: 12, clicks: 1240 },
    { title: "30% off Selected Items", status: "Expires 1 day", rate: 19, clicks: 1090 },
    { title: "Black Friday Sale", status: "Expired 1 week", rate: 25, clicks: null },
    { title: "Buy 1 Get 1 Free", status: "Expires 3 days", rate: 22, clicks: 1240 },
    { title: "30% off Selected Items", status: "Expires 1 day", rate: 19, clicks: 1090 },
    { title: "Black Friday Sale", status: "Expired 1 week", rate: 25, clicks: null },
    { title: "Buy 1 Get 1 Free", status: "Expires 3 days", rate: 2, clicks: 1240 },
    { title: "30% off Selected Items", status: "Expires 1 day", rate: 19, clicks: 1090 },
    { title: "Black Friday Sale", status: "Expired 1 week", rate: 25, clicks: null },
    { title: "Buy 1 Get 1 Free", status: "Expires 3 days", rate: 202, clicks: 1240 },
    { title: "30% off Selected Items", status: "Expires 1 day", rate: 19, clicks: 1090 },
    { title: "Black Friday Sale", status: "Expired 1 week", rate: 25, clicks: null },
    { title: "Buy 1 Get 1 Free", status: "Expires 3 days", rate: 22, clicks: 1240 },
    { title: "30% off Selected Items", status: "Expires 1 day", rate: 19, clicks: 1090 },
  ];

  const [showFilter, setShowFilter] = useState(false);

  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedRates, setSelectedRates] = useState<string[]>([]);

  const titlesList = ["Buy 1 Get 1 Free", "30% off Selected Items", "Black Friday Sale"];
  const statusList = ["Expiring Soon", "Expired"];
  const rateList = [
    { key: "0-10", label: "0–10%" },
    { key: "10-20", label: "10–20%" },
    { key: "20-30", label: "20–30%" },
    { key: "30-40", label: "30–40%" },
    { key: "40-50", label: "40–50%" },
    { key: ">50", label: ">50%" },
  ];

  const [openTitle, setOpenTitle] = useState(true);
  const [openStatus, setOpenStatus] = useState(true);
  const [openRate, setOpenRate] = useState(true);

  // Auto-hide filter when all sections are collapsed
  useEffect(() => {
    if (!openTitle && !openStatus && !openRate) {
      setShowFilter(false);
    }
  }, [openTitle, openStatus, openRate]);

  const toggleTitle = (title: string) => {
    setSelectedTitles((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((t) => t !== status) : [...prev, status]
    );
  };

  const toggleRate = (key: string) => {
    setSelectedRates((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  };

  const clearAll = () => {
    setSelectedTitles([]);
    setSelectedStatuses([]);
    setSelectedRates([]);

    // Reset dropdown states for next open
    setOpenTitle(true);
    setOpenStatus(true);
    setOpenRate(true);

    // Close panel
    setShowFilter(false);
  };


  const anyFilterSelected =
  selectedTitles.length > 0 ||
  selectedStatuses.length > 0 ||
  selectedRates.length > 0;

  const filteredRows = useMemo(() => {
    return allRows.filter((row) => {
      const isExpiring = row.status.includes("Expires");
      const isExpired = row.status.includes("Expired");

      if (selectedTitles.length > 0 && !selectedTitles.includes(row.title)) return false;

      if (selectedStatuses.length > 0) {
        if (selectedStatuses.includes("Expiring Soon") && !isExpiring) return false;
        if (selectedStatuses.includes("Expired") && !isExpired) return false;
      }

      if (selectedRates.length > 0) {
        const rate = row.rate;
        const match = selectedRates.some((r) => {
          if (r === "0-10") return rate >= 0 && rate <= 10;
          if (r === "10-20") return rate > 10 && rate <= 20;
          if (r === "20-30") return rate > 20 && rate <= 30;
          if (r === "30-40") return rate > 30 && rate <= 40;
          if (r === "40-50") return rate > 40 && rate <= 50;
          if (r === ">50") return rate > 50;
        });
        if (!match) return false;
      }

      return true;
    });
  }, [selectedTitles, selectedStatuses, selectedRates]);

  // PAGINATION (AFTER FILTERING)

  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  // UI RENDER
  return (
    <div className="bg-[#E6F0FA] flex justify-center">
      <div className="w-full xl:w-[1216px] lg:w-[880px] bg-white rounded-lg p-10 shadow-sm pl-[80px] pr-[80px]">

        {/* HEADER */}
        <div className="flex justify-between font-semibold items-start mb-8">
          <h2 className="text-[14px]">Performance Summary</h2>

          <div className="flex items-center gap-[16px]">
            <button
              onClick={() => router.push("/admin-tools")}
              className="flex items-center gap-2 bg-black text-white text-[12px] w-[89px] px-4 py-1 rounded-full"
            >
              Collapse
              <img src="/collapse_content.svg" className="w-[24px] h-[24px]" />
            </button>

            <button
              onClick={() => setShowFilter(!showFilter)}
              className="bg-black text-white w-[38px] h-[38px] rounded-full flex items-center justify-center"
            >
              <img src="/Filter.svg" className="w-[14px] h-[14px]" />
            </button>
          </div>
        </div>

        {/* FILTER PANEL */}
        {showFilter && (
          <div className="w-full mb-6">
            <div className="p-6 rounded-lg bg-white shadow-lg">

              <p className="font-semibold text-[17px] mb-6">Filter</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* TITLE SECTION */}
                <div>
                  <div className="w-full h-[1px] bg-gray-200 mb-3"></div>
                  <div
                    className="flex items-start justify-between cursor-pointer mb-3"
                    onClick={() => setOpenTitle(!openTitle)}
                  >
                    <p className="font-semibold text-[14px] text-[#495057]">Title</p>
                    <img
                      src="/vector 5.svg"
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openTitle ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </div>

                  

                  {openTitle && (
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {titlesList.map((t) => (
                        <label key={t} className="flex items-center gap-3 text-[11px] text-[#464646] Font-Inter">
                          <input
                            type="checkbox"
                             className="accent-[#434343]"
                            checked={selectedTitles.includes(t)}
                            onChange={() => toggleTitle(t)}
                          />
                          {t}
                        </label>
                      ))}

                      
                    </div>
                  )}
                </div>

                {/* STATUS SECTION */}
                <div>
                  <div className="w-full h-[1px] bg-gray-200 mb-3"></div>
                  <div
                    className="flex items-center justify-between cursor-pointer mb-3"
                    onClick={() => setOpenStatus(!openStatus)}
                  >
                    <p className="font-semibold text-[14px] text-[#495057]">Status</p>
                    <img
                      src="/vector 5.svg"
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openStatus ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </div>

                  

                  {openStatus && (
                    <div className="flex flex-col gap-2">
                      {statusList.map((s) => (
                        <label key={s} className="flex items-center gap-3 text-[11px] text-[#464646] Font-Inter">
                          <input
                            type="checkbox"
                            checked={selectedStatuses.includes(s)}
                            onChange={() => toggleStatus(s)}
                          />
                          {s}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* RATE SECTION */}
                <div>
                  <div className="w-full h-[1px] bg-gray-200 mb-3"></div>
                  <div
                    className="flex items-center justify-between cursor-pointer mb-3"
                    onClick={() => setOpenRate(!openRate)}
                  >
                    <p className="font-semibold text-[14px] text-[#495057]">Conversion Rate</p>
                    <img
                      src="/vector 5.svg"
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openRate ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </div>

                  {openRate && (
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                      {rateList.map((r) => (
                        <label key={r.key} className="flex items-center gap-3 text-[11px] text-[#464646] Font-Inter">
                          <input
                            type="checkbox"
                            checked={selectedRates.includes(r.key)}
                            onChange={() => toggleRate(r.key)}
                          />
                          {r.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                

              </div>
              {/* CLEAR ALL BUTTON */}
            {anyFilterSelected && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={clearAll}
                  className="
                    bg-[#1B1B1B]
                    text-white
                    text-[10px]
                    h-[21px]
                    px-2
                    rounded-[4px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  Clear All
                </button>
              </div>
            )}



            </div>
          </div>
        )}

        {/* … your table code … */}
        <div className="w-full bg-white rounded-lg p-1 text-[#495057]">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F9FA]">
                <tr>

                  <th className="p-3 text-left w-[280px]">
                    <div className="flex items-center gap-2 Font-Inter font-semibold">
                      Title
                      <img src="/swap_vert.svg" alt="sort" className="w-3 h-3" />
                    </div>
                  </th>

                  <th className="p-3 text-left w-[192px]">
                    <div className="flex items-center gap-2 Font-Inter font-semibold">
                      Status
                      <img src="/swap_vert.svg" alt="sort" className="w-3 h-3" />
                    </div>
                  </th>

                  <th className="p-3 text-left w-[206px]">
                    <div className="flex items-center gap-2 Font-Inter font-semibold">
                      Conversion Rate
                      <img src="/swap_vert.svg" alt="sort" className="w-3 h-3" />
                    </div>
                  </th>

                  <th className="p-3 text-left w-[472px]">
                    <div className="flex items-center gap-2 Font-Inter font-semibold">
                      Clicks/Last 24 Hours
                      {/* If you DON'T want icon here, remove the img */}
                      <img src="/swap_vert.svg" alt="sort" className="w-3 h-3" />
                    </div>
                  </th>

                </tr>
                </thead>

            <tbody>
              {currentRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${idx % 2 === 1 ? "bg-[#FAFAFA]" : ""}`}
                >
                  <td className="p-3">{row.title}</td>
                  <td className="p-3">{row.status}</td>
                  <td className="p-3">{row.rate}%</td>
                  <td className="p-3">{row.clicks ?? "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-end items-center text-[#0066CC] text-sm gap-2">
            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`
                    px-1
                    ${currentPage === pageNum ? "font-bold" : "font-normal"}
                  `}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Ellipsis */}
            <span className="px-1">....</span>

            {/* Next arrow */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-1 hover:underline"
            >
              <img 
                src="/Vector 2.svg"
                alt="next"
                className="w-3 h-3"
              />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
