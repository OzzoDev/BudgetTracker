export default function CustomTooltipPieChart({ active, payload, chartData, messages }) {
  if (active && payload && payload.length) {
    const index = chartData.findIndex((item) => item.value === payload[0].value);

    const message = index !== -1 ? messages[index] : "No data available";

    return (
      <div className="p-2 rounded-md bg-black text-white">
        <p>{message}</p>
      </div>
    );
  }

  return null;
}
