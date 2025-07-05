/* eslint-disable react/prop-types */
import { useState, useEffect, Fragment } from "react";
import { FaFacebook, FaRegCalendarAlt } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { Listbox, Transition } from "@headlessui/react";
import { supabase } from "../../../../lib/supabase";

const ScheduleModal = ({
  isOpen,
  onClose,
  content,
  images,
  platform = "facebook",
}) => {
  const [scheduledTime, setScheduledTime] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loadingPages, setLoadingPages] = useState(true);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset states when modal closes
      setIsSuccess(false);
      setScheduledTime("");
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchPages = async () => {
      setLoadingPages(true);
      setError("");
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error("Not authenticated");

        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

        let endpoint;
        if (platform === "instagram") {
          endpoint = `${backendUrl}/api/integrations/instagram/accounts/${session.user.id}`;
        } else if (platform === "linkedin") {
          endpoint = `${backendUrl}/api/integrations/linkedin/accounts/${session.user.id}`;
        } else {
          endpoint = `${backendUrl}/api/integrations/facebook/pages/${session.user.id}`;
        }

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          const platformText =
            platform === "instagram"
              ? "accounts"
              : platform === "linkedin"
              ? "accounts"
              : "pages";
          throw new Error(`Failed to fetch ${platform} ${platformText}.`);
        }

        const data = await response.json();
        setPages(data);
        if (data.length > 0) {
          setSelectedPage(data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingPages(false);
      }
    };

    fetchPages();
  }, [isOpen, platform]);

  const handleSchedulePost = async () => {
    if (!scheduledTime || !selectedPage) return;

    setIsScheduling(true);
    setError("");
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      // Format the scheduled time properly for backend
      const scheduledDate = new Date(scheduledTime);
      const formattedScheduledTime = scheduledDate.toISOString();

      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
      let apiEndpoint;
      if (platform === "instagram") {
        apiEndpoint = `${backendUrl}/schedule-instagram-post`;
      } else if (platform === "linkedin") {
        apiEndpoint = `${backendUrl}/schedule-linkedin-post`;
      } else {
        apiEndpoint = `${backendUrl}/schedule-facebook-post`;
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          content: content,
          images: images || [],
          scheduledTime: formattedScheduledTime,
          pageId: selectedPage.page_id || selectedPage.id,
          accountId: selectedPage.id,
          userId: session.user.id,
          platform: platform,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error(data.message || `Failed to schedule ${platform} post.`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsScheduling(false);
    }
  };

  const getPlatformIcon = () => {
    if (platform === "instagram") {
      return (
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
    }
    if (platform === "linkedin") {
      return (
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
    }
    return <FaFacebook className="text-xl" />;
  };

  const getPlatformName = () => {
    if (platform === "instagram") return "Instagram";
    if (platform === "linkedin") return "LinkedIn";
    return "Facebook";
  };

  const getPlatformBusinessUrl = () => {
    if (platform === "instagram") {
      return "https://business.facebook.com/latest/instagram_accounts";
    }
    if (platform === "linkedin") {
      return "https://www.linkedin.com/my-items/saved-posts/";
    }
    return "https://business.facebook.com/latest/posts/scheduled_posts";
  };

  const renderProfileImage = (page) => {
    const imageUrl = page.picture_url || page.profile_picture_url;

    if (!imageUrl) {
      return (
        <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
          {getPlatformIcon()}
        </div>
      );
    }

    return (
      <img
        src={imageUrl}
        alt="profile"
        className="w-6 h-6 rounded-full"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
    );
  };

  const getDisplayName = (page) => {
    if (platform === "linkedin") {
      return `${page.first_name} ${page.last_name}`;
    }
    return page.name || page.username;
  };

  if (!isOpen) return null;

  // Success state
  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 font-sans p-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          <div className="p-6 text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <svg
                className="h-8 w-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Success Message */}
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              {getPlatformName()} Post Scheduled Successfully!
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Your post has been scheduled for{" "}
              {new Date(scheduledTime).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>

            {/* Platform Business Link */}
            <div className="bg-blue-50 dark:bg-blue/5 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                {getPlatformIcon()}
                <h4 className="font-semibold text-blue dark:text-blue">
                  View Scheduled Posts
                </h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-zinc-100 mb-3">
                Manage and view all your scheduled posts on {getPlatformName()}{" "}
                Business
              </p>
              <a
                href={getPlatformBusinessUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Open {getPlatformName()} Business
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setScheduledTime("");
                  setSelectedPage(pages[0] || null);
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                Schedule Another
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 font-sans p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex shrink-0 h-8 text-center w-8 items-center justify-center bg-zinc-200/80 text-black dark:text-white rounded-full dark:bg-[#252728]">
              {getPlatformIcon()}
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Schedule {getPlatformName()} Post
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <FiX className="text-zinc-500 dark:text-zinc-400" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">
              Select {getPlatformName()}{" "}
              {platform === "instagram" || platform === "linkedin"
                ? "Account"
                : "Page"}
            </label>
            {loadingPages ? (
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
            ) : (
              <Listbox value={selectedPage} onChange={setSelectedPage}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-zinc-100 dark:bg-zinc-700 py-3 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    {selectedPage ? (
                      <span className="flex items-center gap-3">
                        {renderProfileImage(selectedPage)}
                        {/* {renderProfileImageFallback(selectedPage)} */}
                        <span className="block truncate font-medium text-zinc-900 dark:text-white">
                          {getDisplayName(selectedPage)}
                        </span>
                      </span>
                    ) : (
                      <span className="text-zinc-500 dark:text-zinc-400">
                        No {platform === "instagram" ? "accounts" : "pages"}{" "}
                        found
                      </span>
                    )}
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {getPlatformIcon()}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-[60]">
                      {pages.map((page) => (
                        <Listbox.Option
                          key={page.page_id || page.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100"
                                : "text-zinc-900 dark:text-zinc-100"
                            }`
                          }
                          value={page}
                        >
                          {({ selected }) => (
                            <>
                              <span className="flex items-center gap-3">
                                {renderProfileImage(page)}
                                {/* {renderProfileImageFallback(page)} */}
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {getDisplayName(page)}
                                </span>
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                                  <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">
              Date and Time
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full p-3 pl-10 bg-zinc-100 dark:bg-zinc-700 border-transparent rounded-lg focus:ring-2 focus:ring-blue text-zinc-900 dark:text-white"
                min={new Date().toISOString().slice(0, 16)}
              />
              <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSchedulePost}
            disabled={!scheduledTime || !selectedPage || isScheduling}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue rounded-lg hover:bg-blue disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:cursor-not-allowed transition-colors"
          >
            {isScheduling ? "Scheduling..." : "Confirm Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
