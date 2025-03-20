import { Button } from "@/components/ui/button";
import { PieChartCard } from "../components/statistics/PieChartCard";
import { BarChartInteractive } from "../components/statistics/BarChartInteractive";
import IncomeForm from "@/components/overview/IncomeForm";

export default function OverviewPage() {
  return (
    <div className="flex flex-col lg:grid grid-cols-[repeat(12,1fr)] grid-rows-[repeat(12,1fr)] gap-8 p-8">
      <div className="col-span-8">
        <IncomeForm />
      </div>
      <div className="col-span-4 col-start-9 p-8 rounded-md bg-slate-800">
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
            <span> -</span> Record your expenses and select the date of each transaction. This will
            enable an assessment of your likelihood of achieving your savings goals within the
            specified timeframe.
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
      </div>
    </div>
    // <div className="flex flex-col gap-8 p-8">
    //   <IncomeForm />
    // </div>
    // <div className="flex flex-col justify-center items-center gap-y-10 h-screen">
    //   <h1 className="text-4xl">React Dashboard</h1>
    //   <Button>Click me</Button>
    //   <PieChartCard />
    //   <BarChartInteractive />
    // </div>
  );
}
