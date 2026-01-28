import React from "react";

const Message = ({ type = "info", message }) => {
  if (!message) return null;

  let bgColor = "";
  let textColor = "text-white";

  switch (type) {
    case "success":
      bgColor = "bg-green-500";
      break;
    case "error":
      bgColor = "bg-red-500";
      break;
    case "warning":
      bgColor = "bg-yellow-500";
      textColor = "text-black";
      break;
    default:
      bgColor = "bg-blue-500";
  }

  return (
    <div
      className={`p-3 rounded-md mb-4 ${bgColor} ${textColor} transition-all duration-300`}
    >
      {message}
    </div>
  );
};

export default Message;
