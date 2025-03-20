import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function CategoryChart({ categorizedExpenses }) {
  const chartData = categorizedExpenses.map((category) => ({
    name: category.category,
    expenseCount: category.expenses.length,
  }));

  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="expenseCount" fill="#8884d8" />
    </BarChart>
  );
}
