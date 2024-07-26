"use client";

import { budgetList } from "@/constants";
import { generatePlan } from "@/helpers/actions/generate-plan";
import { TravelPlanSchema, TravelPlanType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Sparkles } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import NomatimAutocomplete from "../nomatim-autocomplete";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DateRangePicker } from "../ui/date-range-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

export default function FormGeneratePlan({ setIsOpen }: Props) {
  const [isCustomBudget, setIsCustomBudget] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const form = useForm<TravelPlanType>({
    resolver: zodResolver(TravelPlanSchema),
    defaultValues: {
      location: "",
      people: 1,
      budget: "",
      days: undefined,
    },
  });

  const onSubmit = async (values: TravelPlanType) => {
    try {
      await generatePlan(values);
      toast.success("Plan generated successfully");
      form.reset({
        location: "",
        people: 1,
        budget: "",
        days: undefined,
      });
      setLocationQuery("");
      setDateRange(undefined);
      setIsOpen(false);
    } catch (error: any) {
      toast.error("Failed to generate plan", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <NomatimAutocomplete
          form={form}
          name="location"
          label="Where are you traveling to?"
          setQuery={setLocationQuery}
          query={locationQuery}
        />
        <DateRangePicker
          form={form}
          name="days"
          label="How long are you travel for?"
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        <FormField
          control={form.control}
          name="people"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base sm:text-xl font-bold">
                How many people are traveling?
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base sm:text-xl font-bold">
                How much are you planning to spend?
              </FormLabel>
              <FormControl>
                <div className="space-y-5">
                  <RadioGroup
                    onValueChange={(value) => {
                      if (value === "custom") {
                        setIsCustomBudget(true);
                        field.onChange(undefined);
                      } else {
                        setIsCustomBudget(false);
                        field.onChange(value);
                      }
                    }}
                    value={isCustomBudget ? "custom" : field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    {budgetList.map((budget) => (
                      <FormItem key={budget.id}>
                        <FormControl>
                          <RadioGroupItem
                            value={budget.value}
                            id={budget.id}
                            className="peer sr-only"
                          />
                        </FormControl>
                        <label
                          htmlFor={budget.id}
                          className="flex flex-col h-full rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <Card className="h-full">
                            <CardHeader>
                              <CardTitle>{budget.label}</CardTitle>
                              <CardDescription className="text-xs">
                                {budget.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </label>
                      </FormItem>
                    ))}
                  </RadioGroup>
                  {isCustomBudget && (
                    <div className="relative">
                      <Badge
                        className="absolute top-1/2 left-2 -translate-y-1/2"
                        variant={"outline"}
                      >
                        IDR
                      </Badge>
                      <Input
                        placeholder="Enter custom budget (optional)"
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value || undefined);
                        }}
                        className="mt-4 w-full pl-14"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="font-medium w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 mr-2" />
          )}
          <span>
            {form.formState.isSubmitting ? "Generating Plan" : "Generate Plan"}
          </span>
        </Button>
      </form>
    </Form>
  );
}
