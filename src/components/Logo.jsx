import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.png';
import { SITE_NAME } from '../utils/constants';

/* ---------------------------------------------------------------------------
   The client's logo, exactly as their designer drew it.

   The artwork is built on black, and the black is not merely a backdrop: the
   "A" monogram contains a black diagonal, and every letterform carries a black
   drop shadow. Both are the same black as the background and connected to it,
   so keying it out to transparency either erases the diagonal or leaves a
   heavy outline around the wordmark. Tried both; both look broken.

   So the mark keeps its black and sits on a deliberate dark tile. The site's
   palette is now drawn from this logo — its green is the brand primary — so
   the tile reads as a considered dark chip in a green scheme rather than a
   stray black rectangle.

   `size` controls height only; width follows the aspect ratio, since fixing
   both would distort the mark.

   `tile={false}` is for surfaces that are already dark (the footer), where the
   artwork's own black blends into the background and a tile would be visible
   as a lighter patch.
--------------------------------------------------------------------------- */

const SIZES = {
    sm: 'h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
};

const Logo = ({ size = 'md', to = '/', className = '', tile = true }) => {
    const image = (
        <img
            src={logo}
            alt={SITE_NAME}
            // Eager and high priority: the logo is above the fold in the
            // navbar, and lazy-loading it produces a visible pop on first
            // paint.
            loading="eager"
            fetchPriority="high"
            className={`${SIZES[size] ?? SIZES.md} w-auto object-contain`}
        />
    );

    const content = tile ? (
        // The tile picks up the deep brand green rather than pure black, and a
        // faint green ring ties it to the surrounding palette.
        <span className="inline-flex items-center rounded-xl bg-[#07130b] px-3 py-2 ring-1 ring-primary/25">
            {image}
        </span>
    ) : (
        image
    );

    if (!to) {
        return <span className={`inline-flex items-center ${className}`}>{content}</span>;
    }

    return (
        <Link
            to={to}
            aria-label={`${SITE_NAME} — home`}
            className={`inline-flex items-center transition-opacity hover:opacity-85 ${className}`}
        >
            {content}
        </Link>
    );
};

export default Logo;
