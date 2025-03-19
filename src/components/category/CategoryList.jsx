import useDataStore from "@/hooks/useDataStore";
import React from "react";
import CategoryCard from "./CategoryCard";

export default function CategoryList() {
  const { categories } = useDataStore();
  return (
    <div className="p-8 h-full rounded-md bg-slate-800">
      <h2 className="text-2xl text-gray-300 mb-8">Available categories</h2>
      <ul className="flex flex-wrap gap-8">
        {categories.map((category) => {
          return <CategoryCard key={category.id} category={category} />;
        })}
      </ul>
    </div>
  );
}
