"use client";
import Image from "next/image";
import { Icons } from "@/assets/Icons";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
export const SocialIntegration = () => {
  const [outlook, setOutLook] = useState("outlook");
  const [selected, setSelected] = useState("LinkedIn");

  return (
    <>
      <p className="text-lg dark:text-white text-black hidden md:block ">Social Integrations</p>
      <div className=" dark:bg-[#363536] border-[1px] border-[#EBEFF2] dark:border-[#575757] mt-4 flex flex-col space-y-5 p-6 rounded-2xl">
        <div className=" flex justify-between border-[1px] border-[#E2E8F0] dark:border-[#575757]   rounded-full px-4 py-3">
          <div className="flex gap-x-3">
            <Image
              src={Icons?.outlook}
              alt="outlook"
              className="h-auto w-auto text-blue-500 dark:invert dark:brightness-0 dark:filter"
            />
            <p className="dark:text-white text-black">Outlook</p>
          </div>
          <div className="flex items-center gap-x-3">
            <p className="dark:text-white text-black">Connect</p>
            <input
              type="radio"
              value="LinkedIn"
              checked={selected === "LinkedIn"}
              onChange={() => setSelected("LinkedIn")}
              className={`cursor-pointer appearance-none bg-blue w-[14px] h-[14px] border-[4px] border-blue  rounded-full 
                checked:border-white checked:bg-blue checked:ring-4 checked:ring-blue
              `}
            />
          </div>
        </div>
        <div className="flex justify-between border-[1px] border-[#E2E8F0] dark:border-[#575757] rounded-full px-4 py-3">
          <div className="flex gap-x-3">
            <Image
              src={Icons?.meta}
              alt="outlook"
              className="h-auto w-auto text-blue-500 dark:invert dark:brightness-0 dark:filter"
            />

            {/* <Image src={Icons?.meta} alt="outlook" className="h-auto w-auto " /> */}
            <p className="dark:text-white text-black">Meta Ads</p>
          </div>
          <div className="flex items-center gap-x-3">
            <p className="dark:text-white text-black">Connect</p>
            <input
              type="radio"
              value="LinkedIn"
              checked={selected === "LinkedIn"}
              onChange={() => setSelected("LinkedIn")}
              className={`cursor-pointer appearance-none bg-blue w-[14px] h-[14px] border-[4px] border-blue  rounded-full 
    checked:border-white checked:bg-blue checked:ring-4 checked:ring-blue
  `}
            />
          </div>
        </div>
        <div className="flex justify-between border-[1px] border-[#E2E8F0] dark:border-[#575757]  rounded-full px-4 py-3">
          <div className="flex gap-x-3">
            <FaLinkedin size={25} className="dark:text-white text-blue" />

            <p className="dark:text-white text-black">LinkedIn </p>
          </div>
          <div className="flex items-center gap-x-3">
            <p className="dark:text-white text-black">Connect</p>
            {/* <input
              type="radio"
              name="outlook"
              value={outlook}
              checked={outlook === "outlook"}
              className={`cursor-pointer appearance-none bg-blue w-[14px] h-[14px] border-[4px] border-blue rounded-full 
    checked:border-white checked:bg-blue checked:ring-4 checked:ring-blue
  `}
  
            /> */}
            <input
              type="radio"
              name="connection"
              value="LinkedIn"
              checked={selected === "LinkedIn"}
              onChange={() => setSelected("LinkedIn")}
              className={`cursor-pointer appearance-none bg-blue w-[14px] h-[14px] border-[4px] border-blue  rounded-full 
              checked:border-white checked:bg-blue checked:ring-4 checked:ring-blue
            `}
            />
          </div>
        </div>
      </div>
    </>
  );
};
