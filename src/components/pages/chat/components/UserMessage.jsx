import React from "react";

const UserMessage = ({ content }) => {
  return (
    <div className="flex justify-end items-start">
      <div className="sm:w-max-w-[80%] md:max-w-[50%] rounded-2xl px-4 py-2 text-3xl mb-4 justify-end py-2 text-base bg-[#454545] text-white rounded-tl-lg rounded-br-lg rounded-bl-lg">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default UserMessage;
