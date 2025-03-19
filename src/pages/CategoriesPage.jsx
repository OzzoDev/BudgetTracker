import useDataStore from "@/hooks/useDataStore";
import CategoryForm from "../components/category/CategoryForm";
import CategoryCard from "@/components/category/CategoryCard";
import CategoryList from "@/components/category/CategoryList";
import CategoryUsage from "@/components/category/CategoryUsage";
import SummaryCard from "@/components/dashboard/SummaryCard";

export default function CategoriesPage() {
  const { categories } = useDataStore();

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[repeat(8,1fr)] lg:grid-rows-[repeat(6,1fr)] gap-8 lg:min-h-screen p-8">
      <div className="lg:hidden grid grid-cols-[repeat(3,1fr)] gap-8 overflow-x-auto">
        <SummaryCard
          value={`$${3000}`}
          percentage={80}
          description="Percentage of pay that are used for expenses"
        />
        <SummaryCard value={`${5}`} percentage={120} description="Total categories used" />
        <SummaryCard value={`${5}`} percentage={120} description="Total categories used" />
      </div>
      <div className="hidden lg:block col-span-3 col-start-1 row-span-1">
        <SummaryCard
          value={`$${3000}`}
          percentage={80}
          description="Percentage of pay that are used for expenses"
        />
      </div>
      <div className="hidden lg:block col-span-3 col-start-4 row-span-1">
        <SummaryCard value={`${5}`} percentage={120} description="Total categories used" />
      </div>
      <div className="lg:row-start-2 lg:col-start-1 lg:col-span-6 lg:row-span-3">
        <CategoryForm />
      </div>

      <div className="lg:row-start-5 lg:col-start-1 lg:col-span-6 lg:row-span-8">
        <CategoryList />
      </div>

      <div className="col-span-5 row-start-1 row-span-12">
        <CategoryUsage />
      </div>
    </div>
  );
}
