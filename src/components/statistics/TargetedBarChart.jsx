import { BarChart, Bar, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import { formatNumber } from "@/utils/helpers";

export default function TargetedBarChart({ chartData, messages, isCountChart = true }) {
  const formatYAxisTick = (value) => {
    return value === 0 ? 0 : isCountChart ? formatNumber(value) : `$ ${formatNumber(value)}`;
  };

  const getColor = (value, target, type) => {
    if (type === "target") return "#cccccc";
    const percentage = (value / target) * 100;
    if (percentage >= 80) return "green";
    if (percentage >= 50) return "yellow";
    if (percentage >= 20) return "orange";
    return "red";
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} barGap={-15}>
        <CartesianGrid />
        <YAxis tickFormatter={formatYAxisTick} />
        <Tooltip
          content={<CustomTooltip messages={messages} chartData={chartData} indexKey={"target"} />}
          wrapperStyle={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
          }}
          cursor={{ fill: "transparent", pointerEvents: "auto", cursor: "pointer" }}
        />

        <Bar dataKey="target" barSize={30} cursor="default">
          {chartData.map((entry, index) => (
            <Cell
              key={`target-cell-${index}`}
              fill={getColor(entry.value, entry.target, "target")}
            />
          ))}
        </Bar>

        <Bar dataKey="value" barSize={30} cursor="default">
          {chartData.map((entry, index) => (
            <Cell key={`value-cell-${index}`} fill={getColor(entry.value, entry.target, "value")} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
