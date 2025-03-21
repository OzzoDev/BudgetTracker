import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomXAxisTick from "./CustomXAxisTick";

export default function Chart({ xAxisKey, yAxisKey, chartData, colorMap, messages }) {
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
        <YAxis />
        <Tooltip
          content={<CustomTooltip messages={messages} chartData={chartData} xAxisKey={xAxisKey} />}
        />
        <Bar dataKey={yAxisKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
