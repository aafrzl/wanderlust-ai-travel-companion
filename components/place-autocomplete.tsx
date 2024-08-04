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
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";

export interface MapboxPlace {
  id: string;
  place_name: string;
  center: [number, number];
  place_type: string[];
  properties: {
    [key: string]: any;
  };
}

interface MapboxAutocompleteProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  query: string;
  setQuery: (query: string) => void;
}

export default function MapboxAutocomplete({
  form,
  name,
  label,
  setQuery,
  query,
}: MapboxAutocompleteProps) {
  const debouncedQuery = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<MapboxPlace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.trim().length === 0) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      setIsLoading(true);
      setOpen(true);

      try {
        const res = await axios.get<{ features: MapboxPlace[] }>(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            debouncedQuery
          )}.json`,
          {
            params: {
              access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
              limit: 5,
              autocomplete: true,
            },
          }
        );
        setSuggestions(res.data.features);
      } catch (error) {
        console.error(`Failed to fetch suggestions: ${error}`);
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedQuery]
  );

  useEffect(() => {
    if (debouncedQuery !== query) {
      fetchSuggestions(debouncedQuery);
    }
  }, [debouncedQuery, fetchSuggestions, query]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      if (newQuery.trim().length > 0) {
        setOpen(true);
      } else {
        setSuggestions([]);
        setOpen(false);
      }
    },
    [setQuery]
  );

  const handleSelectPlace = useCallback(
    (place: MapboxPlace) => {
      setQuery(place.place_name);
      form.setValue(name, place.place_name);
      setSuggestions([]);
      setOpen(false);
    },
    [setQuery, form, name]
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Plane className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 shrink-0" />
              <Input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => query.length > 2 && setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 200)}
                placeholder="Search Location..."
                className="w-full pl-7"
              />
              {isLoading && (
                <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin" />
              )}
              {open && (
                <Command className="absolute top-full left-0 right-0 z-10 min-h-[240px] w-full mt-2">
                  <CommandList>
                    {suggestions.length === 0 && !isLoading && (
                      <CommandEmpty>No result found.</CommandEmpty>
                    )}
                    <CommandGroup>
                      {suggestions.map((place) => (
                        <CommandItem
                          key={place.id}
                          value={place.id}
                          onSelect={() => handleSelectPlace(place)}
                          className="space-y-4"
                        >
                          <span>{place.place_name}</span>
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
