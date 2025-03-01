"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/assets/Icons";
import Button from "../Button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const categories = [
    {
      id: 1,
      name: "Core Features",
      link: "#core-section",
    },
    {
      id: 2,
      name: "Pricing Plans",
      link: "#price-section",
    },
    { id: 3, name: "Testimonials", link: "#testimonial-section" },
    { id: 4, name: "Contact Us", link: "#" },
  ];

  return (
    <header className="sticky left-0 right-0 top-0 z-50 bg-white shadow-md">
      <nav className="mx-auto flex h-[72px] items-center justify-between sm:px-3 md:px-10">
        {/* Mobile: Menu Icon on Left */}
        <button onClick={toggleMenu} className="lg:hidden">
          <Image
            src={Icons.menu}
            alt="menu"
            className="h-6 w-6 cursor-pointer"
          />
        </button>

        {/* Logo */}
        <div className="lg:static lg:flex md:items-center sm:ps-0 xl:ps-20">
          <Image
            src={Icons.alira}
            alt="logo"
            className="h-auto w-auto md:h-8 md:w-auto md:ml-0 mx-auto"
          />
        </div>

        {/* Desktop Menu: Centered */}
        <div className="hidden lg:flex items-center gap-x-16 absolute left-1/2 transform -translate-x-1/2">
          {categories.map(
            (item, index) => (
              <Link
                key={index}
                href={item?.link}
                className="text-md text-[#454545] transition hover:text-gray-900"
              >
                {item?.name}
              </Link>
            )
          )}
        </div>

        {/* CTA Button */}
        <div>
          <Link
            href={"/auth/login"}
            className="bg-blue text-white rounded-full px-6 py-2  md:block"
          >
            Try Free
          </Link>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute left-4 top-4 text-gray-600"
        >
          <Image
            src={Icons.close}
            alt="close"
            className="h-6 w-6 cursor-pointer"
          />
        </button>

        <div className="mt-20 flex flex-col gap-4 px-6">
          {/* {["Core Features", "Pricing Plans", "Testimonials", "Contact Us"].map(
            (item, index) => (
              <Link
                key={index}
                href={`#`}
                className="text-gray-800 text-md font-medium transition hover:text-gray-600"
                onClick={toggleMenu}
              >
                {item}
              </Link>
            )
          )} */}
          {categories.map(
            (item, index) => (
              <Link
                key={index}
                href={item?.link}
                className="text-md text-[#454545] transition hover:text-gray-900"
                onClick={toggleMenu}
              >
                {item?.name}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
