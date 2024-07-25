import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import FormGeneratePlan from "../forms/form-generate-plan";
import { Button } from "../ui/button";

export default function CreateTravelPlan() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-[450px] h-full border border-dashed flex items-center justify-center"
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
        <FormGeneratePlan />
      </DialogContent>
    </Dialog>
  );
}
