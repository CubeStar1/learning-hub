"use client";

import { useTheme } from "next-themes";

export const DotPattern = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`absolute inset-0 z-0 bg-[length:16px_16px] opacity-20 dark:opacity-10 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${
          isDark ? "rgb(255 255 255)" : "rgb(0 0 0)"
        } 1px, transparent 0)`,
      }}
      {...props}
    />
  );
}; 