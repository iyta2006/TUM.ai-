import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90 focus-visible:ring-[#1e3a8a]",
        accent: "bg-[#f97316] text-white hover:bg-[#f97316]/90 focus-visible:ring-[#f97316]",
        outline: "border border-[#e2e8f0] bg-white text-[#0f172a] hover:bg-[#f1f5f9]",
        ghost: "text-[#0f172a] hover:bg-[#f1f5f9]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        secondary: "bg-[#f1f5f9] text-[#0f172a] hover:bg-[#e2e8f0]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(buttonVariants({ variant, size }), (children as React.ReactElement<{ className?: string }>).props.className, className),
      });
    }
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
