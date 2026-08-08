import { useCallback, useEffect, useState } from 'react';

// Advances an index on an interval. Pauses while `paused` is true, so hovering
// a carousel stops it from changing under the pointer, and never auto-advances
// for visitors who prefer reduced motion — they get manual controls instead.
const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const UseRotator = (length, { interval = 5000, paused = false } = {}) => {
    const [index, setIndex] = useState(0);
    const [staticMode] = useState(prefersReducedMotion);

    const goTo = useCallback(
        (next) => {
            if (length <= 0) return;
            setIndex(((next % length) + length) % length);
        },
        [length],
    );

    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const previous = useCallback(() => goTo(index - 1), [goTo, index]);

    useEffect(() => {
        if (staticMode || paused || length <= 1) return undefined;

        const timer = setInterval(() => {
            setIndex((current) => (current + 1) % length);
        }, interval);

        return () => clearInterval(timer);
    }, [staticMode, paused, length, interval]);

    // Guard against the list shrinking beneath us — e.g. when the API returns
    // fewer products than the previous render.
    useEffect(() => {
        if (length > 0 && index >= length) setIndex(0);
    }, [index, length]);

    return { index, goTo, next, previous, isStatic: staticMode };
};

export default UseRotator;
