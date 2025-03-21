import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import CustomTooltip from "../overview/CustomTooltip";

export default function Chart({ xAxisKey, yAxisKey, chartData }) {
  console.log(xAxisKey, yAxisKey, chartData);

  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid />
      <XAxis dataKey={xAxisKey} />
      <YAxis />
      <Tooltip
        content={<CustomTooltip xAxisKey={xAxisKey} yAxisKey={yAxisKey} />}
      />
      <Bar dataKey={yAxisKey} fill="#8884d8" />
    </BarChart>
  );
}
