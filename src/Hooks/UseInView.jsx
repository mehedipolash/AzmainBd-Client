import { useEffect, useRef, useState } from 'react';

// Resolved once at module scope rather than inside the hook, so the value is
// known during the first render and never needs a state update to correct it.
const skipAnimation = () => {
    if (typeof window === 'undefined') return true;
    if (typeof IntersectionObserver === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Fires once when the element scrolls into view, then disconnects — reveal
// animations should not replay every time the user scrolls past.
// When animation is skipped (reduced motion, no observer support, or SSR) the
// hook reports "in view" immediately, so content is never hidden by a missing
// API or an unmet preference.
const UseInView = ({ threshold = 0.25, rootMargin = '0px 0px -10% 0px' } = {}) => {
    const ref = useRef(null);
    const [staticReveal] = useState(skipAnimation);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (staticReveal) return undefined;

        const node = ref.current;
        if (!node) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setInView(true);
                observer.disconnect();
            },
            { threshold, rootMargin },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [staticReveal, threshold, rootMargin]);

    return [ref, staticReveal || inView];
};

export default UseInView;
