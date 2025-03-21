import Chart from "./Chart";

export default function ChartCard({ headline, yAxisKey, xAxisKey, chartData, colorMap, messages }) {
  return (
    <div className="p-8 rounded-md w-full h-full bg-slate-800 overflow-x-hidden">
      <h2 className="text-2xl text-gray-400 mb-8">{headline}</h2>
      <Chart
        xAxisKey={xAxisKey}
        yAxisKey={yAxisKey}
        chartData={chartData}
        colorMap={colorMap}
        messages={messages}
      />
    </div>
  );
}
