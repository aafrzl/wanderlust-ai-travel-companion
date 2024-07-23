"use client";

import { budgetList } from "@/constants";
import { generatePlan } from "@/helpers/actions/generate-plan";
import { TravelPlanSchema, TravelPlanType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import NomatimAutocomplete from "../nomatim-autocomplete";
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

export default function FormGeneratePlan() {
  const [isCustomBudget, setIsCustomBudget] = useState(false);

  const form = useForm<TravelPlanType>({
    resolver: zodResolver(TravelPlanSchema),
    defaultValues: {
      location: "",
      people: 1,
      budget: "",
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
      });
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
        />
        <DateRangePicker
          form={form}
          name="days"
          label="How long are you travel for?"
        />
        <FormField
          control={form.control}
          name="people"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many people are traveling?</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="max-w-[300px]"
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
              <FormLabel>Select your budget</FormLabel>
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
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
                    <Input
                      placeholder="Enter custom budget (optional)"
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value || undefined);
                      }}
                      className="mt-4 max-w-[300px]"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="font-medium"
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
