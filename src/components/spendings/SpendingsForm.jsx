import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getTodayString } from "@/utils/helpers";
import useEditStore from "@/hooks/useEditStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import useDataStore from "@/hooks/useDataStore";
import { useEffect, useState } from "react";
import PrimaryBtn from "../btn/PrimaryBtn";
import { toast } from "sonner";

const formSchema = z.object({
  spendingCategory: z.string().nonempty("Spending category is required").min(2, {
    message: "Spending category must be at least 2 characters.",
  }),
  dateSpent: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Date of expense must be a valid date",
  }),
  totalAmount: z
    .number("Total spending amout is required")
    .positive("Total spending amout is required and must be greater than 0"),
});

export default function SpendingsForm() {
  const { categories, addExpense, editExpense } = useDataStore();
  const { editingExpense, updateEditingExpense } = useEditStore();

  const [date, setDate] = useState(new Date());

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateSpent: getTodayString(),
      spendingCategory: "",
      totalAmount: 0,
    },
  });

  const {
    reset,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (editingExpense) {
      reset({
        ...editingExpense,
        dateSpent: new Date(editingExpense.dateSpent).toISOString(),
        spendingCategory: editingExpense.spendingCategory || "",
        totalAmount: editingExpense.totalAmount || 0,
      });
      setDate(new Date(editingExpense.dateSpent));
    } else {
      reset({ dateSpent: new Date().toISOString() });
      setDate(new Date());
    }
  }, [editingExpense, reset]);

  function onSubmit(data) {
    const formattedData = { ...data, dateSpent: data.dateSpent.split("T")[0] };

    if (editingExpense) {
      editExpense({ ...formattedData, id: editingExpense.id });
      updateEditingExpense(undefined);
      toast("Expense edited notification", {
        description: `Expense "${formattedData.spendingCategory}, $${formattedData.totalAmount}, ${formattedData.dateSpent} edited successfully"`,
      });
    } else {
      addExpense(formattedData);
      toast("Expense added notification", {
        description: "Expense added to spending records successfully",
      });
    }
    reset({
      spendingCategory: "",
      dateSpent: getTodayString(),
      totalAmount: 0,
    });
    setDate(new Date());
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-24 p-8 h-full rounded-md bg-slate-800">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl text-gray-300">Add new expense</h2>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-16 justify-between px-12">
          <div className="flex flex-col gap-y-16 w-full">
            <FormField
              control={control}
              name="spendingCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spending Category</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}>
                    <SelectTrigger className="bg-transparent">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="text-white border-transparent bg-slate-800">
                      {categories.map((category) => {
                        return (
                          <SelectItem key={category.id} value={category.category}>
                            {category.category}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500">
                    {errors.spendingCategory?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount spent</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="60$"
                      value={field.value || ""}
                      autoComplete="off"
                      spellCheck="false"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? parseFloat(value) : 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">{errors.totalAmount?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="self-center md:self-stretch">
              <PrimaryBtn type="submit" fullWidth={false}>
                {editingExpense ? "Update expense" : "Add expense"}
              </PrimaryBtn>
            </div>
          </div>
          <FormField
            control={control}
            name="dateSpent"
            render={() => (
              <FormItem>
                <FormLabel>Date of expense</FormLabel>
                <Calendar
                  animate
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    form.setValue("dateSpent", selectedDate.toLocaleDateString("en-CA"));
                  }}
                  className="self-center p-0 h-[300px]"
                />
                <FormMessage className="text-red-500">
                  {form.formState.errors.dateSpent?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
