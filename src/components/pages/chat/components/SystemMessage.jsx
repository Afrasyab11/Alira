import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin, FaBrain } from "react-icons/fa";
import { FaEarthEurope } from "react-icons/fa6";
import ImageCarousel from "./ImageCarousel";

const SystemMessage = ({ content, hashtags, images, platform, type }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-2 mb-4 w-full max-w-lg">
      <div className="flex shrink-0 h-[40px] text-center w-[40px] items-center justify-center bg-zinc-200/80 text-black dark:text-white rounded-full dark:bg-[#252728]">
        {platform === "instagram" ? (
          <FaInstagram className="text-2xl text-[#d62976]" />
        ) : platform === "facebook" ? (
          <FaFacebook className="text-2xl text-blue" />
        ) : platform === "linkedin" ? (
          <FaLinkedin className="text-2xl text-[#0e76a8]" />
        ) : (
          <FaBrain className="text-xl" />
        )}
      </div>
      <div className="flex-1 min-w-0 rounded-2xl px-4 py-3 text-base text-black bg-[#F2F2F2] dark:bg-[#252728] dark:text-white rounded-br-lg rounded-tr-lg rounded-bl-lg">
        {platform === "instagram" ? (
          <InstagramHeader />
        ) : platform === "facebook" ? (
          <FacebookHeader />
        ) : platform === "linkedin" ? (
          <LinkedInHeader />
        ) : null}
        <p className="break-words whitespace-pre-wrap">{content}</p>
        {hashtags && type === "post" && (
          <div className="flex flex-wrap gap-2 mt-4">
            {hashtags.map((hashtag, index) => (
              <span
                key={index}
                style={{
                  color:
                    platform === "instagram"
                      ? "#d62976"
                      : platform === "facebook"
                      ? "#0071E3"
                      : "#0e76a8",
                }}
                className="text-sm rounded-full bg-zinc-200/70 dark:bg-[#171717] dark:text-white px-2 py-1"
              >
                {hashtag}
              </span>
            ))}
          </div>
        )}

        {type === "post" && <ImageCarousel images={images} />}
      </div>
    </div>
  );
};

export default SystemMessage;

const FacebookHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-shrink-0 w-[40px] h-[40px] overflow-hidden rounded-full">
        <img
          src="/images/dp.png"
          alt="dp"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200 truncate">
          John Doe
        </p>
        <div className="flex items-center text-zinc-500 dark:text-zinc-400 gap-2">
          <p className="text-xs">1h . </p>
          <FaEarthEurope className="text-xs" />
        </div>
      </div>
    </div>
  );
};

const InstagramHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-shrink-0 w-[30px] h-[30px] overflow-hidden rounded-full border-2 border-zinc-200">
        <img
          src="/images/dp.png"
          alt="dp"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200 truncate">
          John Doe
        </p>
      </div>
      <div className="flex items-center text-zinc-500 dark:text-zinc-400 gap-2">
        <p className="text-sm">1h </p>
      </div>
    </div>
  );
};

const LinkedInHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-shrink-0 w-[40px] h-[40px] overflow-hidden rounded-full border-2 border-zinc-200">
        <img
          src="/images/dp.png"
          alt="dp"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200 truncate">
          John Doe
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
          Full Stack Developer | 1000 followers
        </p>
        <div className="flex items-center text-zinc-500 dark:text-zinc-400 gap-2">
          <p className="text-xs">1h . </p>
          <FaEarthEurope className="text-xs" />
        </div>
      </div>
    </div>
  );
};
