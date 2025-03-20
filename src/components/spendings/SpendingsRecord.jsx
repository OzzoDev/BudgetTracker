import useDataStore from "@/hooks/useDataStore";
import React, { useEffect, useState } from "react";
import SpendingsList from "./SpendingsList";
import Paginator from "../common/Paginator";
import SpendingsFilters from "./SpendingsFilters";

export default function SpendingsRecord() {
  const { expenses } = useDataStore();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [pagintedExpenses, setPagintedExpenses] = useState(expenses);

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const noExpenses = expenses.length === 0;

  return (
    <div className="relative p-8 pb-24 rounded-md bg-slate-800 h-full">
      <h2 className="text-2xl text-gray-300 mb-8">Your spending records</h2>
      {!noExpenses && <SpendingsFilters expenses={expenses} setExpenses={setFilteredExpenses} />}
      <SpendingsList expenses={pagintedExpenses} />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        {!noExpenses && (
          <Paginator items={filteredExpenses} maxItems={8} setItems={setPagintedExpenses} />
        )}
      </div>
    </div>
  );
}
