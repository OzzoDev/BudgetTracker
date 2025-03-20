import React from "react";

export default function GoalProgressionBar({ percentage }) {
  const progression = percentage * 100;
  const bgColor =
    progression > 90
      ? "#19bd04"
      : progression > 70
      ? "#63b015"
      : progression > 50
      ? "#a4de26"
      : progression > 30
      ? "#d6a606"
      : "#e33307";

  return (
    <div className="p-2 rounded-full shadow-md bg-slate-900">
      <div
        style={{ width: `${progression}%`, maxWidth: "100%", backgroundColor: bgColor }}
        className="h-2 rounded-full"
      />
    </div>
  );
}
