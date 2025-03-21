import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function CategorySpendingsChart({ categorizedExpenses }) {
  const chartData = categorizedExpenses.map((category) => ({
    name: category.category,
    expense: category.expenses.reduce((acc, curr) => {
      return (acc += curr.totalAmount);
    }, 0),
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
