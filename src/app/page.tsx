"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { removeBackground } from '@imgly/background-removal'; // Updated import
import { blob } from "stream/consumers";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(0);
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100);
        }
      };
      reader.onload = (e) => {
        setUploadProgress(100);
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = async () => {
    if (!uploadedImage) {
      alert("Please upload an image first");
      return;
    }
    
    try {
      setIsLoading(true); // Set loading state to true
      const blob = await removeBackground(uploadedImage); // Updated function call
      const url = URL.createObjectURL(blob);
      
      // Create a link to download the image
      const a = document.createElement('a');
      a.href = url;
      a.download = 'processed-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      alert("Operation Successful !");
      console.log("Background removed and image ready for download");
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
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
          {!uploadedImage ? (
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
                onChange={handleFileChange}
              />
              {uploadProgress > 0 && uploadProgress < 100 ? (
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              ) : (
                <span className="text-gray-500">
                  Drag and drop or click to select
                </span>
              )}
            </div>
          ) : (
            <div className="relative w-full h-64">
              <Image
                src={uploadedImage}
                alt="Uploaded image"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </div>

        <button
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors transform hover:scale-105 active:scale-95"
          onClick={handleButtonClick}
        >
          Remove Background
        </button>
      </div>

      <p className="mt-6 text-gray-600 text-sm animate-fade-in">
        Made with ❤️ by BitBrief
      </p>

      {isLoading && (
        <div className="loader-container flex items-center justify-center"> {/* Centered loader container */}
          <div className="text-center"> {/* Added text-center for better alignment */}
            <p>Removing background, please wait...</p>
            <div className="loader"></div> {/* Circular progress indicator */}
          </div>
        </div>
      )}
    </div>
  );
}
