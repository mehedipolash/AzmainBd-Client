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
// is h-18 / lg:h-24), so constraining the height is what keeps it from
// changing the row it lives in. Width follows from the aspect ratio.
//
// Sized up on the client's note that the logo is the first impression and was
// reading small. The navbar grew to match rather than the mark being pushed
// against the bar's border — at h-18 the logo is 72px in a 96px row, which
// leaves 12px of clear space above and below.
const SIZES = {
    sm: 'h-12',
    md: 'h-14 sm:h-18',
    lg: 'h-20 sm:h-26',
};

// The artwork is dark green on transparent. Measured against the dark theme's
// surface it lands at 2.39:1 — under AA, and the exact "logo disappears"
// problem the client reported. On white it is 7.44:1.
//
// So in the dark theme the mark gets its own white tile to sit on. That is a
// deliberate brand decision, not a hack: the client's logo is drawn for light
// grounds, and giving it the ground it was drawn for keeps the colours the
// ones they signed off on instead of recolouring their artwork.
const DARK_PLATE = 'rounded-xl dark:bg-white dark:p-2 dark:shadow-sm';

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
        return (
            <span className={`inline-flex items-center ${DARK_PLATE} ${className}`}>{image}</span>
        );
    }

    return (
        <Link
            to={to}
            aria-label={`${SITE_NAME} — home`}
            className={`inline-flex items-center transition-opacity hover:opacity-85 ${DARK_PLATE} ${className}`}
        >
            {image}
        </Link>
    );
};

export default Logo;
