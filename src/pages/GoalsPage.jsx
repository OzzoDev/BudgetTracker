import InfoCard from "@/components/dashboard/InfoCard";
import SummaryCard from "@/components/dashboard/SummaryCard";
import GoalsForm from "@/components/goal/GoalsForm";
import GoalsOverview from "@/components/goal/GoalsOverview";
import GoalsRecord from "@/components/goal/GoalsRecord";
import useDataStore from "@/hooks/useDataStore";
import Shimmer from "@/layouts/animations/Shimmer";
import { calcGoalProgression } from "@/utils/helpers";
import { FaRegChartBar } from "react-icons/fa";

export default function GoalsPage() {
  const { pay, goals, expenses } = useDataStore();

  const numGoals = goals.length;

  const reachedGoals = [...goals].filter(
    (goal) => calcGoalProgression(goal, expenses, pay).percentage >= 1
  );

  const percentageReachedGoals = Math.round(
    (goals.length > 0 ? reachedGoals.length / goals.length : 0) * 100
  );

  const reachableGoals = [...goals].filter(
    (goal) =>
      calcGoalProgression(goal, expenses, pay).percentage >= 0.82 &&
      calcGoalProgression(goal, expenses, pay).percentage < 1
  );

  const percentageReachableGoals = Math.round(
    (goals.length > 0 ? reachableGoals.length / goals.length : 0) * 100
  );

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[repeat(14,1fr)] lg:grid-rows-[repeat(6,1fr)] gap-8 lg:min-h-screen p-8">
      <div className="lg:hidden grid grid-cols-[repeat(3,1fr)] gap-8 overflow-x-auto min-h-[180px]">
        <Shimmer>
          <SummaryCard
            value={reachableGoals.length}
            percentage={`${percentageReachableGoals}% reachable`}
            description="An approximation of how many goals can be achieved by considering expenses and the amount to save"
            isFavorable={reachableGoals.length > 0}
          />
        </Shimmer>
        <Shimmer>
          <SummaryCard
            value={reachedGoals.length}
            percentage={`${percentageReachedGoals}% reached`}
            description="Savings goals that have been reached"
            isFavorable={reachedGoals.length > 0}
          />
        </Shimmer>
        <Shimmer>
          <InfoCard
            headline={numGoals}
            description="Total number of savings goals you have set"
            icon={<FaRegChartBar size={24} color="white" />}
          />
        </Shimmer>
      </div>
      <div className="hidden lg:block col-span-4 col-start-1 row-span-1">
        <Shimmer>
          <SummaryCard
            value={reachableGoals.length}
            percentage={`${percentageReachableGoals}% reachable`}
            description="An approximation of how many goals can be achieved by considering expenses and the amount to save"
            isFavorable={reachableGoals.length > 0}
          />
        </Shimmer>
      </div>
      <div className="hidden lg:block col-span-3 col-start-5 row-span-1">
        <Shimmer>
          <SummaryCard
            value={reachedGoals.length}
            percentage={`${percentageReachedGoals}% reached`}
            description="Savings goals that have been reached"
            isFavorable={reachedGoals.length > 0}
          />
        </Shimmer>
      </div>
      <div className="hidden lg:block col-span-3 col-start-8 row-span-1">
        <Shimmer>
          <InfoCard
            headline={numGoals}
            description="Total number of savings goals you have set"
            icon={<FaRegChartBar size={24} color="white" />}
          />
        </Shimmer>
      </div>
      <div className="lg:row-start-2 lg:col-start-1 lg:col-span-10 lg:row-span-3">
        <Shimmer minHeight={1000}>
          <GoalsForm />
        </Shimmer>
      </div>
      <div className="lg:row-start-5 lg:col-start-1 lg:col-span-10 lg:row-span-8">
        <Shimmer minHeight={500}>
          <GoalsRecord />
        </Shimmer>
      </div>
      <div className="col-span-4 col-start-11 row-start-1 row-span-12">
        <Shimmer minHeight={1200}>
          <GoalsOverview />
        </Shimmer>
      </div>
    </div>
  );
}
