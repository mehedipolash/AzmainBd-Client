import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.png';
import { SITE_NAME } from '../utils/constants';

/* ---------------------------------------------------------------------------
   The client's logo, exactly as their designer drew it.

   The artwork is built on black — the "A" monogram contains a deliberate black
   diagonal that reads as depth, and the green radiating arc is drawn to glow
   against a dark ground. Keying the black out to transparency destroys both,
   because the diagonal is the same colour as, and connected to, the
   background.

   So the mark keeps its black and is presented on its own dark tile. It reads
   as intentional on the light theme and disappears into the surface on the
   dark one, which is how the artwork was designed to be seen.

   `size` controls height only; width follows the aspect ratio, since fixing
   both would distort the mark.
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
        <span className="inline-flex items-center rounded-lg bg-[#050505] px-2.5 py-1.5">
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
