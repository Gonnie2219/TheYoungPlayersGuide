import { ExternalLink } from "lucide-react";
import { citations } from "@/data/citations";
import { formatApa } from "@/lib/citations";
import type { CitationCategory } from "@/types";

interface CitationListProps {
  category?: CitationCategory;
}

export function CitationList({ category }: CitationListProps) {
  const filtered = category
    ? citations.filter((c) => c.category === category)
    : citations;

  return (
    <ol className="space-y-3 text-sm text-muted-foreground">
      {filtered.map((citation) => {
        const link = citation.doi
          ? `https://doi.org/${citation.doi}`
          : citation.url;

        return (
          <li key={citation.id} className="leading-relaxed">
            {formatApa(citation)}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1.5 inline-flex items-center text-primary hover:underline"
              >
                <ExternalLink className="size-3" />
              </a>
            )}
          </li>
        );
      })}
    </ol>
  );
}
