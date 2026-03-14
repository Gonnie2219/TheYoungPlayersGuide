"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { citations } from "@/data/citations";
import { formatApa } from "@/lib/citations";
import type { CitationCategory } from "@/types";

const categories: { label: string; value: CitationCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Sleep", value: "sleep" },
  { label: "Nutrition", value: "nutrition" },
  { label: "Training", value: "training" },
  { label: "Mental Wellness", value: "mental-wellness" },
  { label: "Injury Prevention", value: "injury-prevention" },
  { label: "General", value: "general" },
];

export default function CitationsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    CitationCategory | "all"
  >("all");

  const filtered = citations.filter((c) => {
    const matchesCategory =
      activeCategory === "all" || c.category === activeCategory;
    if (!matchesCategory) return false;

    if (!search.trim()) return true;

    const query = search.toLowerCase();
    return (
      c.title.toLowerCase().includes(query) ||
      c.authors.some((a) => a.toLowerCase().includes(query))
    );
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Citations & References</h1>
      <p className="mt-2 text-muted-foreground">
        Academic sources backing the information in this guide. All references
        follow APA 7th edition format.
      </p>

      <div className="mt-6 space-y-4">
        <Input
          placeholder="Search by author or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
            >
              <Badge
                variant={activeCategory === cat.value ? "default" : "outline"}
              >
                {cat.label}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            References ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No citations match your search.
            </p>
          ) : (
            <ol className="space-y-4">
              {filtered.map((citation) => {
                const link = citation.doi
                  ? `https://doi.org/${citation.doi}`
                  : citation.url;

                return (
                  <li
                    key={citation.id}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    <Badge variant="secondary" className="mb-1 mr-2 text-[10px]">
                      {citation.category}
                    </Badge>
                    <span>{formatApa(citation)}</span>
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
          )}
        </CardContent>
      </Card>
    </main>
  );
}
