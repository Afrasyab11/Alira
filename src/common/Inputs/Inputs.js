"use client"
import React, { useState } from "react";
// import Button from "./Button";
import Button from "../Button";

const InputField = ({
  name,
  type = "text",
  value,
  placeholder = "",
  className = "",
  isLoading = false,
  error = false,
  msg = "",
  rows = 3,
  onChange,
  disabled = false,
  icon,
  checked = "",
  defaultChecked,
  options,
  ref,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label>
        { type === "text" ? (
          <input
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            autoComplete="off"
            onChange={onChange}
            className={`w-full bg-[#F9F9F9] rounded-full text-[#B3B3B3] py-4 ps-5 border-[1px] border-[#00000005] focus:outline-none ${className}`}
            disabled={isLoading || disabled}
            ref={ref}
            onFocus={() => setIsFocused(true)}
          />
        ) :(
          <div className="rounded-full !bg-[#F9F9F9] border-[1px] border-[#00000005]   focus:outline-none  flex">
            <input
              type={showPassword ? "text" : "password"}
              className={` py-4 rounded-full text-[#B3B3B3] !bg-[#F9F9F9]  px-5 focus:outline-none ${className}`}
              id="password"
              name={name}
              value={value}
              placeholder={placeholder}
              autoComplete="new-password"
              onChange={onChange}
            />
            {/* <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700 px-2"
            >
              <i
                className={`fa-duotone ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } text-primary`}
              />
            </Button> */}
          </div>
        )}
      </label>
    </div>
  );
};

export default InputField;
