import React from "react";

export default function OutlineBtn({ type = "button", onClick, fullWidth = true, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ width: fullWidth ? "100%" : "fit-content", whiteSpace: "nowrap" }}
      className="flex justify-center items-center gap-x-2 py-2 px-4 text-white border-2 border-white rounded-full transition-all duration-300 ease hover:opacity-70">
      {children}
    </button>
  );
}
