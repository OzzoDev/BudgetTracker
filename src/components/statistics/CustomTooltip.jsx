export default function CustomTooltip({ active, payload, messages, chartData, indexKey }) {
  if (active && payload && payload.length) {
    const currentDataPoint = payload[0].payload;

    const index = chartData.findIndex((item) => item[indexKey] === currentDataPoint[indexKey]);

    const message = index >= 0 ? messages[index] : "No message available";

    return (
      <div className="p-2 rounded-md bg-black text-white">
        <p className="label">{`${message}`}</p>
      </div>
    );
  }
  return null;
}
