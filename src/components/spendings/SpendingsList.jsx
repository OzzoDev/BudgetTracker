import React, { useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const EXPENSES_PER_PAGE = 10;

export default function SpendingsList() {
  const { expenses, deleteExpense } = useDataStore();
  const { updateEditingExpense } = useEditStore();
  const [currentPage, setCurrentPage] = useState(1);

  const totalExpenses = expenses.length;
  const totalPages = Math.ceil(totalExpenses / EXPENSES_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentItems = expenses.slice(
    (currentPage - 1) * EXPENSES_PER_PAGE,
    currentPage * EXPENSES_PER_PAGE
  );

  const noExpenses = expenses.length === 0;

  const handleDeleteExpense = (expenseID) => {
    toast("Delete notification", {
      description: "Expense deleted",
    });
    deleteExpense(expenseID);
  };

  return (
    <div className="p-8 relative rounded-md bg-slate-800 h-full">
      <h2 className="text-2xl text-gray-300 mb-8">Your spending records</h2>
      {!noExpenses ? (
        <>
          <div className="px-12">
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
                {currentItems.map((expense) => (
                  <TableRow
                    key={expense.id}
                    className="transition-all duration-300 ease hover:bg-gray-900 bg-opacity-40">
                    <TableCell>{expense.dateSpent}</TableCell>
                    <TableCell>{expense.spendingCategory}</TableCell>
                    <TableCell>${expense.totalAmount}</TableCell>
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

          <Pagination className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                return (
                  <PaginationItem key={pageNum}>
                    {pageNum === currentPage ? (
                      <span>{pageNum}</span>
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNum);
                        }}>
                        {pageNum}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <p className="text-gray-400">No expenses recorded.</p>
      )}
    </div>
  );
}
