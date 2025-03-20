import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function CategorySpendingsChart({ categorizedExpenses }) {
  const chartData = categorizedExpenses.map((category) => ({
    name: category.category,
    amount: category.expenses.reduce((acc, curr) => {
      return (acc += curr.totalAmount);
    }, 0),
  }));

  console.log(chartData);

  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
}
