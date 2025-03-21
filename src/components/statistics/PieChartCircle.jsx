import { formatNumber } from "@/utils/helpers";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomTooltipPieChart from "./CustomTooltipPieChart";

export default function PieChartCircle({ chartData, colorMap, messages }) {
  const formattedData = chartData.map((data) => ({
    name: data.month,
    value: data.total,
  }));

  const renderLabel = ({ name, value, cx, cy, midAngle, outerRadius }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#FFFFFF"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="13px"
        fontWeight="bold">
        {`${name}: $ ${formatNumber(value)}`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%">
      <PieChart>
        <Pie data={formattedData} labelLine={false} dataKey="value" label={renderLabel}>
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorMap[index]?.color || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip
          content={<CustomTooltipPieChart chartData={formattedData} messages={messages} />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
