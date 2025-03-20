import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatNumber } from "@/utils/helpers";
import useDataStore from "@/hooks/useDataStore";
import PrimaryBtn from "../btn/PrimaryBtn";
import { toast } from "sonner";

const formSchema = z.object({ pay: z.number().positive() });

export default function IncomeForm() {
  const { pay, updatePay } = useDataStore();

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { pay },
  });

  const { reset, control } = formMethods;

  function onSubmit(data) {
    updatePay(data.pay);
    toast("Income update notification", {
      description: `Income has successfully been updated to $ ${formatNumber(data.pay)}`,
    });
    reset({ pay: data.pay });
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-12 lg:gap-y-24 p-8 h-full rounded-md bg-slate-800">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl text-gray-300">Update your monlty income</h2>
        </div>
        <FormField
          control={formMethods.control}
          name="pay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montly Income ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter income"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? parseFloat(value) : 0);
                  }}
                />
              </FormControl>
              <FormDescription>
                Please enter your monthly income in dollars, which will be used to determine whether
                you can achieve your savings goals
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <PrimaryBtn type="submit" fullWidth={false}>
          Update income
        </PrimaryBtn>
      </form>
    </FormProvider>
  );
}
