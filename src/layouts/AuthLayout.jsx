import { Navigate, Outlet, useLocation } from "react-router-dom";
import "../App.css";
const AuthLayout = () => {
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
