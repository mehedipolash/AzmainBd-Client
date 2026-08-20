import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/* ---------------------------------------------------------------------------
   A number that counts up when it scrolls into view.

   Used for the hero's live figures — products in stock, brands, categories.
   Those numbers come from the catalogue and are the site's proof that it is a
   working shop, so drawing the eye to them is worth an animation.

   Two things this gets right that a naive version does not:

     - it counts to the REAL value, which changes as stock changes, rather than
       to a hardcoded target
     - with reduced motion preferred, it renders the final number immediately
       instead of animating, because a rapidly changing digit is exactly the
       kind of motion that setting exists to prevent
--------------------------------------------------------------------------- */

const CountUp = ({ value, duration = 1400, suffix = '', className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const reduceMotion = useReducedMotion();

    const target = Number(value) || 0;
    const [counted, setCounted] = useState(0);

    // With reduced motion preferred there is nothing to animate, so the final
    // value is derived during render rather than pushed into state by an
    // effect — an effect that only exists to set state immediately is a
    // cascading render for no benefit.
    const shown = reduceMotion ? target : counted;

    useEffect(() => {
        if (reduceMotion || !inView) return;

        let frame;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out: the count decelerates into its final value rather than
            // stopping dead, which is what makes it read as settling.
            const eased = 1 - (1 - progress) ** 3;
            setCounted(Math.round(target * eased));

            if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, target, duration, reduceMotion]);

    return (
        <motion.span ref={ref} className={className}>
            {shown}
            {suffix}
        </motion.span>
    );
};

export default CountUp;
