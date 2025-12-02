"use client";

import Image from "next/image";

export default function HeaderRightProfile() {
  return (
    <div className="w-full flex items-center justify-end px-8 py-4 bg-[#C4E6FF] shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-md overflow-hidden">
          <Image
            src="/o.png"
            alt="Devanshi Chitalia"
            width={360}
            height={360}
            className="object-cover"
          />
        </div>
        <div className="text-right">
          <h4 className="text-md font-medium text-gray-800">Devanshi Chitalia</h4>
          <p className="text-xs text-left text-gray-500 -mt-0.5">Owner</p>
        </div>
      </div>
    </div>
  );
}
