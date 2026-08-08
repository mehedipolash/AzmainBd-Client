import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

// Client-side navigation keeps the previous scroll position, which lands the
// visitor mid-page after a route change.
//
// Two things this deliberately does NOT do:
//   - It skips POP navigations (browser back/forward). The browser restores the
//     previous scroll position itself, and overriding that loses the reader's
//     place — the most common bug in naive scroll-to-top components.
//   - It keys on pathname only, so changing a filter or search param on /shop
//     updates results without yanking the page to the top mid-interaction.
const ScrollToTop = () => {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        if (navigationType === 'POP') return;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        window.scrollTo({
            top: 0,
            left: 0,
            // Smooth scrolling on a route change is disorienting when the
            // incoming page is long, and it is motion the visitor did not ask
            // for. Only animate when already near the top.
            behavior: prefersReducedMotion || window.scrollY > 1200 ? 'auto' : 'smooth',
        });
    }, [pathname, navigationType]);

    return null;
};

export default ScrollToTop;
