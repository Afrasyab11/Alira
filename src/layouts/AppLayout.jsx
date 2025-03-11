import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar/Sidebar";
const AppLayout = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
