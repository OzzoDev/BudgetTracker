import { formatNumber } from "@/utils/helpers";
import React, { useCallback, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltipPieChart from "./CustomTooltipPieChart";

export default function PieChartCircle({
  chartData,
  colorMap,
  messages,
  labelColor = "#FFFFFF",
  labels = [],
  smallScreenLabels = [],
}) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderLabel = useCallback(
    ({ name, value, cx, cy, midAngle, outerRadius }) => {
      const RADIAN = Math.PI / 180;

      const radiusAdjustment = windowWidth < 768 ? 10 : 20;
      const radius = outerRadius + radiusAdjustment;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      const index = chartData.findIndex((item) => item.value === value);
      const customLabel = windowWidth < 576 ? smallScreenLabels[index] : labels[index];

      const displayText = customLabel
        ? customLabel
        : windowWidth < 576
        ? `$ ${formatNumber(value)}`
        : `${name}: $ ${formatNumber(value)}`;

      return (
        <text
          x={x}
          y={y}
          fill={labelColor}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={windowWidth < 768 ? "10px" : "13px"}
          fontWeight="bold">
          {displayText}
        </text>
      );
    },
    [chartData, labelColor, labels, windowWidth]
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          labelLine={false}
          dataKey="value"
          label={renderLabel}
          // Reduce outer radius on small screens
          outerRadius={windowWidth < 768 ? 60 : 100}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colorMap[index]?.color || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltipPieChart chartData={chartData} messages={messages} />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
