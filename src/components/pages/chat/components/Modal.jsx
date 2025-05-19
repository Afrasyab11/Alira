import React from "react";
import { FiX } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaLinkedin, FaBrain } from "react-icons/fa";
import { FaEarthEurope } from "react-icons/fa6";
import ImageCarousel from "./ImageCarousel";

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    className="text-2xl"
  >
    <radialGradient
      id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
      cx="19.38"
      cy="42.035"
      r="44.899"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#fd5" />
      <stop offset=".328" stopColor="#ff543f" />
      <stop offset=".348" stopColor="#fc5245" />
      <stop offset=".504" stopColor="#e64771" />
      <stop offset=".643" stopColor="#d53e91" />
      <stop offset=".761" stopColor="#cc39a4" />
      <stop offset=".841" stopColor="#c837ab" />
    </radialGradient>
    <path
      fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
    />
    <radialGradient
      id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
      cx="11.786"
      cy="5.54"
      r="29.813"
      gradientTransform="matrix(1 0 0 .6663 0 1.849)"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#4168c9" />
      <stop offset=".999" stopColor="#4168c9" stopOpacity="0" />
    </radialGradient>
    <path
      fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
    />
    <path
      fill="#fff"
      d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
    />
    <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
    <path
      fill="#fff"
      d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    className="text-2xl"
  >
    <path
      fill="#0288D1"
      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
    />
    <path
      fill="#FFF"
      d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
    />
  </svg>
);

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  platform,
  content,
  hashtags,
  images,
}) => {
  if (!isOpen) return null;

  const getPlatformColor = () => {
    switch (platform) {
      case "instagram":
        return "bg-gradient-to-r from-[#0071E3] via-[#d62976] via-[#962fbf] to-[#fa7e1e]";
      case "facebook":
        return "bg-blue";
      case "linkedin":
        return "bg-[#0e76a8]";
      default:
        return "bg-black";
    }
  };

  const renderPlatformHeader = () => {
    switch (platform) {
      case "instagram":
        return <InstagramHeader />;
      case "facebook":
        return <FacebookHeader />;
      case "linkedin":
        return <LinkedInHeader />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white dark:bg-[#1D1D1F] rounded-2xl w-full max-w-lg mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="flex shrink-0 h-8 text-center w-8 items-center justify-center bg-zinc-200/80 text-black dark:text-white rounded-full dark:bg-[#252728]">
              {platform === "instagram" ? (
                <InstagramIcon />
              ) : platform === "facebook" ? (
                <FaFacebook className="text-xl text-blue" />
              ) : platform === "linkedin" ? (
                <LinkedInIcon />
              ) : (
                <FaBrain className="text-lg" />
              )}
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="bg-[#F2F2F2] dark:bg-[#252728] rounded-xl p-3 mb-3">
            {renderPlatformHeader()}
            <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap mb-3">
              {content}
            </p>
            {hashtags && hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="text-xs rounded-full px-2 py-0.5 bg-zinc-200/70 dark:bg-[#171717] dark:text-white"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            )}
            {images && images.length > 0 && (
              <div className="mt-3">
                <ImageCarousel images={images} />
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const FacebookHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex-shrink-0 w-8 h-8 overflow-hidden rounded-full">
        <img
          src="/images/dp.png"
          alt="dp"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200 truncate">
          John Doe
        </p>
        <div className="flex items-center text-zinc-500 dark:text-zinc-400 gap-1">
          <p className="text-[10px]">1h . </p>
          <FaEarthEurope className="text-[10px]" />
        </div>
      </div>
    </div>
  );
};

const InstagramHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex-shrink-0 w-7 h-7 overflow-hidden rounded-full border-2 border-zinc-200">
        <img
          src="/images/dp.png"
          alt="dp"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200 truncate">
          John Doe
        </p>
      </div>
      <div className="flex items-center text-zinc-500 dark:text-zinc-400 gap-1">
        <p className="text-xs">1h </p>
      </div>
    </div>
  );
};

const LinkedInHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex-shrink-0 w-8 h-8 overflow-hidden rounded-full border-2 border-zinc-200">
        <img
          src="/images/dp.png"
          alt="dp"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200 truncate">
          John Doe
        </p>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
          Full Stack Developer | 1000 followers
        </p>
        <div className="flex items-center text-zinc-500 dark:text-zinc-400 gap-1">
          <p className="text-[10px]">1h . </p>
          <FaEarthEurope className="text-[10px]" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
