import CategoryColorMap from "@/components/category/CategoryColorMap";
import SummaryCard from "@/components/dashboard/SummaryCard";
import IncomeForm from "@/components/overview/IncomeForm";
import StockList from "@/components/overview/StockList";
import ChartCard from "@/components/statistics/ChartCard";
import PieChartCard from "@/components/statistics/PieChartCard";
import TargetedBarChartCard from "@/components/statistics/TargetedBarChartCard";
import useDataStore from "@/hooks/useDataStore";
import Shimmer from "@/layouts/animations/Shimmer";
import {
  calcGoalProgression,
  calcTotalIncome,
  categorizeExpenses,
  formatNumber,
  getMonthlySpendingStats,
} from "@/utils/helpers";

export default function OverviewPage() {
  const { pay, expenses, categories, goals } = useDataStore();

  const montlySpendingsStats = getMonthlySpendingStats(expenses);

  const categorizedExpenses = categorizeExpenses(expenses);

  const categoriesInUse = [...categories].filter((category) => {
    return expenses.some((exp) => exp.spendingCategory === category.category);
  });

  const hasExpenses = expenses && expenses.length > 0;
  const hasCategoires = categoriesInUse && categoriesInUse.length > 0;
  const hasGoals = goals && goals.length > 0;

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

  const monthlySpendingsChartData = getMonthlySpendingStats(expenses)?.monthlyStats?.map((exp) => ({
    name: exp.month,
    value: exp.total,
  }));

  const monthlySavingsChartData = getMonthlySpendingStats(expenses)?.monthlyStats?.map((exp) => ({
    name: exp.month,
    value: pay - exp.total,
  }));

  const savingsGoals = [...goals]
    .map((goal) => ({
      value:
        calcTotalIncome(goal, pay).totalIncome -
        calcGoalProgression(goal, expenses, pay).totalAmount,
      target: goal.target,
    }))
    .sort((a, b) => {
      const totalIncome = calcTotalIncome(a, pay).totalIncome;
      const totalAmountA = calcGoalProgression(a, expenses, pay).totalAmount;
      const totalAmountB = calcGoalProgression(b, expenses, pay).totalAmount;

      const progressionA = Math.abs(totalIncome - totalAmountA - a.target);
      const progressionB = Math.abs(totalIncome - totalAmountB - b.target);

      return progressionA - progressionB;
    })
    .reverse();

  const savingsGoalsProgression = [...goals].map((goal) => ({
    name: `$ ${formatNumber(goal.target)}`,
    value: Math.round(
      ((calcTotalIncome(goal, pay).totalIncome -
        calcGoalProgression(goal, expenses, pay).totalAmount) /
        goal.target) *
        100
    ),
    amount:
      calcTotalIncome(goal, pay).totalIncome - calcGoalProgression(goal, expenses, pay).totalAmount,
    goal: goal,
  }));

  const gridRows =
    hasExpenses && hasGoals
      ? "repeat(3,1fr)_minmax(100px,auto)_repeat(3,400px)"
      : hasExpenses || hasGoals
      ? "repeat(3,1fr)_minmax(100px,auto)_repeat(2,400px)"
      : "repeat(3,1fr)_minmax(100px,auto)";

  return (
    <div
      className={`flex flex-col lg:grid lg:grid-cols-[repeat(12,1fr)] lg:grid-rows-[${gridRows}] gap-8 lg:min-h-screen p-8`}>
      <div className="col-span-9 row-span-2">
        <Shimmer minHeight={325}>
          <IncomeForm />
        </Shimmer>
      </div>
      <div className="hidden lg:block col-span-3 row-span-3 p-8 rounded-md lg:min-h-[845px] bg-slate-800">
        <Shimmer minHeight={350}>
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
          <Shimmer minHeight={175}>
            <SummaryCard
              value={montlySpendingsStats?.highest?.month}
              percentage={`$ ${formatNumber(montlySpendingsStats?.highest?.total)}`}
              description="This is the month where your spending peaked, indicating the highest expenditure."
              isFavorable={false}
            />
          </Shimmer>
          <Shimmer minHeight={175}>
            <SummaryCard
              value={montlySpendingsStats?.average?.month}
              percentage={`$ ${formatNumber(montlySpendingsStats?.average?.total)}`}
              description="Your average monthly spending across all tracked months, providing a benchmark for budgeting."
              isFavorable={true}
            />
          </Shimmer>
          <Shimmer minHeight={175}>
            <SummaryCard
              value={montlySpendingsStats?.lowest?.month}
              percentage={`$ ${formatNumber(montlySpendingsStats?.lowest?.total)}`}
              description="This month reflects your lowest spending, showcasing your best budgeting performance."
              isFavorable={true}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses ? (
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
      ) : (
        <div className="hidden lg:block col-span-3 row-span-1">
          <Shimmer>
            <SummaryCard
              value="No expenses"
              description="This is the month where your spending peaked, indicating the highest expenditure."
              isFavorable={false}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses ? (
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
      ) : (
        <div className="hidden lg:block col-span-3 row-span-1">
          <Shimmer>
            <SummaryCard
              value="No expenses"
              description="Your average monthly spending across all tracked months, providing a benchmark for budgeting."
              isFavorable={false}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses ? (
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
      ) : (
        <div className="hidden lg:block col-span-3 row-span-1">
          <Shimmer>
            <SummaryCard
              value="No expenses"
              description="This month reflects your lowest spending, showcasing your best budgeting performance."
              isFavorable={false}
            />
          </Shimmer>
        </div>
      )}
      {hasCategoires && (
        <div className="row-span-1 col-span-12">
          <Shimmer minHeight={130}>
            <CategoryColorMap />
          </Shimmer>
        </div>
      )}
      {hasExpenses && (
        <div className="row-span-1 col-span-6 flex justify-center items-center h-[400px]">
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
        <div className="row-span-1 col-span-6 flex justify-center items-center h-[400px]">
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
        <div className="row-span-1 col-span-6 flex justify-center items-center h-[400px]">
          <Shimmer>
            <PieChartCard
              headline="Monthly spendings"
              chartData={monthlySpendingsChartData}
              colorMap={colorMap}
              messages={monthlySpendingsChartData.map(
                (data) => `${data.name} spendings: $ ${formatNumber(data.value)}`
              )}
              labelColor="#F87171"
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses && (
        <div className="row-span-1 col-span-6 flex justify-center items-center h-[400px]">
          <Shimmer>
            <PieChartCard
              headline="Monthly savings"
              chartData={monthlySavingsChartData}
              colorMap={colorMap}
              messages={monthlySavingsChartData.map(
                (data) => `${data.name} savings: $ ${formatNumber(data.value)}`
              )}
              labelColor="#34D399"
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses && hasGoals && (
        <div className="row-span-1 col-span-6 flex justify-center items-center h-[400px]">
          <Shimmer>
            <TargetedBarChartCard
              headline="Savings goals"
              chartData={savingsGoals}
              messages={savingsGoals.map(
                (data) =>
                  `Savings: $ ${formatNumber(data.value)} / $ ${formatNumber(
                    data.target
                  )} (${Math.round((data.value / data.target) * 100)}%)`
              )}
              isCountChart={false}
            />
          </Shimmer>
        </div>
      )}
      {hasExpenses && hasGoals && (
        <div className="row-span-1 col-span-6 flex justify-center items-center h-[400px]">
          <Shimmer>
            <PieChartCard
              headline="Savings goals progression"
              chartData={savingsGoalsProgression}
              colorMap={colorMap}
              messages={savingsGoalsProgression.map(
                (data) => `${data.goal.startDate} - ${data.goal.endDate}`
              )}
              labels={savingsGoalsProgression.map(
                (data) =>
                  `$ ${formatNumber(data.amount)} / $ ${formatNumber(data.goal.target)} (${
                    data.value
                  }%)`
              )}
              smallScreenLabels={savingsGoalsProgression.map((data) => `${data.value}%`)}
              labelColor="#fff"
            />
          </Shimmer>
        </div>
      )}
      <div className="col-span-12">
        <Shimmer minHeight={600}>
          <StockList />
        </Shimmer>
      </div>
    </div>
  );
}
