import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import type { LucideIcon } from "lucide-react";

interface ButtonBase {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline-light";
  icon?: LucideIcon;
  className?: string;
}

interface ButtonAsLink extends ButtonBase {
  to: string;
  href?: never;
  onClick?: never;
  type?: never;
}

interface ButtonAsAnchor extends ButtonBase {
  href: string;
  to?: never;
  onClick?: never;
  type?: never;
}

interface ButtonAsButton extends ButtonBase {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  to?: never;
  href?: never;
}

type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

const variantClasses: Record<NonNullable<ButtonBase["variant"]>, string> = {
  primary:
    "bg-bsc-gold-500 text-bsc-sapphire-950 hover:bg-bsc-gold-600 hover:-translate-y-0.5 hover:shadow-bsc focus:ring-bsc-gold-400",
  secondary:
    "bg-bsc-sapphire-700 text-bsc-cream hover:bg-bsc-sapphire-800 hover:-translate-y-0.5 hover:shadow-bsc focus:ring-bsc-sapphire-500",
  ghost: "bg-transparent text-bsc-sapphire-700 hover:bg-bsc-sapphire-50 focus:ring-bsc-sapphire-300",
  "outline-light":
    "bg-transparent border border-bsc-cream/40 text-bsc-cream hover:bg-bsc-cream/10 hover:border-bsc-cream/70 focus:ring-bsc-cream/30",
};

export function Button({
  children,
  variant = "primary",
  icon: Icon,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bsc-cream active:translate-y-0 active:scale-[0.98]",
    variantClasses[variant],
    className,
  );

  const iconSpan = Icon ? (
    <span aria-hidden="true" className="inline-flex transition-transform group-hover:translate-x-0.5">
      <Icon className="h-4 w-4" />
    </span>
  ) : null;

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
        {iconSpan}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    return (
      <a href={props.href} className={classes} target="_blank" rel="noreferrer">
        {children}
        {iconSpan}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} onClick={buttonProps.onClick} className={classes}>
      {children}
      {iconSpan}
    </button>
  );
}
