import { cn } from "@/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("mx-auto max-w-7xl px-5 sm:px-8", className)}>{children}</Tag>;
}
