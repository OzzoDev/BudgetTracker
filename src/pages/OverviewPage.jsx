import SummaryCard from "@/components/dashboard/SummaryCard";
import IncomeForm from "@/components/overview/IncomeForm";
import useDataStore from "@/hooks/useDataStore";
import Shimmer from "@/layouts/animations/Shimmer";
import { formatNumber, getMonthlySpendingStats } from "@/utils/helpers";

export default function OverviewPage() {
  const { expenses } = useDataStore();

  const montlySpendingsStats = getMonthlySpendingStats(expenses);

  console.log(montlySpendingsStats);

  return (
    <div className="flex flex-col lg:grid grid-cols-[repeat(12,1fr)] grid-rows-[repeat(7,1fr)] gap-8 lg:min-h-screen p-8">
      <div className="col-span-8 row-span-3 row-start-1">
        <Shimmer>
          <IncomeForm />
        </Shimmer>
      </div>
      <div className="col-span-4 col-start-9 row-span-3 row-start-1 p-8 rounded-md bg-slate-800">
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
      <div className="lg:hidden grid grid-cols-[repeat(3,1fr)] gap-8 overflow-x-auto">
        <Shimmer>
          <SummaryCard
            value={montlySpendingsStats.highest.month}
            percentage={`$ ${formatNumber(montlySpendingsStats.highest.total)}`}
            description="This is the month where your spending peaked, indicating the highest expenditure."
            isFavorable={false}
          />
        </Shimmer>
        <Shimmer>
          <SummaryCard
            value={montlySpendingsStats.average.month}
            percentage={`$ ${formatNumber(montlySpendingsStats.average.total)}`}
            description="Your average monthly spending across all tracked months, providing a benchmark for budgeting."
            isFavorable={true}
          />
        </Shimmer>
        <Shimmer>
          <SummaryCard
            value={montlySpendingsStats.lowest.month}
            percentage={`$ ${formatNumber(montlySpendingsStats.lowest.total)}`}
            description="This month reflects your lowest spending, showcasing your best budgeting performance."
            isFavorable={true}
          />
        </Shimmer>
      </div>
      <div className="hidden lg:block col-span-4 row-span-1 row-start-4">
        <Shimmer>
          <SummaryCard
            value={montlySpendingsStats.highest.month}
            percentage={`$ ${formatNumber(montlySpendingsStats.highest.total)}`}
            description="This is the month where your spending peaked, indicating the highest expenditure."
            isFavorable={false}
          />
        </Shimmer>
      </div>
      <div className="hidden lg:block col-span-4 row-span-1 row-start-4">
        <Shimmer>
          <SummaryCard
            value={montlySpendingsStats.average.month}
            percentage={`$ ${formatNumber(montlySpendingsStats.average.total)}`}
            description="Your average monthly spending across all tracked months, providing a benchmark for budgeting."
            isFavorable={true}
          />
        </Shimmer>
      </div>
      <div className="hidden lg:block col-span-4 row-span-1 row-start-4">
        <Shimmer>
          <SummaryCard
            value={montlySpendingsStats.lowest.month}
            percentage={`$ ${formatNumber(montlySpendingsStats.lowest.total)}`}
            description="This month reflects your lowest spending, showcasing your best budgeting performance."
            isFavorable={true}
          />
        </Shimmer>
      </div>
    </div>
  );
}
