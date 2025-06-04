import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const Heading1 = ({ className, ...props }: ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
      {...props}
    />
  );
};

export const Heading2 = ({ className, ...props }: ComponentProps<"h2">) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

export const Heading3 = ({ className, ...props }: ComponentProps<"h3">) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

export const Heading4 = ({ className, ...props }: ComponentProps<"h4">) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

export const P = ({ className, ...props }: ComponentProps<"p">) => {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6 mb-6", className)}
      {...props}
    />
  );
};

export const Blockquote = ({
  className,
  ...props
}: ComponentProps<"blockquote">) => {
  return (
    <blockquote
      className={cn("mt-6 border-l-4 pl-6 italic", className)}
      {...props}
    />
  );
};

export const UL = ({ className, ...props }: ComponentProps<"ul">) => {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
};

export const A = ({ className, ...props }: ComponentProps<"a">) => {
  return (
    <a
      className={cn("underline transition hover:text-primary", className)}
      {...props}
    />
  );
};
