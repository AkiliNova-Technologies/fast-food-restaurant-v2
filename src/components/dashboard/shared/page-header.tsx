import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  title: string;
  description?: string;
  backHref?: string;
  action?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  backHref,
  action,
}: PageHeaderProps) {
  return (
    <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
          Restaurant Admin
        </p>
        <div className="mt-6 flex flex-row gap-4">
          {backHref && (
            <Button
              asChild
              variant="outline"
              className="rounded-md text-stone-600 hover:bg-orange-50 hover:text-red-700"
            >
              <Link href={backHref}>
                <ArrowLeftIcon className="size-4" />
              </Link>
            </Button>
          )}

          <h1 className=" text-3xl font-bold tracking-tight text-stone-950">
            {title}
          </h1>
        </div>

        {description && (
          <p className="mt-2 max-w-2xl text-sm text-stone-500">{description}</p>
        )}
      </div>

      {action}
    </section>
  );
}
