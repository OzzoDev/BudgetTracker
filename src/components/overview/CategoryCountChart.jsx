import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function CategoryCountChart({ categorizedExpenses }) {
  const chartData = categorizedExpenses.map((category) => ({
    name: category.category,
    expense: category.expenses.length,
  }));

  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="expense" fill="#8884d8" />
    </BarChart>
  );
}
