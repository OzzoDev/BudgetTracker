import useDataStore from "@/hooks/useDataStore";
import { formatNumber } from "@/utils/helpers";
import { useEffect } from "react";
import { GoArrowDown, GoArrowUp } from "react-icons/go";

export default function GoalsOverview() {
  const { goals, updatePay } = useDataStore();

  useEffect(() => {
    updatePay(3000);
  });

  const sortedGoals = [...goals].sort((a, b) => b.target - a.target);

  const hightestGoal = goals.length > 0 ? sortedGoals[0] : null;
  const lowestGoal = goals.length > 1 ? sortedGoals[1] : null;

  const noGoals = goals.length === 0;
  return (
    <div className="flex flex-col w-full h-full p-8 rounded-md overflow-hidden bg-slate-800">
      {!noGoals ? (
        <div className="flex flex-col gap-y-10">
          {hightestGoal && (
            <div className="p-4 pb-8 rounded-md shadow-xl">
              <div className="flex justify-between mb-4">
                <p className="text-lg text-green-500">Highest savings goals</p>
                <div className="p-2 rounded-md bg-gray-900 bg-opacity-40">
                  <GoArrowUp size={24} color="green" />
                </div>
              </div>
              <div>
                <p className="flex gap-x-2">
                  <span className="text-gray-400">Start date</span> {hightestGoal.startDate}
                </p>
                <p className="flex gap-x-2">
                  <span className="text-gray-400">End date</span> {hightestGoal.endDate}
                </p>
                <p className="mt-4">$ {formatNumber(hightestGoal.target)}</p>
              </div>
            </div>
          )}
          {lowestGoal && (
            <div className="p-4 pb-8 rounded-md shadow-xl">
              <div className="flex justify-between mb-4">
                <p className="text-lg text-red-500">Lowest savings goal</p>
                <div className="p-2 rounded-md bg-gray-900 bg-opacity-40">
                  <GoArrowDown size={24} color="red" />
                </div>
              </div>
              <div>
                <p className="flex gap-x-2">
                  <span className="text-gray-400">Start date</span> {lowestGoal.startDate}
                </p>
                <p className="flex gap-x-2">
                  <span className="text-gray-400">End date</span> {lowestGoal.endDate}
                </p>
                <p className="mt-4">$ {formatNumber(lowestGoal.target)}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xl text-gray-400">You currently have no expenses</p>
      )}
      {!noGoals && <p className="text-xl text-gray-400 my-12">Savings goals overview</p>}
      <ul className="flex flex-col gap-y-12 px-4 pb-8 max-h-[1100px] overflow-y-auto">
        {sortedGoals.map((goal) => {
          return (
            <div key={goal.id}>
              <p className="flex gap-x-2">
                <span className="text-gray-400">Start date</span> {goal.startDate}
              </p>
              <p className="flex gap-x-2">
                <span className="text-gray-400">End date</span> {goal.endDate}
              </p>
              <p className="mt-4">$ {formatNumber(goal.target)}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
