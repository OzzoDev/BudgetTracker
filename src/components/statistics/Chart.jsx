import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import CustomTooltip from "../overview/CustomTooltip";
import CustomXAxisTick from "./CustomXAxisTick";

export default function Chart({ xAxisKey, yAxisKey, chartData, colorMap }) {
  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid />
      <XAxis
        dataKey={xAxisKey}
        tick={(props) => <CustomXAxisTick {...props} colorMap={colorMap} />}
      />
      <YAxis />
      <Tooltip
        content={<CustomTooltip xAxisKey={xAxisKey} yAxisKey={yAxisKey} />}
      />
      <Bar dataKey={yAxisKey} fill="#8884d8" />
    </BarChart>
  );
}
