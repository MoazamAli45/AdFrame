"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgress from "../ui/animated-circular-progress";

export function Loader() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev) => {
      if (prev === 100) {
        return 0;
      }
      return prev + 10;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedCircularProgress
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor="#1AA44D"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  );
}
