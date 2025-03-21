import useDataStore from "@/hooks/useDataStore";
import { calcGoalProgression, calcTotalIncome, formatNumber } from "@/utils/helpers";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import GoalProgressionBar from "./GoalProgressionBar";
import GoalsSavedAmount from "./GoalsSavedAmount";

export default function GoalsOverview() {
  const { goals, expenses, pay } = useDataStore();

  const sortedGoals = [...goals]
    .map((goal) => calcTotalIncome(goal, pay))
    .sort((a, b) => b - a)
    .map((income) => goals.find((goa) => goa.id === income.goal.id))
    .map((goal) => (calcGoalProgression(goal, expenses, pay).percentage < 1 ? goal : null))
    .filter((goal) => goal);

  const reachedGoals = [...goals]
    .map((goal) => (calcGoalProgression(goal, expenses, pay).percentage >= 1 ? goal : null))
    .filter((goal) => goal);

  const sortedGoalsByProgression = [...sortedGoals].sort((a, b) => {
    const totalIncome = calcTotalIncome(a, pay).totalIncome;
    const totalAmountA = calcGoalProgression(a, expenses, pay).totalAmount;
    const totalAmountB = calcGoalProgression(b, expenses, pay).totalAmount;

    const progressionA = Math.abs(totalIncome - totalAmountA - a.target);
    const progressionB = Math.abs(totalIncome - totalAmountB - b.target);

    return progressionA - progressionB;
  });

  const highestGoal = sortedGoalsByProgression.length > 0 ? sortedGoalsByProgression[0] : null;
  const lowestGoal =
    sortedGoalsByProgression.length > 1
      ? sortedGoalsByProgression[sortedGoalsByProgression.length - 1]
      : null;

  const highestGoalProgression =
    sortedGoalsByProgression.length > 0
      ? calcGoalProgression(sortedGoalsByProgression[0], expenses, pay)
      : 0;
  const lowestGoalProgression =
    sortedGoalsByProgression.length > 1
      ? calcGoalProgression(
          sortedGoalsByProgression[sortedGoalsByProgression.length - 1],
          expenses,
          pay
        )
      : 0;

  const noGoals = goals.length === 0;
  return (
    <div className="flex flex-col w-full h-full p-8 rounded-md overflow-hidden bg-slate-800">
      {!noGoals ? (
        <div className="flex flex-col gap-y-10">
          {highestGoal && (
            <div className="p-4 pb-8 rounded-md shadow-xl">
              <div className="flex justify-between mb-4">
                <p className="text-lg text-green-500">Most reachable goal</p>
                <div className="p-2 rounded-md bg-gray-900 bg-opacity-40 h-fit">
                  <GoArrowUp size={24} color="green" />
                </div>
              </div>
              <div className="flex flex-col gap-y-2 mb-4 mt-8">
                <GoalProgressionBar percentage={highestGoalProgression.percentage} />
                <div className="px-4">
                  <GoalsSavedAmount
                    goal={highestGoal}
                    pay={pay}
                    savedAmount={highestGoalProgression.totalAmount}
                    percentage={highestGoalProgression.percentage}
                  />
                </div>
              </div>
              <div>
                <p className="flex gap-x-2">
                  <span className="text-gray-400">Start date</span> {highestGoal.startDate}
                </p>
                <p className="flex gap-x-2">
                  <span className="text-gray-400">End date</span> {highestGoal.endDate}
                </p>
                <p className="mt-4">$ {formatNumber(highestGoal.target)}</p>
              </div>
            </div>
          )}
          {lowestGoal && (
            <div className="p-4 pb-8 rounded-md shadow-xl">
              <div className="flex justify-between mb-4">
                <p className="text-lg text-red-500">Least reachable goal</p>
                <div className="p-2 rounded-md bg-gray-900 bg-opacity-40 h-fit">
                  <GoArrowDown size={24} color="red" />
                </div>
              </div>
              <div className="flex flex-col gap-y-2 mb-4 mt-8">
                <GoalProgressionBar percentage={lowestGoalProgression.percentage} />
                <div className="px-4">
                  <GoalsSavedAmount
                    goal={lowestGoal}
                    pay={pay}
                    savedAmount={lowestGoalProgression.totalAmount}
                    percentage={lowestGoalProgression.percentage}
                  />
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
        <p className="text-xl text-gray-400">You currently have no savings goals</p>
      )}
      {!noGoals && <p className="text-xl text-gray-400 my-12">Savings goals overview</p>}
      <ul className="flex flex-col gap-y-12 px-4 pb-8 max-h-[1100px] overflow-y-auto">
        {[...sortedGoalsByProgression, ...reachedGoals].map((goal) => {
          return (
            <div key={goal.id}>
              <p className="flex gap-x-2">
                <span className="text-gray-400">Start date</span> {goal.startDate}
              </p>
              <p className="flex gap-x-2">
                <span className="text-gray-400">End date</span> {goal.endDate}
              </p>
              <p className="mt-4">$ {formatNumber(goal.target)}</p>
              <div className="flex flex-col gap-y-2 my-2">
                <GoalProgressionBar
                  percentage={calcGoalProgression(goal, expenses, pay).percentage}
                />
                <div className="px-4">
                  <GoalsSavedAmount
                    goal={goal}
                    pay={pay}
                    savedAmount={calcGoalProgression(goal, expenses, pay).totalAmount}
                    percentage={calcGoalProgression(goal, expenses, pay).percentage}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
