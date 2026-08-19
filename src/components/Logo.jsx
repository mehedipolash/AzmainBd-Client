import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.svg';
import { SITE_NAME } from '../utils/constants';

/* ---------------------------------------------------------------------------
   The client's logo.

   The wordmark is green and red — colours that hold up on both the light and
   dark themes, so no inversion or duplicate asset is needed. Rendering it as
   an <img> rather than recreating it in CSS keeps the client's brand exactly
   as their designer drew it.

   NOTE: assets/logo.svg is currently a stand-in built to the client's colours
   and proportions. Drop the supplied transparent PNG in as assets/logo.png and
   change the import below — nothing else on the site needs to change, because
   every logo on every page renders through this one component.

   `size` controls height only; width follows the aspect ratio. Fixing both
   would distort the mark.
--------------------------------------------------------------------------- */

const SIZES = {
    sm: 'h-8',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
};

const Logo = ({ size = 'md', to = '/', className = '', showText = false }) => {
    const image = (
        <img
            src={logo}
            alt={SITE_NAME}
            // Eager + high priority: the logo is above the fold in the navbar,
            // and lazy-loading it produces a visible pop on first paint.
            loading="eager"
            fetchPriority="high"
            className={`${SIZES[size] ?? SIZES.md} w-auto object-contain`}
        />
    );

    const content = showText ? (
        <span className="flex items-center gap-2.5">
            {image}
            <span className="font-display text-lg leading-none font-semibold">{SITE_NAME}</span>
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
            className={`inline-flex items-center transition-opacity hover:opacity-80 ${className}`}
        >
            {content}
        </Link>
    );
};

export default Logo;
