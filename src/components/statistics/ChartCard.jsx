import Chart from "./Chart";

export default function ChartCard({ headline, yAxisKey, xAxisKey, chartData }) {
  return (
    <div className="p-8 rounded-md bg-slate-800">
      <h2 className="text-2xl text-gray-400 mb-8">{headline}</h2>
      <Chart xAxisKey={xAxisKey} yAxisKey={yAxisKey} chartData={chartData} />
    </div>
  );
}
