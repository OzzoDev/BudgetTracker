import React from "react";
import DefaultBtn from "../btn/DefaultBtn";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDataStore from "@/hooks/useDataStore";

export default function SpendingsFilters({ expenses, setExpenses }) {
  const { categories } = useDataStore();

  const sortByExpensive = () => {
    const sortedExpenses = [...expenses].sort((a, b) => b.totalAmount - a.totalAmount);
    setExpenses(sortedExpenses);
  };

  const sortByCheap = () => {
    const sortedExpenses = [...expenses].sort((a, b) => a.totalAmount - b.totalAmount);
    setExpenses(sortedExpenses);
  };

  const sortByCategory = (selectedCategory) => {
    const filteredExpenses = [...expenses].filter((expense) =>
      !selectedCategory ? true : expense.spendingCategory === selectedCategory
    );
    setExpenses(filteredExpenses);
  };

  return (
    <div className="flex flex-col gap-y-4 pl-4 my-6">
      <p className="text-lg text-gray-400">Filters</p>
      <div className="flex flex-col md:flex-row gap-x-12 gap-y-4">
        <div className="flex gap-x-6">
          <DefaultBtn onClick={sortByExpensive}>
            <div className="flex flex-col items-center gap-y-2">
              <div className="p-2 rounded-md bg-gray-900 bg-opacity-40">
                <GoArrowDown size={24} color="red" />
              </div>
              <span className="text-xs text-gray-400">Expensive</span>
            </div>
          </DefaultBtn>
          <DefaultBtn onClick={sortByCheap}>
            <div className="flex flex-col items-center gap-y-2">
              <div className="p-2 rounded-md bg-gray-900 bg-opacity-40">
                <GoArrowUp size={24} color="green" />
              </div>
              <span className="text-xs text-gray-400">Cheap</span>
            </div>
          </DefaultBtn>
        </div>
        <Select onValueChange={(value) => sortByCategory(value)}>
          <SelectTrigger className="bg-transparent">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="text-white border-transparent bg-slate-800">
            <SelectItem value={null}>Every category</SelectItem>
            {categories.map((category) => {
              return (
                <SelectItem key={category.id} value={category.category}>
                  {category.category}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
