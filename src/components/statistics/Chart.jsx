import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomXAxisTick from "./CustomXAxisTick";

export default function Chart({ xAxisKey, yAxisKey, chartData, colorMap, messages }) {
  return (
    <BarChart width={600} height={300} data={chartData}>
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
  );
}
