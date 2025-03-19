"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useDataStore from "@/hooks/useDataStore";
import useEditStore from "@/hooks/useEditStore";
import PrimaryBtn from "../btn/PrimaryBtn";
import { capitalize } from "@/utils/helpers";
const formSchema = z.object({
  category: z
    .string()
    .nonempty("Category is required")
    .min(3, "Provide atleast 3 characters")
    .max(25, "Maximum 25 characters allowed"),
  color: z.string().nonempty("Category color is required"),
  id: z.string(),
});

export default function CategoryForm() {
  const { categories, addCategory, editCategory } = useDataStore();
  const { editingCategory, updateEditingCategory } = useEditStore();

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      color: "#000000",
      id: "-1",
    },
  });

  const { setError, reset } = formMethods;

  useEffect(() => {
    if (editingCategory) {
      reset(editingCategory);
    }
  }, [editingCategory, reset]);

  function onSubmit(data) {
    const isDuplicateCategory = categories.some(
      (category) => category.category.trim().toLowerCase() === data.category.trim().toLowerCase()
    );

    if (isDuplicateCategory) {
      setError("category", {
        type: "manual",
        message: "Category alreday exists",
      });
      return;
    }

    if (editingCategory) {
      editCategory({ ...data, id: editingCategory.id });
      updateEditingCategory(undefined);
    } else {
      addCategory(data);
    }

    reset({
      category: "",
      color: "#000000",
      id: "-1",
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-24 p-8 h-full rounded-md bg-slate-800">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl text-gray-300">Create new category</h2>
        </div>
        <div className="flex flex-col items-start gap-y-16 px-12">
          <FormField
            control={formMethods.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    minLength={3}
                    maxLength={25}
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Category"
                    value={field.value} // Set the value from the form state
                    onChange={(e) => {
                      const capitalizedValue = capitalize(e.target.value);
                      field.onChange(capitalizedValue); // Update form state with capitalized value
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Write the name of your category. This will be used to split up your spending.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input
                    type="color"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    {...field}
                    className="w-20 h-10 border-0 outline-none bg-transparent cursor-pointer"
                  />
                </FormControl>
                <FormDescription>Click the box to match the catehory to a color</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="self-center md:self-stretch">
            <PrimaryBtn type="submit" fullWidth={false}>
              {editingCategory ? "Update category" : "Create category"}
            </PrimaryBtn>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
