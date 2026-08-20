import React from 'react';
import { motion } from 'framer-motion';

/* ---------------------------------------------------------------------------
   Scroll reveal.

   The site already had AOS, which animates by adding classes on scroll. This
   replaces it for new work because it composes: a Reveal can wrap anything,
   the delay is a prop rather than a data attribute, and it respects the
   reduced-motion preference through framer-motion rather than needing a
   separate CSS override.

   `once` is the default on purpose. An element that re-animates every time it
   scrolls back into view is distracting on a shop page, where people scroll up
   and down comparing products.
--------------------------------------------------------------------------- */

const DIRECTIONS = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
};

const Reveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.55,
    className = '',
    once = true,
    as = 'div',
}) => {
    const offset = DIRECTIONS[direction] ?? DIRECTIONS.up;
    const Tag = motion[as] ?? motion.div;

    return (
        <Tag
            className={className}
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            // A generous negative margin means the animation starts slightly
            // before the element reaches the viewport, so it has finished by
            // the time it is properly in view rather than animating under the
            // reader's eye.
            viewport={{ once, margin: '-60px' }}
            transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
