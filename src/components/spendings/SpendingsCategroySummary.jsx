import useDataStore from "@/hooks/useDataStore";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

export default function SpendingsCategroySummary() {
  const { expenses } = useDataStore();

  const categorizedSums = expenses.reduce((acc, expense) => {
    const { spendingCategory, totalAmount } = expense;

    if (!acc[spendingCategory]) {
      acc[spendingCategory] = 0;
    }

    acc[spendingCategory] += totalAmount;

    return acc;
  }, {});

  const sortedSums = Object.entries(categorizedSums)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const mostExpensiveCategory = sortedSums.length > 0 ? sortedSums[0] : null;
  const cheapestCategory = sortedSums.length > 1 ? sortedSums[sortedSums.length - 1] : null;

  const noExpenses = expenses.length === 0;

  const isAverageAmout = (amout) => {
    if (sortedSums.length === 0) true;

    const averageAmout =
      sortedSums.reduce((acc, sum) => {
        acc += sum.amount;
        return acc;
      }, 0) / sortedSums.length;

    return amout <= averageAmout ? true : false;
  };

  return (
    <div className="flex flex-col w-full h-full p-8 rounded-md overflow-hidden bg-slate-800">
      {!noExpenses ? (
        <div className="flex flex-col gap-y-10">
          {mostExpensiveCategory && (
            <div className="flex flex-col gap-y-2 p-4 pb-8 rounded-md shadow-xl">
              <div className="flex justify-between mb-4">
                <p className="text-lg text-red-500">Highest spending category</p>
                <div className="p-2 rounded-md bg-gray-900 bg-opacity-40">
                  <GoArrowUp size={24} color="red" />
                </div>
              </div>
              <p className="text-gray-400 font-medium">{mostExpensiveCategory.category}</p>
              <p>${mostExpensiveCategory.amount}</p>
            </div>
          )}
          {cheapestCategory && (
            <div className="flex flex-col gap-y-2 p-4 pb-8 rounded-md shadow-xl">
              <div className="flex justify-between mb-4">
                <p className="text-lg text-green-500">Lowest spending category</p>
                <div className="p-2 rounded-md bg-gray-900 bg-opacity-40">
                  <GoArrowDown size={24} color="green" />
                </div>
              </div>
              <p className="text-gray-400 font-medium">{cheapestCategory.category}</p>
              <p>${cheapestCategory.amount}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xl text-gray-400">No expenses added</p>
      )}
      <p className="text-xl text-gray-400 my-12">Categorized spending totals</p>
      <ul className="flex flex-col gap-y-12 pb-8 max-h-[800px] overflow-y-auto">
        {sortedSums.map((category, index) => {
          return (
            <div key={category.category + index} className="flex flex-col gap-y-4 px-4">
              <p className="text-lg text-gray-400 font-medium">{category.category}</p>
              <div className="flex flex-col gap-y-1 px-4">
                <p>${category.amount}</p>
                <p
                  className={`${
                    isAverageAmout(category.amount) ? "text-green-500" : "text-red-500"
                  }`}>
                  {isAverageAmout(category.amount) ? "Below average" : "Above average"}
                </p>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
