"use client";
import { useState } from "react";
export default function useDebounce(func, delay = 500) {
    const [timer, setTimer] = useState(null);
    const handleOnChangeValue = (value) => {
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
            func(value);
        }, delay));
    };
    return handleOnChangeValue;
}
