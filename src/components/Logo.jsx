import React from 'react';
import { Link } from 'react-router';
import logoStacked from '../assets/logo.png';
import logoWide from '../assets/logo-wide.png';
import { SITE_NAME } from '../utils/constants';

/* ---------------------------------------------------------------------------
   The client's logo, on a transparent background.

   The supplied artwork sits on solid black, and earlier attempts to key that
   out failed because they tried to preserve it. The black was doing two
   different jobs: drop shadows behind the wordmark, which only exist to lift
   the letters off a dark ground, and the "A" monogram's diagonal, which is
   real design.

   The shadows are discarded — on a transparent logo they are what produces a
   heavy outline — while the monogram's diagonal is recovered geometrically, as
   the dark region enclosed by the red strokes. Alpha follows colour
   saturation, so the anti-aliased curves survive intact.

   The result drops straight onto either theme with no plate behind it, which
   is what lets the mark read as the brand rather than as a picture of a logo.

   Two lockups ship, because a navbar constrains HEIGHT and the full mark is
   nearly square — shrinking it to fit a bar leaves the wordmark and tagline
   unreadable. `variant="wide"` places the mark beside the wordmark instead of
   above it, so the same bar height gives the type roughly twice the size.

   `size` controls height only; width follows the aspect ratio, since fixing
   both would distort the mark.
--------------------------------------------------------------------------- */

// Heights are per-variant: the wide lockup is 3.8:1, so it needs less height
// than the stacked mark to reach the same optical weight.
const SIZES = {
    stacked: { sm: 'h-12', md: 'h-16 sm:h-18', lg: 'h-24 sm:h-28' },
    wide: { sm: 'h-8', md: 'h-9 sm:h-11', lg: 'h-12 sm:h-14' },
};

const Logo = ({ size = 'md', to = '/', className = '', variant = 'stacked' }) => {
    const scale = SIZES[variant] ?? SIZES.stacked;

    const image = (
        <img
            src={variant === 'wide' ? logoWide : logoStacked}
            alt={SITE_NAME}
            // Eager and high priority: the logo is above the fold in the
            // navbar, and lazy-loading it produces a visible pop on first
            // paint.
            loading="eager"
            fetchPriority="high"
            className={`${scale[size] ?? scale.md} w-auto object-contain`}
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
