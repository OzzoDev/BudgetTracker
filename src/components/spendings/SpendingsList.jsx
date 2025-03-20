import useDataStore from "@/hooks/useDataStore";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import DeleteBtn from "../btn/DeleteBtn";
import { toast } from "sonner";
import useEditStore from "@/hooks/useEditStore";
import DefaultBtn from "../btn/DefaultBtn";
import { formatNumber } from "@/utils/helpers";

export default function SpendingsList({ expenses }) {
  const { deleteExpense } = useDataStore();
  const { updateEditingExpense } = useEditStore();

  const noExpenses = expenses.length === 0;

  const handleDeleteExpense = (expenseID) => {
    toast("Delete notification", {
      description: "Expense deleted",
    });
    deleteExpense(expenseID);
  };

  return (
    <>
      {!noExpenses ? (
        <>
          <div className="lg:px-12">
            <Table>
              <TableHeader>
                <TableRow className="transition-all duration-300 ease hover:bg-gray-900 bg-opacity-40!">
                  <TableHead>Date of expense</TableHead>
                  <TableHead>Spending Category</TableHead>
                  <TableHead>Amount spent</TableHead>
                  <TableHead className="text-right px-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow
                    key={expense.id}
                    className="transition-all duration-300 ease hover:bg-gray-900 bg-opacity-40">
                    <TableCell>{expense.dateSpent}</TableCell>
                    <TableCell>{expense.spendingCategory}</TableCell>
                    <TableCell>$ {formatNumber(expense.totalAmount)}</TableCell>
                    <TableCell className="flex justify-end gap-x-6 mx-8">
                      <DefaultBtn onClick={() => updateEditingExpense(expense)}>
                        <FaRegEdit size={20} color="cyan" />
                      </DefaultBtn>
                      <DeleteBtn iconSize={20} onDelete={() => handleDeleteExpense(expense.id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <p className="text-gray-400">No expenses recorded.</p>
      )}
    </>
  );
}
