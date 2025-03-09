"use client"
import { Icons } from "@/assets/Icons";
import bg from "./../../../../assets/svg/background.svg";
import Typography from "@/common/Typography";
import Button from "@/common/Button";
import Image from "next/image";
import { motion } from "framer-motion";
export const AIAgent = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
      >
        <div className="pt-36 bg-cover bg-center bg-[url('/background.svg')]">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col justify-center items-center">
              <p className="sm:text-3xl sm:text-white md:text-[#363536] text-center font-medium md:text-4xl">
                Your AI Agent for
              </p>
              <p className="sm:text-3xl sm:text-white md:text-[#363536] text-center font-medium md:text-4xl">
                Australian Real Estate
              </p>
            </div>
            <div className="w-full sm:px-14 md:px-0 text-center">
              <p className="text-md sm:text-white md:text-[#363536]">
                Streamline, automate, and elevate your real estate business with
                cutting-edge AI
              </p>
            </div>
            <div className="w-full flex justify-center mt-3">
              <Button
                label="Get Started Today"
                className="bg-blue py-3 w-auto max-w-48 text-white rounded-full px-6"
              ></Button>
            </div>
            <div className="w-full flex justify-center">
              <Image
                src={Icons?.landingChat}
                alt="chat"
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex justify-center sm:px-16 sm:py-12 md:py-40">
            <div className="max-w-xl">
              <p className="sm:text-lg text-black md:text-xl sm:font-medium md:font-semibold sm:leading-6 md:leading-7">
                Alira is an AI-powered virtual assistant for Australian real
                estate agents, automating contract management, client
                communication, scheduling, marketing, and data analysis to
                streamline operations and provide an employee-like experience
                for efficiency and productivity.
              </p>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-full sm:px-2 md:px-24 sm:pb-12 md:pb-24 mx-auto">
              <div className="w-full h-[60vh] aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/9HaU8NjH7bI"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
