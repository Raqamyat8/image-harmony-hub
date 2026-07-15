import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-12 md:mb-16",
        align === "center" && "items-center text-center max-w-2xl mx-auto",
        align === "left" && action && "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("flex flex-col gap-4", align === "center" && "items-center")}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.05]">
          {title}
        </h2>
        {description && (
          <p className="text-navy/60 text-lg max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
