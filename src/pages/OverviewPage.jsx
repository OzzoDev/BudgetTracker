import CategoryColorMap from "@/components/category/CategoryColorMap";
import SummaryCard from "@/components/dashboard/SummaryCard";
import IncomeForm from "@/components/overview/IncomeForm";
import ChartCard from "@/components/statistics/ChartCard";
import PieChartCard from "@/components/statistics/PieChartCard";
import useDataStore from "@/hooks/useDataStore";
import Shimmer from "@/layouts/animations/Shimmer";
import { categorizeExpenses, formatNumber, getMonthlySpendingStats } from "@/utils/helpers";

export default function OverviewPage() {
  const { pay, expenses, categories } = useDataStore();

  const montlySpendingsStats = getMonthlySpendingStats(expenses);

  const categorizedExpenses = categorizeExpenses(expenses);

  const hasExpenses = expenses && expenses.length > 0;
  const hasCategoires = categories && categories.length > 0;

  const categoryCountChartData = categorizedExpenses
    .map((category) => ({
      name: category.category,
      expense: category.expenses.length,
    }))
    .sort((a, b) => b.expense - a.expense);

  const categorySpendingsChartData = categorizedExpenses
    .map((category) => ({
      name: category.category,
      amount: category.expenses.reduce((acc, curr) => {
        return (acc += curr.totalAmount);
      }, 0),
    }))
    .sort((a, b) => b.amount - a.amount);

  const colorMap = [...categories].map((category) => ({
    category: category.category,
    color: category.color,
  }));

  const monthlySpendingsChartData = getMonthlySpendingStats(expenses)?.monthlyStats;

  const monthlySavingsChartData = getMonthlySpendingStats(expenses)?.monthlyStats?.map((exp) => ({
    ...exp,
    total: pay - exp.total,
  }));

  return (
    <div
      style={{ gridTemplateRows: "1fr 1fr 1fr minmax(100px, auto) 400px 400px" }}
      className="flex flex-col lg:grid grid-cols-[repeat(12,1fr)] gap-8 lg:min-h-screen p-8">
      <div className="col-span-9 row-span-2">
        <Shimmer>
          <IncomeForm />
        </Shimmer>
      </div>
      <div className="col-span-3 row-span-3 p-8 rounded-md bg-slate-800">
        <Shimmer>
          <h2 className="text-lg text-green-400 font-medium">
            Welcome to the premier platform designed to help you track your spending and establish
            savings goals to enhance your financial well-being.
          </h2>
          <div className="flex gap-x-2 p-2 mt-6">
            <p>💡</p>
            <p>
              <span className="text-lg text-gray-400 font-medium">Categories</span>
              <span> -</span> Create distinct categories and assign colors to them, allowing you to
              easily group your expenses and view related expenditures.
            </p>
          </div>
          <div className="flex gap-x-2 p-2 mt-6">
            <p>💴</p>
            <p>
              <span className="text-lg text-gray-400 font-medium">Expenses</span>
              <span> -</span> Record your expenses and select the date of each transaction. This
              will enable an assessment of your likelihood of achieving your savings goals within
              the specified timeframe.
            </p>
          </div>
          <div className="flex gap-x-2 p-2 mt-6">
            <p>🎯</p>
            <p>
              <span className="text-lg text-gray-400 font-medium">Goals</span>
              <span> -</span> By establishing a savings goal, you can easily determine whether you
              will be able to save the desired amount based on your income and expenses.
            </p>
          </div>
        </Shimmer>
      </div>
      {hasExpenses && (
        <div className="lg:hidden grid grid-cols-[repeat(3,1fr)] gap-8 overflow-x-auto">
          <Shimmer>
            <SummaryCard
              value={montlySpendingsStats?.highest?.month}
              percentage={`$ ${formatNumber(montlySpendingsStats?.highest?.total)}`}
              description="This is the month where your spending peaked, indicating the highest expenditure."
              isFavorable={false}
            />
          </Shimmer>
          <Shimmer>
            <SummaryCard
              value={montlySpendingsStats?.average?.month}
              percentage={`$ ${formatNumber(montlySpendingsStats?.average?.total)}`}
              description="Your average monthly spending across all tracked months, providing a benchmark for budgeting."
              isFavorable={true}
            />
          </Shimmer>
          <Shimmer>
            <SummaryCard
              value={montlySpendingsStats?.lowest?.month}
              percentage={`$ ${formatNumber(montlySpendingsStats?.lowest?.total)}`}
              description="This month reflects your lowest spending, showcasing your best budgeting performance."
              isFavorable={true}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses && (
        <div className="hidden lg:block col-span-3 row-span-1">
          <Shimmer>
            <SummaryCard
              value={montlySpendingsStats?.highest?.month}
              percentage={`$ ${formatNumber(montlySpendingsStats?.highest?.total)}`}
              description="This is the month where your spending peaked, indicating the highest expenditure."
              isFavorable={false}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses && (
        <div className="hidden lg:block col-span-3 row-span-1">
          <Shimmer>
            <SummaryCard
              value={montlySpendingsStats?.average?.month}
              percentage={`$ ${formatNumber(montlySpendingsStats?.average?.total)}`}
              description="Your average monthly spending across all tracked months, providing a benchmark for budgeting."
              isFavorable={true}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses && (
        <div className="hidden lg:block col-span-3 row-span-1">
          <Shimmer>
            <SummaryCard
              value={montlySpendingsStats?.lowest?.month}
              percentage={`$ ${formatNumber(montlySpendingsStats?.lowest?.total)}`}
              description="This month reflects your lowest spending, showcasing your best budgeting performance."
              isFavorable={true}
            />
          </Shimmer>
        </div>
      )}
      {hasCategoires && (
        <div className="row-span-1 col-span-12">
          <Shimmer>
            <CategoryColorMap />
          </Shimmer>
        </div>
      )}
      {hasExpenses && (
        <div className="row-span-1 col-span-6 flex justify-center items-center">
          <Shimmer>
            <ChartCard
              headline="Expenses per category"
              xAxisKey="name"
              yAxisKey="expense"
              chartData={categoryCountChartData}
              colorMap={colorMap}
              messages={categoryCountChartData.map(
                (data) =>
                  `${data.name} has ${data.expense} expense${data.expense.length === 0 ? "" : "s"}`
              )}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses && (
        <div className="row-span-1 col-span-6 flex justify-center items-center">
          <Shimmer>
            <ChartCard
              headline="Spendings per category"
              xAxisKey="name"
              yAxisKey="amount"
              chartData={categorySpendingsChartData}
              colorMap={colorMap}
              messages={categorySpendingsChartData.map(
                (data) => `You have spent $ ${formatNumber(data.amount)} on ${data.name}`
              )}
              isCountChart={false}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses && (
        <div className="row-span-1 col-span-6 flex justify-center items-center">
          <Shimmer>
            <PieChartCard
              headline="Monthly expenses"
              chartData={monthlySpendingsChartData}
              colorMap={colorMap}
              messages={monthlySpendingsChartData.map(
                (data) => `In ${data.month} you spent/have spent $ ${formatNumber(data.total)}`
              )}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses && (
        <div className="row-span-1 col-span-6 flex justify-center items-center">
          <Shimmer>
            <PieChartCard
              headline="Monthly savings"
              chartData={monthlySavingsChartData}
              colorMap={colorMap}
              messages={monthlySavingsChartData.map(
                (data) => `In ${data.month} are saving/did saved $ ${formatNumber(data.total)}`
              )}
            />
          </Shimmer>
        </div>
      )}
    </div>
  );
}
