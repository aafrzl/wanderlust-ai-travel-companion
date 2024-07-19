"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import axios from "axios";
import { Loader2, Plane } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";

export interface Place {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
  address: {
    [key: string]: string;
  };
}

interface NomatimAutocompleteProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
}

export default function NomatimAutocomplete({
  form,
  name,
  label,
}: NomatimAutocompleteProps) {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length <= 2) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      setIsLoading(true);
      setOpen(true);

      try {
        const res = await axios.get<Place[]>(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: debouncedQuery,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          }
        );
        setSuggestions(res.data);
      } catch (error) {
        console.error(`Failed to fetch suggestions: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Plane className="absolute left-2 top-2.5 h-5 w-5 shrink-0" />
              <Input
                type="text"
                value={query}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                placeholder="Search Location..."
                className="max-w-[300px] pl-8"
              />
              {isLoading && (
                <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin" />
              )}
              {open && (
                <Command className="absolute top-full left-0 right-0 z-10 min-h-[240px] max-w-[300px] mt-2">
                  <CommandList>
                    {suggestions.length === 0 && !isLoading && (
                      <CommandEmpty>No result found.</CommandEmpty>
                    )}
                    <CommandGroup>
                      {suggestions.map((place) => (
                        <CommandItem
                          key={place.place_id}
                          value={place.place_id.toString()}
                          onSelect={() => {
                            setQuery(place.display_name);
                            field.onChange(place.display_name);
                            setOpen(false);
                          }}
                          className="space-y-4"
                        >
                          <span>{place.display_name}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
