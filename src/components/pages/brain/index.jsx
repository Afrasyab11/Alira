import { RecentFile } from "./components/RecentFile";
import { UploadedFile } from "./components/UploadedFile";
import { useState } from "react";
export default function FileUploadComp() {
    const [activeTab, setActiveTab] = useState(0);
  const tabItems = [
    {
      label: "New Upload",
      content: <UploadedFile />,
    },
    {
      label: "Recent",
      content: <RecentFile />,
    },
  ];

  return (
    <div className=" flex flex-col">
      <p className="text-white font-medium hidden md:block text-xl">File Uploads</p>
      <div className="mt-4  shadow-file-tab-shadow sm:mx-2 md:mx-5 bg-white dark:bg-[#363536] sm:min-h-[70vh]  md:min-h-[73vh] lg:min-h-[63vh] xl:min-h-[73vh] rounded-2xl py-5 px-5">
        
        {/* <SmoothTabs tabs={tabItems} /> */}
        <div className="relative shadow-tab-shadow sm:mx-2  md:mx-6 xl:mx-8 2xl:mx-12 bg-[#F7F9FB] dark:bg-[#F7F9FB29] w-auto  max-w-lg rounded-full p-1 flex items-center mb-8">
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
              className={`relative flex-1 sm:px-2 md:px-8 py-2 rounded-full text-md font-medium transition-colors duration-300 ${
                activeTab === index ? "text-white dark:text-black" : "text-black dark:text-white"
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
  );
}
