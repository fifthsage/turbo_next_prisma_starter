"use client";

import { useState } from "react";

export default function useDebounce(
  func: (value: string) => void,
  delay: number = 500,
) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleOnChangeValue = (value: string) => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        func(value);
      }, delay),
    );
  };

  return handleOnChangeValue;
}
