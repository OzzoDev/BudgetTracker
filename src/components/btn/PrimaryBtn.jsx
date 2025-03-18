import React from "react";

export default function PrimaryBtn({ type = "button", onClick, fullWidth = true, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ width: fullWidth ? "100%" : "fit-content", whiteSpace: "nowrap" }}
      className="flex justify-center items-center gap-x-2 py-1 px-4 rounded-md bg-gradient-to-r from-sky-600 to-blue-700 border-b-4 border-t-4 border-transparent transition-all duration-300 ease hover:border-b-blue-300">
      {children}
    </button>
  );
}
