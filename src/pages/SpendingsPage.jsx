import SummaryCard from "@/components/dashboard/SummaryCard";
import SpendingsForm from "../components/spendings/SpendingsForm";
import SpendingsRecord from "@/components/spendings/SpendingsRecord";
import SpendingsCategroySummary from "@/components/spendings/SpendingsCategroySummary";
import useDataStore from "@/hooks/useDataStore";
import { formatNumber, formatWithDaySuffix } from "@/utils/helpers";
import InfoCard from "@/components/dashboard/InfoCard";
import { LuHandCoins } from "react-icons/lu";

export default function SpendingsPage() {
  const { pay, expenses } = useDataStore();

  const numExpenses = expenses.length;

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(a.spentDate) - new Date(b.spentDate)
  );
  const totalExpenseAmount = [...expenses].reduce((acc, curr) => {
    return (acc += curr.totalAmount);
  }, 0);

  const firstExpenseDate = sortedExpenses.length > 0 ? sortedExpenses[0] : null;
  const lastExpenseDate =
    sortedExpenses.length > 1 ? sortedExpenses[sortedExpenses.length - 1] : null;

  const expensesDayRange = () => {
    if (sortedExpenses.length < 2) {
      return 30;
    }

    const start = new Date(firstExpenseDate.dateSpent);
    const end = new Date(lastExpenseDate.dateSpent);

    const dayRange = (end - start) / (1000 * 60 * 60 * 24);

    return dayRange;
  };

  const dayRange = expensesDayRange();
  const dailyIncome = pay / 30;
  const totalIncome = dailyIncome * dayRange;

  const percentageUsedIncome = Math.round((totalExpenseAmount / totalIncome) * 100);

  const spendingPace = expenses.length > 0 ? Math.round(dayRange / numExpenses) : null;
  const formattedSpendingPace =
    expenses.length > 0
      ? formatWithDaySuffix(spendingPace).includes("Every")
        ? formatWithDaySuffix(spendingPace)
        : `Every ${formatWithDaySuffix(spendingPace)} day`
      : "No expenses";

  const averageSpendingAmount =
    expenses.length > 0 ? formatNumber(Math.round(totalExpenseAmount / numExpenses)) : 0;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[repeat(14,1fr)] lg:grid-rows-[repeat(6,1fr)] gap-8 lg:min-h-screen p-8">
      <div className="lg:hidden grid grid-cols-[repeat(3,1fr)] gap-8 overflow-x-auto">
        <SummaryCard
          value={`$ ${formatNumber(totalExpenseAmount)}`}
          percentage={`${percentageUsedIncome}%`}
          description="The total amount and percentage of income allocated for expenses."
          isFavorable={percentageUsedIncome <= 82}
        />
        <SummaryCard
          value={formattedSpendingPace}
          percentage={`$ ${averageSpendingAmount} average spending`}
          description="The pace of registered expenses and the average amount spent on each expense"
          isFavorable={spendingPace > 2}
        />
        <InfoCard
          headline={numExpenses}
          description="Total number of added expenses"
          icon={<LuHandCoins size={24} color="white" />}
        />
      </div>
      <div className="hidden lg:block col-span-3 col-start-1 row-span-1">
        <SummaryCard
          value={`$ ${formatNumber(totalExpenseAmount)}`}
          percentage={`${percentageUsedIncome}%`}
          description="The total amount and percentage of income allocated for expenses."
          isFavorable={percentageUsedIncome <= 82}
        />
      </div>
      <div className="hidden lg:block col-span-3 col-start-4 row-span-1">
        <SummaryCard
          value={formattedSpendingPace}
          percentage={`$ ${averageSpendingAmount} average spending`}
          description="The pace of registered expenses and the average amount spent on each expense"
          isFavorable={spendingPace > 2}
        />
      </div>
      <div className="hidden lg:block col-span-3 col-start-7 row-span-1">
        <InfoCard
          headline={numExpenses}
          description="Total number of added expenses"
          icon={<LuHandCoins size={24} color="white" />}
        />
      </div>
      <div className="lg:row-start-2 lg:col-start-1 lg:col-span-9 lg:row-span-3">
        <SpendingsForm />
      </div>
      <div className="lg:row-start-5 lg:col-start-1 lg:col-span-9 lg:row-span-8">
        <SpendingsRecord />
      </div>
      <div className="col-span-5 row-start-1 row-span-12">
        <SpendingsCategroySummary />
      </div>
    </div>
  );
}
