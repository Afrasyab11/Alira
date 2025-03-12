import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar/Sidebar";
const AppLayout = (props) => {


 

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
