import { BarChart, Bar, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import { formatNumber } from "@/utils/helpers";

export default function Chart({
  xAxisKey,
  yAxisKey,
  chartData,
  colorMap,
  messages,
  isCountChart = true,
}) {
  const formatYAxisTick = (value) => {
    return value === 0 ? 0 : isCountChart ? formatNumber(value) : `$ ${formatNumber(value)}`;
  };

  const getColor = (index) => {
    const colorObj = colorMap.find((map) => map.category === index);
    return colorObj ? colorObj.color : "#8884d8";
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid />
        <YAxis tickFormatter={(value) => formatYAxisTick(value)} />
        <Tooltip
          content={<CustomTooltip messages={messages} chartData={chartData} xAxisKey={xAxisKey} />}
        />
        <Bar dataKey={yAxisKey}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry[xAxisKey])} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
