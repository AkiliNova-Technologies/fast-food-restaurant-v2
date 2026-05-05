"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

type StatItem = {
  title: string;
  value: string | number;
  change?: number;
  description?: string;
};

export function SectionCards({
  items,
}: {
  items: StatItem[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {items.map((item, index) => {
        const isPositive = (item.change ?? 0) >= 0;

        return (
          <Card
            key={index}
            className="rounded-[1.5rem] border border-orange-100 bg-white transition-all"
          >
            <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  {item.title}
                </p>
                <CardTitle className="mt-2 text-3xl font-bold text-stone-950">
                  {item.value}
                </CardTitle>
              </div>

              {item.change !== undefined && (
                <Badge
                  variant="outline"
                  className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold ${
                    isPositive
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUpIcon className="size-3" />
                  ) : (
                    <TrendingDownIcon className="size-3" />
                  )}
                  {Math.abs(item.change)}%
                </Badge>
              )}
            </CardHeader>

            {item.description && (
              <CardContent className="pt-0">
                <p className="text-sm text-stone-500">
                  {item.description}
                </p>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}