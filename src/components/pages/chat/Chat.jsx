import React, { useState, useRef, useEffect } from "react";
import { FiLoader, FiMenu } from "react-icons/fi";
import { Icons } from "../../../assets/Icons";
import { Image } from "../../../common/image/Image";
import Platforms from "./components/Platforms";
import UserMessage from "./components/UserMessage";
import SystemMessage from "./components/SystemMessage";
import Sidebar from "./components/Sidebar";

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

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

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
      const lastMessages = messages.slice(-10).map((msg) => ({
        content: msg.content,
        sender: msg.sender,
        type: msg.type || "message",
        platform: msg.platform || "",
        hashtags: msg.hashtags || [],
      }));

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
      const lastMessages = messages.slice(-10).map((msg) => ({
        content: msg.content,
        sender: msg.sender,
        type: msg.type || "message",
        platform: msg.platform || "",
        hashtags: msg.hashtags || [],
      }));

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
            selectedImages.length > 0 ? selectedImages : data.images || [],
        };
        setMessages((prev) => [...prev, postMessage]);
        setSelectedImages([]); // Clear selected images after successful post
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

  return (
    <div className="flex relative flex-col   min-h-screen dark:bg-[#1D1D1F]">
      {isClient && (
        <div className="flex w-full max-w-5xl md:ml-20 min-h-screen bg-white dark:bg-[#1D1D1F]">
          <div className="flex-1 flex flex-col relative">
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto py-5 px-5 bg-zinc-50 dark:bg-[#171717] w-full rounded-xl mb-20"
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

            <div className="fixed bottom-0 mx-auto sm:mx-0 sm:left-[70px + 80px] z-[100] py-2 flex rounded-t-3xl border-t border-zinc-50 dark:border-t-zinc-700 px-4 pb-5 bg-zinc-100 dark:bg-[#1D1D1F] justify-center w-full max-w-5xl mx-auto">
              <div className="flex items-center gap-x-3 w-full rounded-full">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <FiMenu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
                <Platforms
                  selectedPlatform={selectedPlatform}
                  onPlatformChange={handlePlatformChange}
                />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Anything"
                  className="flex-1 rounded-full bg-white text-black py-3 px-4 border-[1px] border-[#E2E8F0] dark:text-white dark:bg-[#171717] dark:border-[1px] dark:border-[#444649] focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === "" || isLoading}
                  className={`p-3 bg-blue cursor-pointer rounded-full ${
                    inputValue.trim() === "" || isLoading
                      ? "text-gray-500"
                      : "text-blue-500 hover:bg-blue-500 hover:text-white"
                  } transition-colors`}
                >
                  {isLoading ? (
                    <FiLoader className="h-5 w-5 text-white animate-spin" />
                  ) : (
                    <Image src={Icons?.send} alt="send" className="h-7 w-7" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {isSidebarOpen && (
            <Sidebar
              onImageSelect={handleImageSelect}
              selectedImages={selectedImages}
            />
          )}
        </div>
      )}
    </div>
  );
}
