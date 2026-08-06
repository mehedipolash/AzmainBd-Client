import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Client-side navigation keeps the old scroll position, which lands users
// mid-page after a route change. Reset it on every pathname change.
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
