import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import useDataStore from "@/hooks/useDataStore";
import useEditStore from "@/hooks/useEditStore";
import DefaultBtn from "../btn/DefaultBtn";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";
import DeleteBtn from "../btn/DeleteBtn";

export default function CategoryCard({ category }) {
  const { deleteCategory } = useDataStore();
  const { updateEditingCategory } = useEditStore();

  const handleDeleteCategory = () => {
    toast("Delete notification", {
      description: `Category "${category.category}" deleted`,
    });
    deleteCategory(category.id);
  };

  return (
    <div className="flex flex-col gap-y-4 p-4 w-[200px] rounded-sm bg-slate-900 bg-opacity-50">
      <div
        style={{ backgroundColor: category.color }}
        className="h-2 w-full rounded-full shadow-md"
      />
      <p>{category.category}</p>
      <div className="flex justify-end gap-x-4 w-full">
        <DefaultBtn onClick={() => updateEditingCategory(category)}>
          <FaRegEdit size={20} color="cyan" />
        </DefaultBtn>
        <DeleteBtn iconSize={20} onDelete={() => handleDeleteCategory()} />
      </div>
    </div>
  );
}
