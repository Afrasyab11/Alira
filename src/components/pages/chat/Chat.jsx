import React, { useState, useRef, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { Icons } from "../../../assets/Icons";
import { Image } from "../../../common/image/Image";
import Platforms from "./components/Platforms";
import UserMessage from "./components/UserMessage";
import SystemMessage from "./components/SystemMessage";

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

  const generatePost = async (platform) => {
    try {
      const response = await fetch(
        "https://alira-server.vercel.app/generate-post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            platform,
            prompt: inputValue,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        const postMessage = {
          id: Date.now().toString(),
          content: data.caption,
          sender: "assistant",
          hashtags: data.hashtags,
          platform: data.type === "post" ? data.platform : "",
          type: data.type,
          images: [
            "/images/es1.avif",
            "/images/es2.avif",
            "/images/es3.avif",
            "/images/es4.avif",
          ],
        };
        console.log(postMessage);
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

    // Generate post based on selected platform
    generatePost(selectedPlatform);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  return (
    <div className="flex relative flex-col items-center justify-center bg-white min-h-screen dark:bg-[#1D1D1F]">
      {isClient && (
        <div className="flex flex-col w-full max-w-5xl min-xh-screen bg-white py-10 dark:bg-[#1D1D1F] flex flex-col items-center justify-center">
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto min-h-[80vh] mb-16 py-5 px-5 bg-zinc-50 dark:bg-[#171717] w-full rounded-xl"
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
              className="flex flex-col h-full overflow-y-scroll scrollbar-hide sm:px-2 "
            >
              {messages?.map((message) =>
                message.sender === "user" ? (
                  <UserMessage key={message.id} content={message.content} />
                ) : (
                  <SystemMessage
                    key={message.id}
                    content={message.content}
                    hashtags={message.hashtags}
                    images={message.images}
                    platform={message.platform}
                    type={message.type}
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

          <div className="py-2 flex rounded-t-3xl border-t border-zinc-50 dark:border-t-zinc-700 px-4 fixed bottom-0 pb-5 max-w-5xl z-[200] bg-zinc-100 dark:bg-[#1D1D1F]  justify-center w-full  w-full ">
            <div className="flex items-center gap-x-3 w-full rounded-full ">
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
      )}
    </div>
  );
}
