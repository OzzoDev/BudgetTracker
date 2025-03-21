import Chart from "./Chart";

export default function ChartCard({
  headline,
  yAxisKey,
  xAxisKey,
  chartData,
  colorMap,
  messages,
  isCountChart = true,
}) {
  return (
    <div className="flex flex-col items-center p-8 rounded-md w-full h-full bg-slate-800 overflow-x-hidden w-50 h-50">
      <h2 className="text-2xl text-gray-400 mb-8">{headline}</h2>
      <div className="pr-8 w-full h-full">
        <Chart
          xAxisKey={xAxisKey}
          yAxisKey={yAxisKey}
          chartData={chartData}
          colorMap={colorMap}
          messages={messages}
          isCountChart={isCountChart}
        />
      </div>
    </div>
  );
}
