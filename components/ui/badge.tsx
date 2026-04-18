import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-[#1e3a8a] text-white",
        secondary: "bg-[#f1f5f9] text-[#64748b]",
        accent: "bg-[#f97316] text-white",
        outline: "border border-[#e2e8f0] text-[#64748b]",
        success: "bg-green-100 text-green-800",
        warning: "bg-amber-100 text-amber-800",
        summer: "bg-orange-100 text-orange-800",
        winter: "bg-blue-100 text-blue-800",
        "all-season": "bg-green-100 text-green-800",
        performance: "bg-red-100 text-red-800",
        "off-road": "bg-amber-100 text-amber-800",
        eco: "bg-emerald-100 text-emerald-800",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
