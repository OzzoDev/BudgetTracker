import useDataStore from "@/hooks/useDataStore";

export default function CategoryColorMap() {
  const { categories } = useDataStore();

  return (
    <ul className="flex flex-col gap-y-4 p-8 rounded-md w-full h-full bg-slate-800">
      {categories.map((category) => {
        return (
          <li key={category.id} className="flex items-center gap-x-2">
            <div
              style={{ backgroundColor: category.color }}
              className="h-3 w-3 rounded-full shadow-md"
            />
            <p>{category.category}</p>
          </li>
        );
      })}
    </ul>
  );
}
