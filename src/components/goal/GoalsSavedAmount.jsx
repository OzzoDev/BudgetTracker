import { formatNumber } from "@/utils/helpers";

export default function GoalsSavedAmount({ pay, target, savedAmount, percentage }) {
  return (
    <div className="flex items-center gap-x-2">
      <p>$ {formatNumber(pay - savedAmount)}</p>
      <p>/</p>
      <p>$ {formatNumber(target)}</p>
      <p>({percentage * 100}%)</p>
    </div>
  );
}
