"use client";
import { useState, useRef } from "react";
import ProfilePictureModal from "./ProfilePictureModal";

export default function TeamInfoForm({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  // ✅ State for uploaded image
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const options = [
    "Create Team Access",
    "Delete Team Access",
    "None",
  ];

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) => {
      if (option === "None") {
        return ["None"];
      }
      const filtered = prev.filter((item) => item !== "None");
      if (filtered.includes(option)) {
        return filtered.filter((item) => item !== option);
      } else {
        return [...filtered, option];
      }
    });
  };

  const handleRemoveOption = (option: string) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
  };
  //Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  //Open file picker when button clicked
  const handleButtonClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };
  const handleEditToggle = (e: React.FormEvent) => {
    e.preventDefault();    
    if (isEditing) {
      if (formRef.current) {
        formRef.current.reset();
      }
      setPreview(null);
      setSelectedOptions([]);
      setDropdownOpen(false);

    }
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setPreview(null);
    setDropdownOpen(false);
    setSelectedOptions([]);
    setIsEditing(false);

  };

  return (
    <div className="relative">
      <h2 className="font-semibold text-[18px] mb-6">Team Information</h2>
      <form ref={formRef} onSubmit={handleEditToggle} className="space-y-5 ">
        <div className="relative flex justify-left items-center mb-8">
          <div
            style={{
              width: "141.667px",
              height: "141.667px",
              borderRadius: "100%",
              border: "5px solid #BADBFF",
              backgroundColor: "#ffffff",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={preview || "/iconamoon_profile-circle-fill.svg"} 
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: isEditing ? 1 : 0.7,
              }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
            disabled={!isEditing}
          />
          <button
            type="button"
            onClick={() => setShowModal(true)}
            disabled={!isEditing}
            className="font-[Noto Sans] text-black absolute bottom-[8px] left-[220px] translate-x-[-50%] inline-flex items-center gap-[10px] px-[10px]  rounded-[17px] bg-white shadow-[0_1px_6.5px_rgba(0,0,0,0.25)] text-[18px] text-[#2c678a] font-semibold border border-gray-200 hover:bg-gray-50 transition">
            <img
            src="/Vector.svg"
            alt="Upload icon"
            className="w-[16px] h-[16px]"
          />
            Upload Profile Picture
          </button>

        </div>
        <div className="w-full flex flex-col gap-[6px]">
          <label className="block w-full text-[12px] leading-[18px] font-[Noto Sans] font-semibold text-[#666]">
            Enter First and Last Name
            <span className="text-[#FF3737]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Full Name"
            disabled={!isEditing}
            className={`w-full rounded-[8px] border border-[#CCC] px-4 py-4 text-[16px] leading-[24px] font-[Noto Sans] font-normal text-[#666] placeholder-[#666] outline-none ${
              isEditing ? "bg-white" : "bg-[#F0F4FF]"
            }`}
          />
        </div>

        <div className="w-full flex flex-col gap-[6px]">
          <label className="block w-full text-[12px] leading-[18px] font-[Noto Sans] font-semibold text-[#666]">Email Address<span className="text-[#FF3737]">*</span></label>
          <input
            type="email"
            required
            placeholder="email@fyndme.net"
            disabled={!isEditing}
            className={`w-full rounded-[8px] border border-[#CCC] px-4 py-4 text-[16px] leading-[24px] font-[Noto Sans] font-normal text-[#666] placeholder-[#666] outline-none ${
              isEditing ? "bg-white" : "bg-[#F0F4FF]"
            }`}
          />
        </div>

        <div className="w-full flex flex-col gap-[6px]">
          <label className="block w-full text-[12px] leading-[18px] font-[Noto Sans] font-semibold text-[#666]">Phone Number<span className="text-red-500">*</span></label>
          <input
            type="tel"
            required
            placeholder="+ 1 (111) - (000) - (01010)"
            disabled={!isEditing}
            className={`w-full rounded-[8px] border border-[#CCC] px-4 py-4 text-[16px] leading-[24px] font-[Noto Sans] font-normal text-[#666] placeholder-[#666] outline-none ${
              isEditing ? "bg-white" : "bg-[#F0F4FF]"
            }`}
          />
        </div>

        <div className="w-full flex flex-col gap-[6px]">
          <label className="block w-full text-[12px] leading-[18px] font-[Noto Sans] font-semibold text-[#666]">Office Address<span className="text-red-500">*</span></label>
          <input
            placeholder="Enter Street, City, State, Country, Zip-code"
            required
            disabled={!isEditing}
            className={`w-full rounded-[8px] border border-[#CCC] px-4 py-4 text-[16px] leading-[24px] font-[Noto Sans] font-normal text-[#666] placeholder-[#666] outline-none ${
              isEditing ? "bg-white" : "bg-[#F0F4FF]"
            }`}
          />
        </div>

        <div className="w-full flex flex-col gap-[6px]">
          <label className="block w-full text-[12px] leading-[18px] font-[Noto Sans] font-semibold text-[#666]">Role<span className="text-red-500">*</span></label>
          <input
            type="text"
            required
            placeholder="Enter Role"
            disabled={!isEditing}
            className={`w-full rounded-[8px] border border-[#CCC] px-4 py-4 text-[16px] leading-[24px] font-[Noto Sans] font-normal text-[#666] placeholder-[#666] outline-none ${
              isEditing ? "bg-white" : "bg-[#F0F4FF]"
            }`}
          />
        </div>

        <div className="w-full flex flex-col gap-[6px]">
          <label className="block w-full text-[12px] leading-[18px] font-[Noto Sans] font-semibold text-[#666]">Username<span className="text-red-500">*</span></label>
          <input
            type="text"
            required
            placeholder="Enter username"
            disabled={!isEditing}
            className={`w-full rounded-[8px] border border-[#CCC] px-4 py-4 text-[16px] leading-[24px] font-[Noto Sans] font-normal text-[#666] placeholder-[#666] outline-none ${
              isEditing ? "bg-white" : "bg-[#F0F4FF]"
            }`}
          />
        </div>

        <div className="w-full flex flex-col gap-[6px]">
          <label className="block w-full text-[12px] leading-[18px] font-[Noto Sans] font-semibold text-[#666]">Password<span className="text-red-500">*</span></label>
          <input
            type="password"
            required
            placeholder="Enter password"
            disabled={!isEditing}
            className={`w-full rounded-[8px] border border-[#CCC] px-4 py-4 text-[16px] leading-[24px] font-[Noto Sans] font-normal text-[#666] placeholder-[#666] outline-none ${
              isEditing ? "bg-white" : "bg-[#F0F4FF]"
            }`}
          />
        </div>

        <div className="w-full flex flex-col gap-[6px] font-[Noto Sans]">
          <label className="block w-full text-[12px] leading-[18px] font-semibold text-[#666]">
            Types of Access
            <span className="text-[#FF3737]">*</span>
          </label>

          <div className="relative w-full">
            <div
              onClick={() => isEditing && setDropdownOpen(!dropdownOpen)}
              className={`flex flex-wrap items-center justify-between rounded-[8px] border border-[#CCC] px-4 py-4 transition ${
                isEditing
                  ? "bg-white cursor-pointer"
                  : "bg-[#F0F4FF] cursor-not-allowed"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 text-[16px] leading-[24px] font-normal text-[#666]">
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((option) => (
                    <span
                      key={option}
                      className="flex items-center gap-2 bg-[#F5F5F5] text-[#000] text-[13px] px-2 py-1 rounded-[6px]"
                    >
                      {option}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveOption(option);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-[#666] text-[16px] font-normal">
                    Select access type
                  </span>
                )}
              </div>

              <img
                src="/ic_outline-arrow-left.svg"
                alt="Dropdown Arrow"
                className={`w-[12px] h-[12px] ml-2 transition-transform ${
                  dropdownOpen ? "rotate-180" : "-rotate-0"
                }`}
              />
            </div>
            {dropdownOpen && isEditing && (
              <div className="absolute mt-1 w-full bg-[#FFFFFF] rounded-[8px] shadow-[0_0_8px_rgba(0,0,0,0.14)] border border-gray-200 z-10">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#000] text-[13px] font-[Noto Sans]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionToggle(option)}
                      className="accent-[#093488]"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 ">
          <button
            type="button"
            onClick={handleCancel}
            disabled={!isEditing}
            className={`px-6 py-2 rounded text-sm font-semibold transition ${
              isEditing
                ? "bg-[#abe3ff] text-[#2c678a] hover:bg-[#9bd0e8]"
                : "bg-[#abe3ff] text-[#2c678a] cursor-not-allowed"
            }`}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`px-6 py-2 rounded text-sm font-semibold transition ${
              isEditing
                ? "bg-[#093488] text-white hover:bg-[#0b3fa5]"
                : "bg-[#1b1b1b] text-white hover:bg-[#3a3a3a]"
            }`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>

        </div>

        <div className="mt-10 flex justify-end">          
          <button
            type="button"
            onClick={() => setActiveTab("listTeam")}
            className="inline-flex items-center gap-[8px] w-[244px] justify-end
                      text-[#0573E9] text-[15px] font-medium font-['Inter']
                      hover:underline transition-all"
          >
            Next Team Member List Page
            <img
              src="/Vector 2.svg"
              alt="Next arrow"
              className="w-[12px] h-[6px] flex-shrink-0"
            />
          </button>
        </div>
        {showModal && (
          <ProfilePictureModal
            preview={preview}
            setPreview={setPreview}
            onClose={() => setShowModal(false)}
          />
        )}
      </form>
    </div>
  );
}