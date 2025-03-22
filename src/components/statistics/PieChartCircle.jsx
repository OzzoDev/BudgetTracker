import { formatNumber } from "@/utils/helpers";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltipPieChart from "./CustomTooltipPieChart";

export default function PieChartCircle({
  chartData,
  colorMap,
  messages,
  labels = [],
  labelColor = "#FFFFFF",
}) {
  const renderLabel = ({ name, value, cx, cy, midAngle, outerRadius }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const index = chartData.findIndex((item) => item.value === value);

    const customLabel = labels[index];

    return (
      <text
        x={x}
        y={y}
        fill={labelColor}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="13px"
        fontWeight="bold">
        {labels && labels.length > 0 ? customLabel : `${name}: $ ${formatNumber(value)}`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%">
      <PieChart>
        <Pie data={chartData} labelLine={false} dataKey="value" label={renderLabel}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colorMap[index]?.color || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltipPieChart chartData={chartData} messages={messages} />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
