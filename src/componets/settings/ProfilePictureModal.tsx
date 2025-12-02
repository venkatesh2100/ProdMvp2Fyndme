"use client";
import { useRef, useState } from "react";

interface ProfilePictureModalProps {
  preview: string | null;
  setPreview: (value: string | null) => void;
  onClose: () => void;
}

export default function ProfilePictureModal({
  preview,
  setPreview,
  onClose,
}: ProfilePictureModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [tempPreview, setTempPreview] = useState<string | null>(preview);
  const handleUploadNew = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempPreview(imageUrl);
    }
  };

  const handleDelete = () => {
    setTempPreview("/iconamoon_profile-circle-fill.svg");
  };

  const handleSave = () => {
    setPreview(tempPreview);
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        style={{
          background: "rgba(0, 0, 0, 0.30)", 
        }}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
        <div
          className="shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-[12px] bg-white lg:w-[738px] xl:w-[840px] h-[519px]"
          style={{
            right: "324px",
            top: "437px",
          }}
        >
          <div className="flex justify-between items-start px-8 pt-8">
            <h2
              className="font-[Inter] text-[24px] font-medium text-[#959393]"
              style={{ width: "243px" }}
            >
              Profile Picture
            </h2>

            <button onClick={onClose}>
              <img
                src="/iconoir_cancel.svg"
                alt="Cancel"
                className="w-[17.04px] h-[17.04px]"
              />
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <div
              className="flex justify-center items-center overflow-hidden"
              style={{
                width: "264px",
                height: "264px",
                borderRadius: "150px",
                border: "5px solid #BADBFF",
                backgroundColor: "#808080",
              }}
            >
              <img
                src={tempPreview || "/iconamoon_profile-circle-fill.svg"}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-8 w-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="738"
              height="4"
              viewBox="0 0 840 4"
              fill="none"
            >
              <path d="M0 2L840 2.00007" stroke="#CFCFCF" strokeWidth="4" />
            </svg>
          </div>

          <div className="flex justify-between items-center px-10 mt-6">
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <button onClick={handleUploadNew}>
                  <img
                    src="/icon-park_upload-picture.svg"
                    alt="Upload New"
                    className="w-[50px] h-[50px]"
                  />
                </button>
                <p className="text-[#000] font-[Inter] text-[16px] font-medium mt-1">
                  Upload New
                </p>
              </div>

              <div className="flex flex-col items-center">
                <button onClick={handleDelete}>
                  <img
                    src="/material-symbols_delete-outline.svg"
                    alt="Delete"
                    className="w-[55px] h-[55px]"
                  />
                </button>
                <p className="text-[#000] font-[Inter] text-[16px] font-medium mt-1">
                  Delete
                </p>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="inline-flex justify-center items-center px-8 py-3 rounded-[8px] bg-[#093488]"
            >
              <span className="text-white font-[Noto Sans] text-[16px] leading-6">
                Save
              </span>
            </button>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </>
  );
}