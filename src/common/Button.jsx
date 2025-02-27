"use client"
import React from "react";

const Button = ({
  label = "",
  title = "",
  type = "button",
  className = "!bg-blue text-white py-3 px-5 rounded-full w-full",
  onClick,
  disabled = false,
  isLoading = false,
  children,
}) => {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={`!bg-blue text-white py-3 px-5 rounded-full w-full ${className}`}
      disabled={disabled || isLoading}
    >
      {/* {isLoading ? (
        <span className="loading loading-spinner   text-white  loading-md flex justify-center items-center"></span>
      ) : ( */}
        <>
          {" "}
          {label}
          {children}
        </>
      {/* // )} */}
    </button>
  );
};

export default Button;

export const ButtonWithIcon = ({
  label = "",
  title = "",
  type = "button",
  className,
  onClick = null,
  isLoading = false,
  children,
}) => {
  return (
    <>
      <button
        type={type}
        title={title}
        onClick={onClick}
        className={`border-primary border-[1px] text-[16px] font-medium py-[6px]  text-primary px-2 active:bg-[#050707] hover:border-border-gray  rounded-md hover:text-white hover:bg-[#dba102] ${className}`}
        disabled={ isLoading}
      >
        <div className="flex items-center gap-x-2">
          {" "}
          {children}
          {label}
        </div>
      </button>
    </>
  );
};
