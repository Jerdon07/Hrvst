import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Link } from "@inertiajs/react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: `
          bg-dark text-dark-foreground 
          hover:bg-dark/90
        `,
        primary: `
          bg-primary text-primary-foreground 
          hover:bg-primary/90
        `,
        secondary: `
          bg-secondary text-secondary-foreground 
          hover:bg-secondary/90
        `,
        outline: `
          border border-black bg-transparent text-black 
          hover:bg-primary hover:text-primary-foreground hover:border-primary
          `,
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-destructive",
        ghost: "hover:bg-accent/10 text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "size-10",
      },
      stroke: {

      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  method?: "get" | "post" | "put" | "patch" | "delete"
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, method, fullWidth, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const widthClass = fullWidth ? "w-full" : ""

    // If href is provided, render as Inertia Link
    if (href) {
      return (
        <Link
          href={href}
          method={method}
          as="button"
          className={cn(buttonVariants({ variant, size }), widthClass, className)}
          {...(props as any)}
        >
          {props.children}
        </Link>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), widthClass, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }