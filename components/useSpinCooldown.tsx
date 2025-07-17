"use client";
import { useState, useEffect, useRef } from "react";

export default function useSpinCooldown(duration: number) {
  const [spinCooldown, setSpinCooldown] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCooldown = () => {
    setSpinCooldown(duration);
  };

  useEffect(() => {
    if (spinCooldown > 0) {
      timerRef.current = setInterval(() => {
        setSpinCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [spinCooldown]);

  return { spinCooldown, startCooldown };
}