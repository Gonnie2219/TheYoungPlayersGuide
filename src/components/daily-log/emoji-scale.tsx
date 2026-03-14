"use client";

import { Button } from "@/components/ui/button";

interface EmojiScaleProps {
  value: number | null;
  onChange: (v: number) => void;
  emojis: string[];
  labels?: string[];
}

export function EmojiScale({ value, onChange, emojis, labels }: EmojiScaleProps) {
  return (
    <div className="flex gap-1 sm:gap-2">
      {emojis.map((emoji, i) => {
        const rating = i + 1;
        const selected = value === rating;
        return (
          <Button
            key={rating}
            type="button"
            variant="ghost"
            onClick={() => onChange(rating)}
            className={`flex h-10 w-10 flex-col items-center justify-center text-lg sm:h-12 sm:w-12 sm:text-xl ${
              selected ? "bg-primary/15 ring-2 ring-primary" : ""
            }`}
          >
            <span>{emoji}</span>
            {labels && (
              <span className="text-[10px] leading-tight text-muted-foreground">
                {labels[i]}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
