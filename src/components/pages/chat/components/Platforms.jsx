import React from "react";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Platforms({ selectedPlatform, onPlatformChange }) {
  return (
    <div className="flex   flex-col space-y-2 py-4  self-end">
      <div className="flex space-x-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="platform"
            value="instagram"
            checked={selectedPlatform === "instagram"}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="hidden"
          />
          <div
            className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${
              selectedPlatform === "instagram"
                ? "bg-gradient-to-r from-[#4f5bd5]  via-[#d62976] via-[#962fbf] to-[#fa7e1e] text-white"
                : "bg-zinc-200/80 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
            }`}
          >
            <FaInstagram className="text-2xl" />
            {/* <span>Instagram</span> */}
          </div>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="platform"
            value="linkedin"
            checked={selectedPlatform === "linkedin"}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="hidden"
          />
          <div
            className={`flex items-center space-x-2 px-2 py-2 rounded-full transition-colors ${
              selectedPlatform === "linkedin"
                ? "bg-[#0e76a8] text-white dark:bg-[#0e76a8]"
                : "bg-zinc-200/80 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
            }`}
          >
            <FaLinkedin className="text-2xl" />
            {/* <span>LinkedIn</span> */}
          </div>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="platform"
            value="facebook"
            checked={selectedPlatform === "facebook"}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="hidden"
          />
          <div
            className={`flex items-center space-x-2 px-2 py-2 rounded-full  transition-colors ${
              selectedPlatform === "facebook"
                ? "bg-blue text-white dark:bg-blue-600"
                : "bg-zinc-200/80 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
            }`}
          >
            <FaFacebook className="text-2xl" />
            {/* <span>Facebook</span> */}
          </div>
        </label>
      </div>
    </div>
  );
}
