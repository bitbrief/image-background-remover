"use client";

import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 animate-fade-in-down">
        Background Remover
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-fade-in-up">
        <div className="mb-6">
          <label htmlFor="file-upload" className="block text-gray-700 mb-2">
            Upload your image
          </label>
          <div
            className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={handleDivClick}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
            />
            <span className="text-gray-500">
              Drag and drop or click to select
            </span>
          </div>
        </div>

        <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors transform hover:scale-105 active:scale-95">
          Remove Background
        </button>
      </div>

      <p className="mt-6 text-gray-600 text-sm animate-fade-in">
        A product of BitBrief by Priyanshu Sharma
      </p>
    </div>
  );
}
