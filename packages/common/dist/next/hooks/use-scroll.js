"use client";
import { useEffect, useMemo, useRef } from "react";
import { throttle } from "lodash";
export default function useScroll(gap = 0, onScroll = () => null) {
    const beforeScrollY = useRef(0);
    const scrollEvent = useMemo(() => throttle(() => {
        const currentScrollY = window.scrollY;
        const float = currentScrollY > gap;
        if (beforeScrollY.current < currentScrollY) {
            onScroll(float, "DOWN");
        }
        else {
            onScroll(float, "UP");
        }
        beforeScrollY.current = currentScrollY;
    }, 300), [gap, onScroll]);
    useEffect(() => {
        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        };
    }, [scrollEvent]);
}
