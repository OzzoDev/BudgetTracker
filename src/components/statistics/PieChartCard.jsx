import React from "react";
import PieChartCircle from "./PieChartCircle";

export default function PieChartCard({ headline, chartData, colorMap, messages, labelColor }) {
  return (
    <div className="flex flex-col items-center p-8 rounded-md w-full h-full bg-slate-800 overflow-x-hidden">
      <h2 className="text-2xl text-gray-400 mb-8">{headline}</h2>
      <div className="pr-8 w-full h-full">
        <PieChartCircle
          chartData={chartData}
          colorMap={colorMap}
          messages={messages}
          labelColor={labelColor}
        />
      </div>
    </div>
  );
}
