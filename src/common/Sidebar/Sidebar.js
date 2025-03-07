"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BsChatDotsFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout, MdClose } from "react-icons/md";
import { CgMenuLeft } from "react-icons/cg";
import Image from "next/image";
import { Icons } from "@/assets/Icons";
import { IoMoonOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { PiBrain } from "react-icons/pi";
import { FaChevronCircleLeft } from "react-icons/fa";

const Sidebar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        setIsMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    {
      id: 1,
      icon: <BsChatDotsFill size={20} />,
      name: "Chat",
      link: "/main/chat",
    },
    {
      id: 2,
      icon: <PiBrain className="text-red-300" size={20} />,
      name: "Brain",
      link: "/main/brain",
    },
    { id: 3, icon: <CiSettings size={20} />, name: "Settings", link: "#" },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsOpen(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      {/* Mobile Header (Only on small screens) */}
      {isMobile && (
        <div className="dark:bg-[#363536] bg-white py-3 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
          <button onClick={toggleSidebar} className="text-xl">
            <Image src={Icons?.menu} alt="menu" className="h-auto w-auto" />
          </button>
          <Image src={Icons?.alira} alt="logo" className="h-auto w-auto dark:invert" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`sm:fixed md:fixed lg:relative top-0 left-0 min-h-screen h-full  flex flex-col justify-between bg-[#F2F2F2] dark:bg-[#363536] text-white transition-all duration-300 z-50 
          ${
            isOpen
              ? "sm:w-0 md:w-0 lg:w-0 xl:w-[70px] translate-x-0"
              : "w-[270px] px-6"
          }
       ${isOpen && "xl:translate-x-0"} xl:w-[250px]`}
      >
        <FaChevronCircleLeft
        size={30}
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
            // onMenuClick();
          }}
          alt="logo"
          className=" absolute dark:text-white text-black -right-[13px] cursor-pointer hidden lg:block"
        />
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 text-black dark:text-white"
          >
            <MdClose size={24} />
          </button>
        )}

        {/* Logo */}
        {!isMobile && (
          <Image
            src={Icons?.alira}
            alt="logo"
            className={` dark:invert ${!isOpen ? "h-8 flex justify-center w-full mt-4":" h-6 w-full ms-2 max-w-12  flex justify-center mt-8"}`}
          />
        )}

        {/* Navigation */}
        <div className="flex flex-col flex-grow space-y-7 sm:pt-20 md:pt-20 mt-4">
          {categories?.map((item, index) => (
            <Link
              key={index}
              href={item?.link}
              className={`flex items-center gap-x-3  dark:text-white bg-white dark:bg-[#333333] transition-all duration-300  ${
                pathName.includes(item.link)
                  ? "!bg-[#292929] dark:text-white text-white"
                  : "dark:bg-[#333333] dark:text-white text-black"
              } ${
                !isOpen ?
                "  px-6 py-4 rounded-full shadow:links-light-shadow dark:shadow-logout-them":"flex justify-center"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div
                className={`p-[5px] rounded-xl`}
              >
               <span className={`  ${!isOpen ? "w-8 h-8 ":"w-20 h-20"}`}>{item?.icon}</span>
              </div>

              <span className={`text-base font-medium ${isOpen && "hidden"}`}>
                {item?.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom Icons */}
        <div className="mt-auto flex flex-col space-y-8">
          <button
            onClick={toggleTheme}
            className="sm:ps-3 sm:py-2 md:p-4 rounded-full bg-white dark:bg-[#333333] shadow-logout-them flex items-center gap-x-4 sm:w-full  md:w-fit"
          >
            {theme == "light" ? (
              <IoMoonOutline size={30} className="text-black dark:text-white" />
            ) : (
              <Image
                src={Icons?.sun}
                alt="moon"
                className="h-auto w-auto text-white dark:invert dark:brightness-0 dark:filter"
              />
            )}
            <small className="sm:block md:hidden text-dark dark:text-white font-medium">
              Light Mode
            </small>
          </button>
          <Link
            href={"/"}
            className="sm:ps-3 sm:py-2 md:p-4 rounded-full bg-white dark:bg-[#333333] shadow-logout-them flex items-center gap-x-4 sm:w-full  md:w-fit"
          >
            <MdOutlineLogout className="text-black dark:text-white" size={30} />
            <small className="sm:block md:hidden text-dark dark:text-white font-medium">
              Logout
            </small>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
