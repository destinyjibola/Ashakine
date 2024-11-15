"use client";

import React, { useEffect, useState } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value: number;
    duration?: number;
  }
>(({ className, value, duration = 200, ...props }, ref) => { // Reduced duration
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let startValue = animatedValue;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progressFraction = Math.min(elapsedTime / duration, 1);
      const newValue = startValue + (value - startValue) * progressFraction;

      setAnimatedValue(newValue);

      if (progressFraction < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, animatedValue]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-tertiary-color transition-transform duration-200 ease-in-out" // Shorter transition duration
        style={{
          width: `${animatedValue}%`,
          transition: "width 0.2s ease-in-out", // Faster transition
        }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
