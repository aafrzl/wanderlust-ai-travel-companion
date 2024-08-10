"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Loader, Trash } from "lucide-react";
import { deletePlan } from "@/helpers/actions/delete-plan";
import { toast } from "sonner";

export default function AlertModalDelete({
  travelPlanId,
}: {
  travelPlanId: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    toast.loading("Deleting travel plan...", {
      id: "delete-travel-plan",
    });
    try {
      await deletePlan(travelPlanId);
      toast.success("Travel plan deleted successfully", {
        id: "delete-travel-plan",
      });
    } catch (error) {
      toast.error("Error when deleting travel plan", {
        id: "delete-travel-plan",
      });
      console.error("Error when deleting travel plan", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className="flex items-center gap-x-2"
        >
          <Trash className="w-4 h-4 shrink-0" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[450px] sm:w-full rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this item?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-foreground"
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
            <span>Continue</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
