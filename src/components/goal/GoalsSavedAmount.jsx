import { calcTotalIncome, formatNumber } from "@/utils/helpers";

export default function GoalsSavedAmount({ goal, pay, savedAmount, percentage }) {
  const totalIncome = calcTotalIncome(goal, pay).totalIncome;

  const remaining = Math.round(goal.target - (totalIncome - savedAmount));

  const moneyLeft = Math.round(totalIncome - savedAmount - goal.target);

  const isGoalReached = remaining <= 0;

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <p>$ {formatNumber(Math.round(totalIncome - savedAmount))}</p>
        <p>/</p>
        <p>$ {formatNumber(goal.target)}</p>
        <p>({Math.round(percentage * 100)}%)</p>
      </div>
      {isGoalReached ? (
        <p className="px-1 mt-1 text-sm text-green-400">
          Goal reached + $ {formatNumber(moneyLeft)}
        </p>
      ) : (
        <p className="px-1 mt-1 text-sm text-red-400">$ {formatNumber(remaining)} missing</p>
      )}
    </div>
  );
}
