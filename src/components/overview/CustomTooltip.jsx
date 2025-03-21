export default function CustomTooltip({ active, payload, xAxisKey, yAxisKey }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 rounded-md bg-black text-white">
        <p className="label">{`${data[xAxisKey]} has ${data[yAxisKey]} expenses`}</p>
      </div>
    );
  }
  return null;
}
