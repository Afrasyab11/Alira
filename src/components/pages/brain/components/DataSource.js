"use client";
import Image from "next/image";
import { Icons } from "@/assets/Icons";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
export const DataSource = () => {
  const [outlook, setOutLook] = useState("outlook");
  const [selected, setSelected] = useState("LinkedIn");

  return (
    <>
      <p className="text-lg dark:text-white text-black hidden md:block ">Data Sources </p>
      <div className=" dark:bg-[#363536] border-[1px] border-[#EBEFF2] dark:border-[#575757] mt-4 flex flex-col space-y-5 p-6 rounded-2xl">
        <div className=" flex justify-between border-[1px] border-[#E2E8F0] dark:border-[#575757]   rounded-full px-4 py-3">
          <div className="flex gap-x-3">
            <Image
              src={Icons?.core}
              alt="core"
              className="h-auto w-auto rounded-full"
            />
            <p className="dark:text-white text-black">Core Logic</p>
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
              src={Icons?.rea}
              alt="outlook"
              className="h-auto w-auto rounded-full"
            />

            {/* <Image src={Icons?.meta} alt="outlook" className="h-auto w-auto " /> */}
            <p className="dark:text-white text-black">REA Group</p>
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
    
      </div>
    </>
  );
};
