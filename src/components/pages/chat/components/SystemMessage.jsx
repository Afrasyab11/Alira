import React, { useState, useRef, useEffect } from "react";
import { FaInstagram, FaFacebook, FaLinkedin, FaBrain } from "react-icons/fa";
import { FaEarthEurope } from "react-icons/fa6";
import { FiEdit2, FiCheck, FiX, FiMoreVertical } from "react-icons/fi";
import ImageCarousel from "./ImageCarousel";
import Modal from "./Modal";

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

const SystemMessage = ({
  id,
  content,
  hashtags,
  images,
  platform,
  type,
  onEdit,
  onPlatformChange,
  onReplaceMessage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrompt, setNewPrompt] = useState("");
  const [isRepurposing, setIsRepurposing] = useState(false);
  const [repurposedContent, setRepurposedContent] = useState(null);
  const textareaRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extract hashtags from content
  const extractHashtags = (text) => {
    const hashtagRegex = /#[\w-]+/g;
    return text.match(hashtagRegex) || [];
  };

  const handleTextareaChange = (e) => {
    const newContent = e.target.value;
    setEditedContent(newContent);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [editedContent, isEditing]);

  const handleSave = () => {
    const extractedHashtags = extractHashtags(editedContent);
    onEdit({
      content: editedContent,
      hashtags: extractedHashtags,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handlePlatformChange = async () => {
    if (!newPrompt.trim()) return;

    setIsRepurposing(true);
    try {
      const fullPrompt = `Current content: ${content}\n\nRequest: ${newPrompt}`;
      console.log("fullPrompt", fullPrompt);
      const result = await onPlatformChange(fullPrompt);
      console.log("result", result);
      setRepurposedContent(result);
    } catch (error) {
      console.error("Error repurposing content:", error);
    } finally {
      setIsRepurposing(false);
    }
  };

  const handleSaveRepurposed = () => {
    if (repurposedContent) {
      onReplaceMessage(id, {
        ...repurposedContent,
        images: images,
      });
      setIsModalOpen(false);
      setNewPrompt("");
      setRepurposedContent(null);
    }
  };

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

  const getInstagramGradientText = () => {
    return "bg-clip-text text-transparent bg-gradient-to-r from-[#0071E3] via-[#d62976] via-[#962fbf] to-[#fa7e1e]";
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-2 mb-4 w-full max-w-lg relative">
      <div className="flex shrink-0 h-[40px] text-center w-[40px] items-center justify-center bg-zinc-200/80 text-black dark:text-white rounded-full dark:bg-[#252728]">
        {platform === "instagram" ? (
          <InstagramIcon />
        ) : platform === "facebook" ? (
          <FaFacebook className="text-2xl text-blue" />
        ) : platform === "linkedin" ? (
          <LinkedInIcon />
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

        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              ref={textareaRef}
              value={editedContent}
              onChange={handleTextareaChange}
              className="w-full p-2 bg-transparent border-none focus:outline-none focus:ring-0 resize-none overflow-hidden"
              placeholder="Write your post content... Use # for hashtags"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleSave}
                className={`p-2 rounded-full hover:bg-opacity-90 transition-all duration-200 ${getPlatformColor()}`}
              >
                <FiCheck className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all duration-200"
              >
                <FiX className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
              </button>
            </div>
          </div>
        ) : (
          <div className="group">
            {content.length > 400 ? (
              <>
                <p className="break-words whitespace-pre-wrap">
                  {showFullContent ? content : content.slice(0, 200) + "..."}
                </p>
                {!showFullContent && (
                  <button
                    className="text-blue underline text-sm mt-1 ml-1 hover:text-blue-700"
                    onClick={() => setShowFullContent(true)}
                  >
                    Read more
                  </button>
                )}
              </>
            ) : (
              <p className="break-words whitespace-pre-wrap">{content}</p>
            )}
            {type === "post" && (
              <div className="flex items-center gap-2 flex-row absolute top-2 right-2 p-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className={`group-hover:opacity-100 flex items-center justify-center size-8 transition-all duration-200 rounded-full hover:bg-opacity-90 ${getPlatformColor()}`}
                >
                  <FiEdit2 className="w-4 h-4 text-white" />
                </button>
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="size-8 flex items-center justify-center bg-gray-200 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiMoreVertical className="w-4 h-4" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1D1D1F] rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-10">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsModalOpen(true);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Edit Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {hashtags && type === "post" && !isEditing && (
          <div className="flex flex-wrap gap-2 mt-4">
            {hashtags.map((hashtag, index) => (
              <span
                key={index}
                className="text-sm rounded-full px-2 py-1 bg-zinc-200/70 dark:bg-[#171717] dark:text-white"
              >
                {hashtag}
              </span>
            ))}
          </div>
        )}

        {type === "post" && <ImageCarousel images={images} />}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewPrompt("");
          setRepurposedContent(null);
        }}
        title="Edit Post"
        platform={repurposedContent?.platform || platform}
        content={repurposedContent?.content || content}
        hashtags={repurposedContent?.hashtags || hashtags}
        images={images}
      >
        <div className="space-y-4">
          {!repurposedContent ? (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  How would you like to edit the post?
                </label>
                <textarea
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="e.g., Change this to a Facebook post"
                  className="w-full min-h-[100px] p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0071E3] focus:border-transparent resize-none bg-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewPrompt("");
                  }}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlatformChange}
                  disabled={isRepurposing || !newPrompt.trim()}
                  className="px-4 py-2 text-sm text-white bg-[#0071E3] hover:bg-[#0071E3]/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRepurposing ? "Repurposing..." : "Repurpose"}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setRepurposedContent(null);
                    setNewPrompt("");
                  }}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSaveRepurposed}
                  className="px-4 py-2 text-sm text-white bg-[#0071E3] hover:bg-[#0071E3]/90 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
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
