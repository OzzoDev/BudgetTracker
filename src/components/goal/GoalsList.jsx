import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import useDataStore from "@/hooks/useDataStore";
import useEditStore from "@/hooks/useEditStore";
import { toast } from "sonner";
import DefaultBtn from "../btn/DefaultBtn";
import { FaRegEdit } from "react-icons/fa";
import DeleteBtn from "../btn/DeleteBtn";
import { formatNumber } from "@/utils/helpers";

export default function GoalsList() {
  const { goals, deleteGoal } = useDataStore();
  const { updateEditingGoal } = useEditStore();

  const handleDeleteGoal = (goalID) => {
    toast("Delete notification", {
      description: "Savings goal deleted",
    });
    deleteGoal(goalID);
  };

  const noGoals = goals.length === 0;

  return (
    <>
      {!noGoals ? (
        <>
          <div className="lg:px-12">
            <Table>
              <TableHeader>
                <TableRow className="transition-all duration-300 ease hover:bg-gray-900 bg-opacity-40!">
                  <TableHead>Start date</TableHead>
                  <TableHead>End date</TableHead>
                  <TableHead>Saving goal</TableHead>
                  <TableHead className="text-right px-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goals.map((goal) => (
                  <TableRow
                    key={goal.id}
                    className="transition-all duration-300 ease hover:bg-gray-900 bg-opacity-40">
                    <TableCell>{goal.startDate}</TableCell>
                    <TableCell>{goal.endDate}</TableCell>
                    <TableCell>$ {formatNumber(goal.target)}</TableCell>
                    <TableCell className="flex justify-end gap-x-6 mx-8">
                      <DefaultBtn onClick={() => updateEditingExpense(goal)}>
                        <FaRegEdit size={20} color="cyan" />
                      </DefaultBtn>
                      <DeleteBtn iconSize={20} onDelete={() => handleDeleteGoal(goal.id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <p className="text-gray-400">No savings goals set</p>
      )}
    </>
  );
}
