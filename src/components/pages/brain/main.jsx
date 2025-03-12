import { DataSource } from "./components/DataSource";
import { SocialIntegration } from "./components/Socialintegration";
import FileUploadComp from ".";
import { useState,useEffect } from "react";

const Brain = () => {
  const [activeTab, setActiveTab] = useState(0);
    const [isClient, setIsClient] = useState(false);
  
  const tabItems = [
    {
      label: "File Upload",
      content: <FileUploadComp />,
    },
    {
      label: "Integration",
      content: <SocialIntegration />,
    },
    {
      label: "Data Source",
      content: <DataSource />,
    },
  ];


  
  
  return (
    <>
      <div className="w-full sm:px-2 md:p-24 bg-white min-h-screen dark:bg-[#1D1D1F]">
        <div className="hidden md:block w-full">
          <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-10 ">
            <div>
              <FileUploadComp />
            </div>
            <div className="w-full flex flex-col gap-y-12">
              <div className="flex flex-col ">
                <SocialIntegration />
              </div>
              <div>
                <DataSource />
              </div>
            </div>
          </div>
        </div>

        <div className=" sm:block md:hidden pt-28 ">
          {/* <SmoothTabs tabs={tabItems} /> */}
          <div className="relative shadow-tab-shadow px-3 md:mx-12 bg-[#F7F9FB] dark:bg-[#242424]  w-auto  max-w-lg rounded-full p-1 flex items-center mb-8">
            {/* Sliding Background */}
            <div
              className="absolute h-[calc(100%-8px)] top-1 dark:bg-white dark:text-white bg-[#454545] rounded-full transition-all duration-300 ease-out"
              style={{
                width: `calc(${100 / tabItems.length}% - 8px)`,
                left: `calc(${activeTab * (100 / tabItems.length)}% + 4px)`,
              }}
            />

            {/* Tab Buttons */}
            {tabItems.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative flex-1 sm:px-2 md:px-8 py-2 rounded-full text-base font-medium transition-colors duration-300 ${
                  activeTab === index
                    ? "text-white dark:text-black"
                    : "text-black dark:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative ">
            {tabItems?.map((tab, index) => (
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
        </div>
      </div>
    </>
  );
};

export default Brain;
