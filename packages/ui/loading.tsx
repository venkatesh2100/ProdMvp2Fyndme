// components/Loading.tsx
"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce" />
        <div className="h-4 w-4 bg-blue-400 rounded-full animate-bounce delay-150" />
        <div className="h-4 w-4 bg-blue-200 rounded-full animate-bounce delay-300" />
        <span className="text-sm text-gray-500 ml-2">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
