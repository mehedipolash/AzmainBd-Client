import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.png';
import { SITE_NAME } from '../utils/constants';

/* ---------------------------------------------------------------------------
   ONE logo file, everywhere.

   This component used to carry four artwork files — a stacked lockup, a wide
   lockup, and a light-on-dark version of each — and chose between them by
   variant and theme. The client asked for the opposite: logo.png is the mark,
   and it is the mark on every surface, in both themes.

   That is the better arrangement for them, not just the simpler one. Four
   files meant four things to re-export whenever the brand changed, and three
   of them silently drifted out of date the moment one was updated. Now there
   is a single asset, so the logo they hand over is the logo the site shows.

   The artwork is near-square (516x420, 1.23:1), so the size scale is tuned to
   that ratio rather than the 3.83:1 wide lockup it replaces — the same `h-11`
   that suited a long horizontal wordmark renders a square mark as a stamp.
--------------------------------------------------------------------------- */

// Heights, not widths: the mark sits inside rows of a known height (the navbar
// is h-16 / lg:h-20), so constraining the height is what keeps it from
// changing the row it lives in. Width follows from the aspect ratio.
const SIZES = {
    sm: 'h-10',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
};

const Logo = ({ size = 'md', to = '/', className = '' }) => {
    const image = (
        <img
            src={logo}
            alt={SITE_NAME}
            // Eager and high priority: this is above the fold in the header on
            // every route, so deferring it leaves a hole in the first paint.
            loading="eager"
            fetchPriority="high"
            className={`${SIZES[size] ?? SIZES.md} w-auto object-contain`}
        />
    );

    if (!to) {
        return <span className={`inline-flex items-center ${className}`}>{image}</span>;
    }

    return (
        <Link
            to={to}
            aria-label={`${SITE_NAME} — home`}
            className={`inline-flex items-center transition-opacity hover:opacity-85 ${className}`}
        >
            {image}
        </Link>
    );
};

export default Logo;
