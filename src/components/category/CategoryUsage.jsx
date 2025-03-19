import useDataStore from "@/hooks/useDataStore";
import React from "react";
import { TfiStatsDown, TfiStatsUp } from "react-icons/tfi";

export default function CategoryUsage() {
  const { categories, expenses } = useDataStore();

  const categoryFrequency = expenses.reduce((acc, expense) => {
    const { spendingCategory } = expense;

    if (!acc[spendingCategory]) {
      acc[spendingCategory] = 0;
    }

    acc[spendingCategory] += 1;

    return acc;
  }, {});

  const getCategoryColor = (category) => {
    return categories.find((cat) => cat.category === category)?.color;
  };

  const sortedFrequcency = Object.entries(categoryFrequency)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const mostFrequent = sortedFrequcency.length > 0 ? sortedFrequcency[0] : null;
  const leastFrequent =
    sortedFrequcency.length > 1 ? sortedFrequcency[sortedFrequcency.length - 1] : null;

  const noExpenses = expenses.length === 0;

  return (
    <div className="p-8 h-full rounded-md bg-slate-800">
      {!noExpenses ? (
        <div className="flex flex-col gap-y-10">
          {mostFrequent && (
            <div className="flex flex-col gap-y-2 p-4 pb-8 rounded-md shadow-xl">
              <div className="flex justify-between mb-4">
                <p className="text-lg text-green-500">Most popular category</p>
                <div className="p-2 rounded-md bg-gray-900 bg-opacity-40">
                  <TfiStatsUp size={24} color="green" />
                </div>
              </div>
              <div className="w-fit flex flex-col gap-y-2">
                <div
                  style={{ backgroundColor: getCategoryColor(mostFrequent.category) }}
                  className="h-2 w-full rounded-full shadow-md"
                />
                <p className="text-gray-400 font-medium">{mostFrequent.category}</p>
                <p className="flex items-center gap-x-1">
                  <span>{mostFrequent.count}</span>
                  <span className="text-sm text-gray-300">expenses</span>
                </p>
              </div>
            </div>
          )}
          {leastFrequent && (
            <div className="flex flex-col gap-y-2 p-4 pb-8 rounded-md shadow-xl">
              <div className="flex justify-between mb-4">
                <p className="text-lg text-red-500">Least popular category</p>
                <div className="p-2 rounded-md bg-gray-900 bg-opacity-40">
                  <TfiStatsDown size={24} color="red" />
                </div>
              </div>
              <div className="w-fit flex flex-col gap-y-2">
                <div
                  style={{ backgroundColor: getCategoryColor(leastFrequent.category) }}
                  className="h-2 w-full rounded-full shadow-md"
                />
                <p className="text-gray-400 font-medium">{leastFrequent.category}</p>
                <p className="flex items-center gap-x-1">
                  <span>{leastFrequent.count}</span>
                  <span className="text-sm text-gray-300">expenses</span>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xl text-gray-400">You currently have no expenses</p>
      )}
      {!noExpenses && <p className="text-xl text-gray-400 my-12">Popualar categories</p>}
      <ul className="flex flex-col gap-y-12 pb-8 max-h-[800px] overflow-y-auto">
        {sortedFrequcency.map((category, index) => {
          return (
            <div key={category.category + index} className="flex flex-col gap-y-4 px-4">
              <div className="flex items-center gap-x-2">
                <div
                  style={{ backgroundColor: getCategoryColor(category.category) }}
                  className="h-3 w-3 rounded-full shadow-md"
                />
                <p className="text-lg text-gray-400 font-medium">{category.category}</p>
              </div>
              <p className="flex items-center gap-x-1">
                <span>{category.count}</span>
                <span className="text-sm text-gray-300">
                  expense{category.count > 1 ? "s" : ""}
                </span>
              </p>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
