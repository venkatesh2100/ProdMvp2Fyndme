"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RequestsCompletedExpanded() {
  const router = useRouter();
  const allRows = [
    ["Sam Owens", "samowens678", "5 min ago", "Personal", "Esther A. Howard", "/stash_link-duotone.svg",false],
    ["John Doe", "johndoe0000", "15 min ago", "Matrimony", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Jane Smith", "janesmith1234", "1 hr ago", "Personal", "Alex Khor", "/stash_link-duotone.svg",false],
    ["Ella Jones", "ellajones345", "1 hr ago", "Business", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Dave Potter", "davepotter55", "2 hr ago", "Creative", "Alex Khor", "/stash_link-duotone.svg",false],
    ["Bob Johnson", "bobjohnson99", "2 hr ago", "Practitioner", "Alex Khor", "/stash_link-duotone.svg",true],
    ["Eva Sam", "evasam432", "3 hr ago", "Business", "Esther A. Howard", "/stash_link-duotone.svg",false],
    ["Gretchen Elswick", "gretchenelswick89", "5 hr ago", "Matrimony", "Esther A. Howard", "/stash_link-duotone.svg",false],
    ["Tammy Deer", "tammydeer77", "7 hr ago", "Lifestyle", "Esther A. Howard", "/stash_link-duotone.svg",false],
    ["Jake Hernandez", "jakehernandez11", "1 day ago", "Professional", "Alex Khor", "/stash_link-duotone.svg",false],
    ["Ella Jones", "ellajones345", "1 hr ago", "Business", "Esther A. Howard", "/stash_link-duotone.svg",false],
    ["Dave Potter", "davepotter55", "2 hr ago", "Creative", "Alex Khor", "/stash_link-duotone.svg",false],
    ["Bob Johnson", "bobjohnson99", "2 hr ago", "Practitioner", "Alex Khor", "/stash_link-duotone.svg",false],
    ["Eva Sam", "evasam432", "3 hr ago", "Business", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Gretchen Elswick", "gretchenelswick89", "5 hr ago", "Matrimony", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Tammy Deer", "tammydeer77", "7 hr ago", "Lifestyle", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Jake Hernandez", "jakehernandez11", "1 day ago", "Professional", "Alex Khor", "/stash_link-duotone.svg",true],
    ["Sam Owens", "samowens678", "5 min ago", "Personal", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["John Doe", "johndoe0000", "15 min ago", "Matrimony", "Esther A. Howard", "/stash_link-duotone.svg",false],
    ["Jane Smith", "janesmith1234", "1 hr ago", "Personal", "Alex Khor", "/stash_link-duotone.svg",false],
    ["Ella Jones", "ellajones345", "1 hr ago", "Business", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Dave Potter", "davepotter55", "2 hr ago", "Creative", "Alex Khor", "/stash_link-duotone.svg",true],
    ["Bob Johnson", "bobjohnson99", "2 hr ago", "Practitioner", "Alex Khor", "/stash_link-duotone.svg",true],
    ["Eva Sam", "evasam432", "3 hr ago", "Business", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Gretchen Elswick", "gretchenelswick89", "5 hr ago", "Matrimony", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Tammy Deer", "tammydeer77", "7 hr ago", "Lifestyle", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Jake Hernandez", "jakehernandez11", "1 day ago", "Professional", "Alex Khor", "/stash_link-duotone.svg",true],
    ["Ella Jones", "ellajones345", "1 hr ago", "Business", "Esther A. Howard", "/stash_link-duotone.svg",true],
    ["Dave Potter", "davepotter55", "2 hr ago", "Creative", "Alex Khor", "/stash_link-duotone.svg",true],
    ["Bob Johnson", "bobjohnson99", "2 hr ago", "Practitioner", "Alex Khor", "/stash_link-duotone.svg",true],
    ["Eva Sam", "evasam432", "3 hr ago", "Business", "Esther A. Howard", "/stash_link-duotone.svg",true],
  ];

  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = allRows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="bg-[#E6F0FA] flex justify-center">

      {/* MAIN CONTAINER */}
      <div className="w-full xl:w-[1216px] lg:w-[880px] bg-white gap-[25px] rounded-lg p-10 shadow-sm pl-[80px] pr-[80px] pb-[30px]">

        {/* Top Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-[14px] text-gray-600">Requests Completed</h2>
            <p className="text-[30px] font-semibold mt-1">578</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="w-full bg-white gap-[28px] rounded-lg p-1 overflow-x-auto ">

          {/* Main wrapper */}
          <div className="flex flex-col justify-end gap-[28px]">

            {/* Collapse button */}
            <div className="w-full flex justify-end">
              <button
                onClick={() => router.push("/admin-tools")}
                className="flex items-center gap-2 bg-black text-white text-[12px] w-[89px] px-4 py-1 rounded-full hover:bg-gray-800 transition"
              >
                Collapse
                <img 
                  src="/collapse_content.svg"
                  alt="collapse"
                  className="w-[24px] h-[24px]"
                />
              </button>
            </div>

            {/* TABLE */}
            <div className="w-full flex justify-end">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F9FA] text-gray-600 font-[Roboto]">
                  <tr>

                    <th className="p-3 text-left w-[280px]">
                      <div className="flex items-center gap-2">
                        Name
                        <img src="/swap_vert.svg" alt="sort" className="w-3 h-3" />
                      </div>
                    </th>

                    <th className="p-3 text-left w-[192px]">
                      <div className="flex items-center gap-2">
                        Username
                        <img src="/swap_vert.svg" alt="sort" className="w-3 h-3" />
                      </div>
                    </th>

                    <th className="p-3 text-left w-[206px]">
                      <div className="flex items-center gap-2">
                        Verification Completed
                        <img src="/swap_vert.svg" alt="sort" className="w-3 h-3" />
                      </div>
                    </th>

                    <th className="p-3 text-left w-[132px]">
                      <div className="flex items-center gap-2">
                        Portfolio Type
                      </div>
                    </th>
                    <th className="p-3 text-left w-[155px]">
                      <div className="flex items-center gap-2">
                        Portfolio Name
                      </div>
                    </th>
                    <th className="p-3 text-left w-[132px]">
                      <div className="flex items-center gap-2">
                        Link
                      </div>
                    </th>

                  </tr>
                </thead>


                <tbody>
                  {currentRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-gray-200 hover:bg-gray-50 ${
                        idx % 2 === 1 ? "bg-[#FAFAFA]" : ""
                      }`}
                    >
                      {row.map((cell, i) => (
                        <td className="p-3 text-gray-700" key={i}>

                          {/* Column 0 → Name + colored circle */}
                          {i === 0 ? (
                            <div className="flex items-center gap-2">
                              <img
                                src={row[6] ? "/Ellipse 1114.svg" : "/Ellipse 1115.svg"}
                                alt="status"
                                className="w-[6px] h-[6px]"
                              />
                              {cell}
                            </div>
                          
                          ) : i === 5 ? (
                            // Column 5 → Link Icon
                            <img
                              src={cell as string}
                              alt="link"
                              className="w-5 h-5 cursor-pointer"
                              onClick={() => router.push("/user-management")}
                            />
                          
                          ) : (
                            // Regular text cells
                            cell
                          )}

                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

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
    </div>
  );
}
