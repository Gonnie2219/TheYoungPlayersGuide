"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { citationMap, citations } from "@/data/citations";
import { formatApa } from "@/lib/citations";

interface CitationRefProps {
  id: string;
}

export function CitationRef({ id }: CitationRefProps) {
  const citation = citationMap.get(id);
  if (!citation) return null;

  const index = citations.findIndex((c) => c.id === id) + 1;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-help text-primary hover:underline align-super text-[0.6em] font-medium">
          [{index}]
        </TooltipTrigger>
        <TooltipContent className="max-w-sm text-xs">
          {formatApa(citation)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
