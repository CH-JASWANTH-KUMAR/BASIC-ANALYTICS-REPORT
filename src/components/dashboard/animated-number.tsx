"use client";

import { animate, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  format?: (n: number) => string;
  duration?: number;
};

export function AnimatedNumber({
  value,
  format = (n) => new Intl.NumberFormat(undefined).format(Math.round(n)),
  duration = 0.9,
}: AnimatedNumberProps) {
  const motion = useMotionValue(0);
  const [display, setDisplay] = useState(() => format(0));

  const formatter = useMemo(() => format, [format]);

  useEffect(() => {
    const unsubscribe = motion.on("change", (latest) => {
      setDisplay(formatter(latest));
    });
    return () => unsubscribe();
  }, [motion, formatter]);

  useEffect(() => {
    const controls = animate(motion, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [motion, value, duration]);

  return <span>{display}</span>;
}
