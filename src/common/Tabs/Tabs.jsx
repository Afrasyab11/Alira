"use client";

import { useState } from "react";

export default function SmoothTabs({ tabs, defaultTab = 0, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <>
      <div
        className={`w-full flex flex-col items-center justify-center ${className}`}
      >
        <div className="relative shadow-tab-shadow bg-[#F7F9FB29] w-full  max-w-lg rounded-full p-2 flex items-center mb-8">
          {/* Sliding Background */}
          <div
            className="absolute h-[calc(100%-8px)] top-1 bg-white rounded-full transition-all duration-300 ease-out"
            style={{
              width: `calc(${100 / tabs.length}% - 8px)`,
              left: `calc(${activeTab * (100 / tabs.length)}% + 4px)`,
            }}
          />

          {/* Tab Buttons */}
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`relative flex-1 px-8 py-2 rounded-full text-lg font-medium transition-colors duration-300 ${
                activeTab === index ? "text-slate-900" : "text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`
              absolute w-full transition-all duration-300 ease-out
              ${
                activeTab === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }
            `}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>
  );
}