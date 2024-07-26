"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import FormGeneratePlan from "../forms/form-generate-plan";
import { Button } from "../ui/button";
import { useState } from "react";

export default function CreateTravelPlan() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
    >
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-dashed h-full max-w-[450px] flex items-center gap-x-2 hover:border-primary hover:bg-background transition-all duration-300 ease-in-out"
        >
          <PlusCircle className="w-6 h-6 mr-2" />
          <span className="text-lg font-semibold">Create Travel Plan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[450px] sm:w-full rounded-xl">
        <DialogHeader>
          <DialogTitle>Create Travel Plan</DialogTitle>
          <DialogDescription>
            Let&apos;s get started by generating your travel plan. 🚀
          </DialogDescription>
        </DialogHeader>
        <FormGeneratePlan setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
