import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialises AOS once for the whole app.
//
// `once: true` so reveals do not replay every time the visitor scrolls past,
// and the whole library is disabled under prefers-reduced-motion — AOS starts
// elements at opacity 0, so leaving it on would hide content from anyone who
// has asked for less animation.
const UseAos = () => {
    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        AOS.init({
            duration: 650,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            disable: reduceMotion,
        });
    }, []);
};

export default UseAos;
