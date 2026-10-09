import { useEffect, useRef, useState } from "react";

// Arms the draw-on animation only for drawings that start below the fold,
// so lines are always visible by default and never hidden by timing.
export function useDrawIn() {
    const ref = useRef(null);
    const [state, setState] = useState("static"); // static | armed | drawn

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

        setState("armed");
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setState("drawn");
                    io.disconnect();
                }
            },
            { threshold: 0.25 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return [ref, state];
}
