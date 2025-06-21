import React, { useState, useEffect, Fragment } from "react";
import { FaFacebook, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { Listbox, Transition } from "@headlessui/react";
import { supabase } from "../../../../lib/supabase";

const ScheduleModal = ({ isOpen, onClose, content, images }) => {
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
        const response = await fetch(
          `${backendUrl}/api/integrations/facebook/pages/${session.user.id}`,
          {
            method: "GET", // Assuming it's a GET request now
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch pages.");

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
  }, [isOpen]);

  const handleSchedulePost = async () => {
    if (!scheduledTime || !selectedPage) return;

    setIsScheduling(true);
    setError("");
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const apiEndpoint = `${
        import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
      }/schedule-facebook-post`;

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          content: content,
          images: images || [],
          scheduledTime,
          pageId: selectedPage.page_id,
          userId: session.user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true); // Show success state instead of closing immediately
      } else {
        throw new Error(data.message || "Failed to schedule post.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsScheduling(false);
    }
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
              Post Scheduled Successfully!
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Your post has been scheduled for{" "}
              {new Date(scheduledTime).toLocaleString()}
            </p>

            {/* Facebook Business Link */}
            <div className="bg-blue-50 dark:bg-blue/5 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <FaFacebook className="text-blue-600 dark:text-blue text-xl" />
                <h4 className="font-semibold text-blue dark:text-blue">
                  View Scheduled Posts
                </h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-zinc-100 mb-3">
                Manage and view all your scheduled posts on Facebook Business
              </p>
              <a
                href="https://business.facebook.com/latest/posts/scheduled_posts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Open Facebook Business
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
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            Schedule Post
          </h3>
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
              Select Facebook Page
            </label>
            {loadingPages ? (
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
            ) : (
              <Listbox value={selectedPage} onChange={setSelectedPage}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-zinc-100 dark:bg-zinc-700 py-3 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    {selectedPage ? (
                      <span className="flex items-center gap-3">
                        <img
                          src={selectedPage.picture_url}
                          alt="dp"
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="block truncate font-medium text-zinc-900 dark:text-white">
                          {selectedPage.name}
                        </span>
                      </span>
                    ) : (
                      <span className="text-zinc-500 dark:text-zinc-400">
                        No pages found
                      </span>
                    )}
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <FaFacebook
                        className="h-5 w-5 text-zinc-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {pages.map((page) => (
                        <Listbox.Option
                          key={page.page_id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-blue text-blue dark:bg-blue/50 dark:text-white"
                                : "text-zinc-900 dark:text-zinc-200"
                            }`
                          }
                          value={page}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {page.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
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
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:cursor-not-allowed transition-colors"
          >
            {isScheduling ? "Scheduling..." : "Confirm Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
