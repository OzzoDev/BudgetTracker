import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomXAxisTick from "./CustomXAxisTick";
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid />
        <XAxis
          dataKey={xAxisKey}
          tickCount={chartData.length}
          interval={0}
          tick={(props) => <CustomXAxisTick {...props} colorMap={colorMap} />}
        />
        <YAxis tickFormatter={(value) => formatYAxisTick(value)} />
        <Tooltip
          content={<CustomTooltip messages={messages} chartData={chartData} xAxisKey={xAxisKey} />}
        />
        <Bar dataKey={yAxisKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
