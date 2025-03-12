import { useState, useEffect } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout, MdClose } from "react-icons/md";
import { Image } from "../image/Image";
import { Icons } from "../../assets/Icons";
import { IoMoonOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
// import { usePathname } from "next/navigation";
import { PiBrain } from "react-icons/pi";
import { ROUTES_ENUM } from "../../constants/routes.constant";

const Sidebar = () => {
  // const pathName = usePathname();
  
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen]=useState(false)
  const location = useLocation();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); 
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
      link: ROUTES_ENUM?.CHAT,
    },
    {
      id: 2,
      icon: <PiBrain className="text-red-300" size={20} />,
      name: "Brain",
      link: ROUTES_ENUM?.BRAIN,
    },
    { id: 3, icon: <CiSettings size={20} />, name: "Settings", link: "#" },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true); // Expand sidebar on hover (only for larger screens)
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false); // Collapse sidebar on mouse leave (only for larger screens)
    }
  };

  return (
    <>
      {/* Header for Mobile and Medium Screens */}
      {(isMobile || window.innerWidth <= 1024) && (
        <div className="dark:bg-[#363536] bg-white py-3 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
          <button onClick={toggleSidebar} className="text-xl">
            <Image
              src={Icons?.menu}
              alt="menu"
              className="h-auto w-auto text-white dark:invert dark:brightness-0 dark:filter"
            />
          </button>
          <Image
            src={Icons?.alira}
            alt="logo"
            className="h-auto w-auto dark:invert"
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={!isMobile ? handleMouseEnter : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        className={`sm:fixed md:fixed xl:static top-0 left-0 h-screen flex flex-col justify-between bg-[#F2F2F2] dark:bg-[#363536] text-white transition-all duration-300 z-40 
          ${
            isMobile || window.innerWidth <= 1024
              ? isOpen
                ? "w-[270px] translate-x-0"
                : "-translate-x-full"
              : isOpen
              ? "w-[270px]"
              : "w-[70px]"
          }`}
      >
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className={`${
              isOpen ? "block" : "hidden"
            } absolute z-[999] top-4 left-4 text-black dark:text-white`}
          >
            <MdClose size={24} onClick={toggleSidebar} />
          </button>
        )}

        {/* Logo */}
        {!isMobile && !(window.innerWidth <= 1024) && (
          <div className="flex justify-center mt-4">
            {isOpen ? (
              <Image
                src={Icons?.alira}
                alt="logo"
                className="dark:invert h-8 w-auto"
              />
            ) : (
              <Image
                src={Icons?.darkAlira}
                alt="logo"
                className="dark:invert h-5 w-auto"
              />
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col flex-grow space-y-7 z-50 pt-20 px-5 mt-4">
          {categories.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`flex items-center gap-x-3 dark:text-white bg-transparent dark:bg-transparent transition-all duration-300 
                ${
                  location.pathname === item.link
                    ? "!bg-[#292929] dark:text-white text-white"
                    : "dark:bg-transparent dark:text-white text-black"
                } 
                ${
                  isOpen
                    ? "px-6 py-4 rounded-full"
                    : "flex sm:justify-end lg:justify-center"
                }`}
              // onClick={() => setIsOpen(false)}
            >
              <div className="p-[5px] rounded-xl">
                <span className={`${isOpen ? "w-8 h-8" : "w-20 h-20"}`}>
                  {item.icon}
                </span>
              </div>
              <span className={`text-base font-medium ${!isOpen && "hidden"}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom Icons */}
        <div
          className={`mt-auto flex flex-col space-y-8 pb-6 ${
            isOpen
              ? "items-center lg:items-center px-3"
              : "sm:items-end md:items-start lg:items-center xl:items-center "
          }`}
        >
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full bg-white dark:bg-[#333333]  shadow-logout-them flex items-center gap-x-4 sm:w-full  md:w-fit`}
          >
            {theme == "light" ? (
              <IoMoonOutline size={20} className="text-black dark:text-white" />
            ) : (
              <Image
                src={Icons?.sun}
                alt="moon"
                className="h-6 w-auto text-white dark:invert dark:brightness-0 dark:filter"
              />
            )}
            <small
              className={`text-dark px-3 dark:text-white font-medium ${
                isOpen ? "block" : "hidden"
              }`}
            >
              Light Mode
            </small>
          </button>
          <Link
            href={"/"}
            className={` p-2 rounded-full bg-white dark:bg-[#333333] shadow-logout-them flex items-center gap-x-4 sm:w-full  md:w-fit`}
          >
            <MdOutlineLogout className="text-black dark:text-white" size={25} />
            <small
              className={`text-dark px-3 dark:text-white font-medium ${
                isOpen ? "block" : "hidden"
              }`}
            >
              Logout
            </small>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
