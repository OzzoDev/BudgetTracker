import SummaryCard from "@/components/dashboard/SummaryCard";
import SpendingsForm from "../components/spendings/SpendingsForm";
import SpendingsList from "../components/spendings/SpendingsList";

export default function SpendingsPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      <div className="flex flex-col gap-8">
        <div className="flex gap-x-8">
          <SummaryCard
            value={`$${3000}`}
            percentage={80}
            description="Percentage of pay that are used for expenses"
          />
          <SummaryCard value={`${5}`} percentage={120} description="Total categories used" />
          <SummaryCard value={`${5}`} percentage={120} description="Total categories used" />
        </div>
        <SpendingsForm />
        <SpendingsList />
      </div>
      <div className="w-full h-screen p-8 rounded-md bg-slate-800">Add latest spendings here</div>
    </div>
  );
}
