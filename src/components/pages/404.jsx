import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../constants/routes.constant";

const NoPAge = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-5">
      <span className="text-2xl font-bold">No page found 404!</span>
      <button
        type="button"
        className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={() => navigate(ROUTES_ENUM.ROOT)}
      >
        Dashboard
      </button>
    </div>
  );
};

export default NoPAge;
