"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { Icons } from "@/assets/Icons";
import Image from "next/image";

export default function ChatInterface() {
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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


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

    setTimeout(() => {
      const newAssistantMessage = {
        content: "How are you?",
        sender: "assistant",
      };

      setMessages((prev) => [...prev, newAssistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pt-24 dark:bg-[#1D1D1F]">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-10"
      >
        {messages.length === 1 && (
          <div className="flex justify-center">
            <h2 className="sm:text-md md:text-3xl text-black dark:text-white font-semibold mb-4">
              👋 Hey John, how can I help you?
            </h2>
          </div>
        )}

        <div className="w-full hidden md:block">
          {messages.length === 1 && (
            <div className="flex flex-wrap md:justify-center gap-2 my-6">
              <button
                className="bg-white text-blue dark:bg-[#151515] dark:text-white px-6 py-8 shadow-chat-button-shadow rounded-xl"
                onClick={() => {
                  setInputValue("Generate a contract for me");
                  handleSendMessage();
                }}
              >
                Generate Contract
              </button>
              <button
                className="bg-white text-blue dark:bg-[#151515] dark:text-white px-6 py-8 shadow-chat-button-shadow rounded-xl"
                onClick={() => {
                  setInputValue("Show me market trends");
                  handleSendMessage();
                }}
              >
                Market Trends
              </button>
              <button
                className="bg-white text-blue dark:bg-[#151515] dark:text-white px-6 py-8 shadow-chat-button-shadow rounded-xl"
                onClick={() => {
                  setInputValue("I want to schedule a viewing");
                  handleSendMessage();
                }}
              >
                Schedule Viewing
              </button>
            </div>
          )}
        </div>
        <div
          ref={chatContainerRef}
          id="chatContainer"
          className="flex flex-col h-[34vh] overflow-y-scroll scrollbar-hide sm:px-2 md:px-40"
        >
          {messages?.map((message) => (
            <div
              key={message?.id}
              className={`flex ${
                message.sender === "user"
                  ? "justify-end items-start"
                  : "justify-start items-end"
              }`}
            >
              <div
                className={`sm:w-max-w-[80%] md:max-w-[50%] rounded-2xl px-4 py-2 text-3xl mb-4 ${
                  message?.sender === "user"
                    ? "justify-end py-2 text-base bg-[#454545] text-white rounded-tl-full rounded-br-full rounded-bl-full"
                    : "justify-start py-2 text-black bg-[#F2F2F2] text-base rounded-br-full rounded-tr-full rounded-bl-full"
                }`}
              >
                <p>{message?.content}</p>
              </div>
            </div>
          ))}

          {/* Empty div to ensure scrolling works */}
          <div ref={messagesEndRef} />
        </div>
        {isLoading && (
          <div className="flex justify-start px-40">
            <div className="bg-white dark:bg-transparent rounded-2xl px-4 py-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-dark dark:bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-dark dark:bg-white rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-dark dark:bg-white rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-2 flex justify-center w-full gap-x-3 sm:px-2 md:px-40">
        <div className="flex items-center gap-x-3 w-full rounded-full px-4">
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
      <p className="dark:text-white text-dark text-center text-sm sm:px-6 md:px-0">Alira can make mistakes. Please verify important information.</p>
    </div>
  );
}