import React, { useState, useRef, useEffect } from "react";
import { FiLoader, FiMenu, FiUpload } from "react-icons/fi";
import { Icons } from "../../../assets/Icons";
import { Image } from "../../../common/image/Image";
import Platforms from "./components/Platforms";
import UserMessage from "./components/UserMessage";
import SystemMessage from "./components/SystemMessage";
import Sidebar from "./components/Sidebar";
import { FaArrowUp, FaPaperclip } from "react-icons/fa";
import { supabase } from "../../../lib/supabase";

export default function ChatInterface() {
  const [isClient, setIsClient] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: " 👋 Hey John, how can I help you?",
      sender: "assistant",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounter = useRef(0);
  const [uploadedImages, setUploadedImages] = useState([]);

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedImages");
    if (saved) setSelectedImages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
  }, [selectedImages]);

  const handleImageSelect = (image) => {
    setSelectedImages((prev) => {
      if (prev.includes(image.preview)) {
        return prev.filter((id) => id !== image.preview);
      }
      return [...prev, image.preview];
    });
  };

  const handlePlatformChange = async (prompt) => {
    try {
      // Get the last 10 messages for context

      console.log("prompt", prompt);
      const lastMessages = messages.slice(-10).map((msg) => {
        // Flatten all images for this message
        let imagesString = "";
        if (msg.images && msg.images.length > 0) {
          imagesString = `\n\nBelow are the images used for context: ${msg.images.join(
            ", "
          )}`;
        }
        return {
          content: msg.content + imagesString,
          images: msg.images || [],
          sender: msg.sender,
          type: msg.type || "message",
          platform: msg.platform || "",
          hashtags: msg.hashtags || [],
        };
      });

      const apiEndpoint =
        process.env.NODE_ENV === "production"
          ? "https://alira-server.vercel.app/generate-post"
          : "http://localhost:8080/generate-post";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          context: lastMessages,
          images: selectedImages,
          isRepurposing: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate post");
      }

      const data = await response.json();

      if (data.status === "success") {
        console.log(data);
        return {
          content: data.caption,
          hashtags: data.hashtags,
          platform: data.type === "post" ? data.platform : "",
          type: data.type,
          images:
            selectedImages.length > 0 ? selectedImages : data.images || [],
        };
      } else {
        throw new Error("Failed to generate post");
      }
    } catch (error) {
      console.error("Error generating post:", error);
      throw error;
    }
  };

  const generatePost = async () => {
    try {
      const lastMessages = messages.slice(-10).map((msg) => {
        // Flatten all images for this message
        let imagesString = "";
        if (msg.images && msg.images.length > 0) {
          imagesString = `\n\nBelow are the images used for context: ${msg.images.join(
            ", "
          )}`;
        }
        return {
          content: msg.content + imagesString,
          images: msg.images || [],
          sender: msg.sender,
          type: msg.type || "message",
          platform: msg.platform || "",
          hashtags: msg.hashtags || [],
        };
      });

      const apiEndpoint =
        process.env.NODE_ENV === "production"
          ? "https://alira-server.vercel.app/generate-post"
          : "http://localhost:8080/generate-post";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputValue,
          context: lastMessages,
          images: selectedImages,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        if (data.platform) {
          setSelectedPlatform(data.platform);
        }

        const postMessage = {
          id: Date.now().toString(),
          content: data.caption,
          sender: "assistant",
          hashtags: data.hashtags,
          platform: data.type === "post" ? data.platform : "",
          type: data.type,
          images:
            selectedImages.length > 0
              ? selectedImages
              : Array.isArray(data.images)
              ? data.images
              : [],
        };
        setMessages((prev) => [...prev, postMessage]);
      } else {
        throw new Error("Failed to generate post");
      }
    } catch (error) {
      console.error("Error generating post:", error);
      const errorMessage = {
        id: Date.now().toString(),
        content:
          "Sorry, I couldn't generate a post at this time. Please try again.",
        sender: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    // Generate post without passing platform
    generatePost();
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEditMessage = (messageId, newContent) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              content: newContent.content,
              hashtags: newContent.hashtags,
            }
          : message
      )
    );
  };

  const replaceMessage = (messageId, newContent) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              content: newContent.content,
              hashtags: newContent.hashtags,
              platform: newContent.platform,
              type: newContent.type,
              images: newContent.images,
            }
          : msg
      )
    );
  };

  // Auto-expand textarea
  const handleTextareaChange = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 80) + "px";
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 80) + "px";
    }
  }, [inputValue]);

  // Helper: create slug
  const createSlug = (filename) => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const slug = nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const randomNum = Math.floor(Math.random() * 10000);
    return `${slug}-${randomNum}`;
  };

  // Helper: upload to Supabase
  const uploadToSupabase = async (file, userId) => {
    const fileExt = file.name.split(".").pop();
    const slug = createSlug(file.name);
    const fileName = `${slug}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;
    const { data, error } = await supabase.storage
      .from("alira")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from("alira").getPublicUrl(filePath);
    return {
      id: slug,
      preview: publicUrl,
      path: filePath,
      isUploading: false,
    };
  };

  // Helper: fetch all images for the user
  const fetchUploadedImages = async (userId) => {
    const { data: files, error } = await supabase.storage
      .from("alira")
      .list(userId);
    if (error) return [];
    return await Promise.all(
      files.map(async (file) => {
        const {
          data: { publicUrl },
        } = supabase.storage
          .from("alira")
          .getPublicUrl(`${userId}/${file.name}`);
        return {
          id: file.name.split(".")[0],
          preview: publicUrl,
          path: `${userId}/${file.name}`,
          isUploading: false,
        };
      })
    );
  };

  // On mount, load images if logged in
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const images = await fetchUploadedImages(session.user.id);
        setUploadedImages(images);
      }
    })();
  }, []);

  // Handle file drop on chat area
  const handleChatDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length > 0) {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;
      for (const file of files) {
        // Generate a tempId for this upload
        const tempId = Math.random().toString(36).substr(2, 9);
        const previewUrl = URL.createObjectURL(file);
        // Add spinner thumbnail immediately
        setUploadedImages((prev) => [
          ...prev,
          { id: tempId, preview: previewUrl, path: null, isUploading: true },
        ]);
        setSelectedImages((prev) => [...prev, previewUrl]);
        try {
          const uploadedImage = await uploadToSupabase(file, session.user.id);
          // After upload, refresh the list from Supabase
          const images = await fetchUploadedImages(session.user.id);
          setUploadedImages(images);
          // Replace the temp preview in selectedImages with the real uploaded preview
          setSelectedImages((prev) =>
            prev.map((img) =>
              img === previewUrl ? uploadedImage.preview : img
            )
          );
        } catch (err) {
          setUploadedImages((prev) =>
            prev.filter((img) => img.preview !== previewUrl)
          );
          setSelectedImages((prev) => prev.filter((img) => img !== previewUrl));
        }
        URL.revokeObjectURL(previewUrl);
      }
      // if (!isSidebarOpen) setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    // Use window-level drag events for stability
    const handleDragEnter = (e) => {
      if (e.dataTransfer && e.dataTransfer.types.includes("Files")) {
        dragCounter.current += 1;
        setIsDragOver(true);
      }
    };
    const handleDragLeave = (e) => {
      if (e.dataTransfer && e.dataTransfer.types.includes("Files")) {
        dragCounter.current -= 1;
        if (dragCounter.current <= 0) {
          setIsDragOver(false);
        }
      }
    };
    const handleDragOver = (e) => {
      e.preventDefault(); // Prevent browser from opening file
    };
    const handleDrop = (e) => {
      e.preventDefault(); // Prevent browser from opening file
      dragCounter.current = 0;
      setIsDragOver(false);
      handleChatDrop(e);
    };
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex relative flex-col items-center justify-center   min-h-screen dark:bg-[#1D1D1F]">
      {isDragOver && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-md bg-black/30 pointer-events-none">
          <div className="flex flex-col items-center justify-center bg-white/80 dark:bg-[#171717]/80 rounded-2xl p-10 shadow-2xl border border-gray-200 dark:border-gray-700 pointer-events-auto">
            <FiUpload className="text-5xl text-blue-500 mb-4" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              Drop it here
            </span>
          </div>
        </div>
      )}
      {isClient && (
        <div className="flex w-full max-w-5xl min-h-screen bg-white dark:bg-[#1D1D1F]">
          <div className="flex-1 flex flex-col relative">
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto py-20 px-5  w-full rounded-xl mb-32"
            >
              {messages.length === 1 && (
                <div className="flex justify-center">
                  <h2 className="sm:text-md md:text-3xl text-black dark:text-white font-semibold mb-4">
                    👋 Hey John, how can I help you?
                  </h2>
                </div>
              )}

              <div
                ref={chatContainerRef}
                id="chatContainer"
                className="flex flex-col space-y-4 sm:px-2"
              >
                {messages?.map((message) =>
                  message.sender === "user" ? (
                    <UserMessage key={message.id} content={message.content} />
                  ) : (
                    <SystemMessage
                      key={message.id}
                      id={message.id}
                      content={message.content}
                      hashtags={message.hashtags}
                      images={message.images}
                      platform={message.platform}
                      type={message.type}
                      onEdit={(newContent) =>
                        handleEditMessage(message.id, newContent)
                      }
                      onPlatformChange={handlePlatformChange}
                      onReplaceMessage={replaceMessage}
                      user={{
                        name: "John Doe",
                        profilePicture: "/images/dp.png",
                      }}
                    />
                  )
                )}

                <div ref={messagesEndRef} />
              </div>
              {isLoading && (
                <div className="flex justify-start px-40">
                  <div className="bg-white dark:bg-transparent rounded-2xl px-4 py-3 max-w-full">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-dark dark:bg-white rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-dark dark:bg-white rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-dark dark:bg-white rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="fixed bottom-0 mx-auto  z-[10] p-2 pb-5 flex rounded-t-4xl    justify-center w-full max-w-5xl ">
              <div className="flex flex-col gap-x-3 w-full rounded-3xl min-h-[100px] px-4 py-3 bg-white/60 dark:bg-[#171717]/60  text-black  border-[1px] border-[#E2E8F0] backdrop-blur-md dark:text-white dark:border-[1px] dark:border-[#444649]">
                <div>
                  {/* I need the thumbnails for selected images here */}
                  {selectedImages.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {selectedImages.map((img, idx) => {
                        const uploaded = uploadedImages.find(
                          (u) => u.preview === img
                        );
                        return (
                          <div
                            key={img}
                            className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
                          >
                            {uploaded && uploaded.isUploading ? (
                              <FiLoader className="animate-spin text-blue-500 w-6 h-6" />
                            ) : (
                              <img
                                src={img}
                                alt="preview"
                                className="w-full h-full object-cover"
                              />
                            )}
                            <button
                              className="absolute top-0 right-0 bg-black/60 text-white rounded-full p-1 m-1 hover:bg-red-600 transition-colors"
                              onClick={() =>
                                setSelectedImages((prev) =>
                                  prev.filter((i) => i !== img)
                                )
                              }
                              tabIndex={-1}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 8.586l3.536-3.535a1 1 0 111.415 1.415L11.414 10l3.535 3.536a1 1 0 01-1.415 1.415L10 11.414l-3.536 3.535a1 1 0 01-1.415-1.415L8.586 10l-3.535-3.536a1 1 0 011.415-1.415L10 8.586z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Anything"
                  className="flex-1 resize-none bg-transparent text-black dark:text-white  focus:outline-none outline-none ring-0 focus:ring-0 rounded-xl border-none max-h-[80px] overflow-y-auto transition-all"
                  style={{ minHeight: 40, maxHeight: 80 }}
                />
                <div className="flex gap-x-3 items-center w-full justify-end mt-2">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="size-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <FaPaperclip className="size-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  {inputValue.trim() !== "" && (
                    <button
                      onClick={handleSendMessage}
                      disabled={inputValue.trim() === "" || isLoading}
                      className={`flex items-center justify-center size-8 bg-black cursor-pointer rounded-full ${
                        inputValue.trim() === "" || isLoading
                          ? "text-gray-500"
                          : "text-blue-500 hover:bg-blue-500 hover:text-white"
                      } transition-colors`}
                    >
                      {isLoading ? (
                        <FiLoader className="size-5 text-white animate-spin" />
                      ) : (
                        <FaArrowUp className="size-5 text-white font-normal" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isSidebarOpen && (
            <Sidebar
              onImageSelect={handleImageSelect}
              selectedImages={selectedImages}
              uploadedImages={uploadedImages}
              onClose={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
