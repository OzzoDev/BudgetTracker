import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
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
import { Calendar } from "@/components/ui/calendar";
import { getFutureDateString, getTodayString } from "@/utils/helpers";
import useDataStore from "@/hooks/useDataStore";
import useEditStore from "@/hooks/useEditStore";
import { useEffect, useState } from "react";
import PrimaryBtn from "../btn/PrimaryBtn";

const formSchema = z
  .object({
    id: z.string(),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "startDate must be a valid date",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "endDate must be a valid date",
    }),
    target: z.number().positive(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      const diffInDays = (end - start) / (1000 * 60 * 60 * 24);

      console.log("Day diff: ", diffInDays);

      return diffInDays >= 30;
    },
    {
      message: "End date must be at least 30 days after start date",
      path: ["endDate"],
    }
  );

export default function GoalsForm({ editingGoal }) {
  const { addGoal, editGoal } = useDataStore();
  const { updateEditingGoal } = useEditStore();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const initialEndDate = new Date(startDate);
    initialEndDate.setDate(initialEndDate.getDate() + 30);
    return initialEndDate;
  });

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "-1",
      startDate: getTodayString(),
      endDate: getFutureDateString(30),
      target: 1000,
    },
  });

  const { reset, setValue, control } = formMethods;

  useEffect(() => {
    if (editingGoal) {
      reset(editingGoal);
    }
  }, [editingGoal, reset]);

  function onSubmit(data) {
    if (editingGoal) {
      editGoal({ ...data, id: editingGoal.id });
      updateEditingGoal(undefined);
    } else {
      addGoal(data);
    }
    reset({
      id: "-1",
      startDate: getTodayString(),
      endDate: getFutureDateString(30),
      target: 1000,
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-24 p-8 h-full rounded-md bg-slate-800">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl text-gray-300">Set new saving goal</h2>
        </div>
        <div className="flex justify-between">
          <FormField
            control={control}
            name="startDate"
            render={() => (
              <FormItem>
                <FormLabel>Start goal at</FormLabel>
                <Calendar
                  animate
                  mode="single"
                  selected={startDate}
                  onSelect={(selectedDate) => {
                    setStartDate(selectedDate);
                    setValue("startDate", selectedDate.toLocaleDateString("en-CA"));
                  }}
                  className="self-center p-0 h-[300px]"
                />
                <FormMessage className="text-red-500">
                  {formMethods.formState.errors.startDate?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-between w-full px-24">
            <FormField
              control={formMethods.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter saving goal"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? parseFloat(value) : 0);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter amount in ($) you want to save within a given time span
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="self-center">
              <PrimaryBtn type="submit" fullWidth={false}>
                {editingGoal ? "Update goal" : "Set goal"}
              </PrimaryBtn>
            </div>
          </div>
          <FormField
            control={control}
            name="endDate"
            render={() => (
              <FormItem>
                <FormLabel>End goal at</FormLabel>
                <Calendar
                  animate
                  mode="single"
                  renderDate={endDate}
                  selected={endDate}
                  onSelect={(selectedDate) => {
                    setEndDate(selectedDate);
                    setValue("endDate", selectedDate.toLocaleDateString("en-CA"));
                  }}
                  className="self-center p-0 h-[300px]"
                />
                <FormMessage className="text-red-500">
                  {formMethods.formState.errors.endDate?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        {/* <FormField
          control={formMethods.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start at</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Enter start date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End at</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Enter end date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </form>
    </FormProvider>
  );
}
