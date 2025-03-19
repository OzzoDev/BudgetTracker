import React from "react";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";

export default function SummaryCard({ value, percentage, description }) {
  const isFavorable = percentage < 100;

  return (
    <div className="flex flex-col gap-y-4 p-6 rounded-md min-w-[380px] lg:min-w-0 w-full h-full bg-slate-800">
      <div className="flex justify-between gap-4">
        <div className="flex items-end gap-x-2">
          <p className="text-xl text-white font-medium">{value}</p>
          <p
            className={`text-sm mb-1 whitespace-nowarp ${
              isFavorable ? "text-green-500" : "text-red-500"
            }`}>
            {isFavorable ? percentage + "% remaining" : percentage - 100 + "% overload"}
          </p>
        </div>
        <div className="p-2 rounded-md bg-gray-900 bg-opacity-40">
          {isFavorable ? (
            <GoArrowUpRight size={24} color="green" />
          ) : (
            <GoArrowDownRight size={24} color="red" />
          )}
        </div>
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
