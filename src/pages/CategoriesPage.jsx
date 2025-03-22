import useDataStore from "@/hooks/useDataStore";
import CategoryForm from "../components/category/CategoryForm";
import CategoryList from "@/components/category/CategoryList";
import CategoryUsage from "@/components/category/CategoryUsage";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { BiCategory } from "react-icons/bi";
import InfoCard from "@/components/dashboard/InfoCard";
import Shimmer from "@/layouts/animations/Shimmer";

export default function CategoriesPage() {
  const { categories, expenses } = useDataStore();

  const numCategoires = categories.length;

  const categoryFrequency = expenses.reduce((acc, curr) => {
    if (!acc[curr.spendingCategory]) {
      acc[curr.spendingCategory] = 1;
    } else {
      acc[curr.spendingCategory] += 1;
    }
    return acc;
  }, {});

  const numUsedCategoires = Object.keys(categoryFrequency).length;
  const percentageUsedCategories = Math.round((numUsedCategoires / numCategoires) * 100);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[repeat(8,1fr)] lg:grid-rows-[repeat(6,1fr)] gap-8 lg:min-h-screen p-8">
      <div className="lg:hidden grid grid-cols-[repeat(2,1fr)] gap-8 overflow-x-auto min-h-[180px]">
        <Shimmer>
          <SummaryCard
            value={numUsedCategoires}
            percentage={`${percentageUsedCategories}% used`}
            description="Total count and percentage of available categories utilized by recorded expenses"
            isFavorable={numUsedCategoires > 0}
          />
        </Shimmer>
        <Shimmer>
          <InfoCard
            headline={numCategoires}
            description="Total number of available categories"
            icon={<BiCategory size={24} color="white" />}
          />
        </Shimmer>
      </div>
      <div className="hidden lg:block col-span-3 col-start-1 row-span-1">
        <Shimmer minHeight={180}>
          <SummaryCard
            value={numUsedCategoires}
            percentage={`${percentageUsedCategories}% used`}
            description="Total count and percentage of available categories utilized by recorded expenses"
            isFavorable={numUsedCategoires > 0}
          />
        </Shimmer>
      </div>
      <div className="hidden lg:block col-span-3 col-start-4 row-span-1">
        <Shimmer minHeight={180}>
          <InfoCard
            headline={numCategoires}
            description="Total number of available categories"
            icon={<BiCategory size={24} color="white" />}
          />
        </Shimmer>
      </div>
      <div className="lg:row-start-2 lg:col-start-1 lg:col-span-6 lg:row-span-3">
        <Shimmer minHeight={700}>
          <CategoryForm />
        </Shimmer>
      </div>

      <div className="lg:row-start-5 lg:col-start-1 lg:col-span-6 lg:row-span-8">
        <Shimmer minHeight={700}>
          <CategoryList />
        </Shimmer>
      </div>

      <div className="col-span-5 row-start-1 row-span-12">
        <Shimmer minHeight={900}>
          <CategoryUsage />
        </Shimmer>
      </div>
    </div>
  );
}
