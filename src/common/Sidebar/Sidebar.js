"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChatDotsFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FiSun, FiMenu } from "react-icons/fi";
import { MdOutlineLogout, MdClose } from "react-icons/md";
import { CgMenuLeft } from "react-icons/cg";
import { Icons } from "@/assets/Icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for previously selected theme in localStorage
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <div className="dark:bg-[#363536] bg-white py-3">
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50  "
          >
            {isOpen ? <MdClose size={24} /> : <CgMenuLeft size={24} />}
            {/* <Image src={Icons?.menu} alt='logo' width={100} height={100} className='w-12 h-12' /> */}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
                fixed top-0 left-0 min-h-screen h-full flex flex-col justify-between bg-[#F2F2F2] dark:bg-[#363536] text-white transition-all duration-300 z-40
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0 lg:w-72 lg:static
                w-72 px-6 py-4
                ${isMobile ? "shadow-xl" : ""}
            `}
      >
        {/* Logo */}
        <div className="h-14 flex items-center justify-center">
          <Link href="/">
            <span className="text-2xl font-semibold text-[#454545] dark:text-white">alira</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-col flex-grow space-y-7 mt-4">
          {/* Chat Button */}
          <Link
            href="#"
            className="flex items-center bg-zinc-800/40 hover:bg-zinc-900 px-6 py-4 rounded-full shadow-lg shadow-light/10 hover:shadow-0 transition-all duration-300"
          >
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <BsChatDotsFill className="text-white" size={18} />
            </div>
            <span className="text-base font-medium">Chat</span>
          </Link>

          {/* Brain Button */}
          <Link
            href="#"
            className="flex items-center bg-zinc-800/40 hover:bg-zinc-900 px-6 py-4 rounded-full shadow-lg shadow-light/10 transition-all duration-300"
          >
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <span className="text-lg">🧠</span>
            </div>
            <span className="text-base font-medium">Brain</span>
          </Link>

          {/* Settings Button */}
          <Link
            href="#"
            className="flex items-center bg-zinc-800/40 hover:bg-zinc-900 px-6 py-4 rounded-full shadow-lg shadow-light/10 transition-all duration-300"
          >
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <CiSettings className="text-gray-300" size={20} />
            </div>
            <span className="text-base font-medium">Settings</span>
          </Link>
        </div>

        {/* Bottom Icons */}
        <div className="mt-auto flex flex-col space-y-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-900 shadow-lg shadow-light/10 flex items-center justify-center w-fit"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            {/* <FiSun className="text-white" size={20} /> */}
          </button>
          <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-900 shadow-lg shadow-light/10 flex items-center justify-center w-fit">
            <MdOutlineLogout className="text-white" size={20} />
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
