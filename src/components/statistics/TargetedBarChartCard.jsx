import TargetedBarChart from "./TargetedBarChart";

export default function TargetedBarChartCard({
  headline,
  chartData,
  messages,
  isCountChart = true,
}) {
  return (
    <div className="flex flex-col items-center p-8 rounded-md w-full h-full bg-slate-800 overflow-x-hidden">
      <h2 className="text-2xl text-gray-400 mb-8">{headline}</h2>
      <div className="pr-8 w-full h-full">
        <TargetedBarChart chartData={chartData} messages={messages} isCountChart={isCountChart} />
      </div>
    </div>
  );
}
