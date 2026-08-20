import React from 'react';
import { Link } from 'react-router';
import logoStacked from '../assets/logo.png';
import logoWide from '../assets/logo-wide.png';
import logoStackedDark from '../assets/logo-dark.png';
import logoWideDark from '../assets/logo-wide-dark.png';
import UseTheme from '../Hooks/UseTheme';
import { SITE_NAME } from '../utils/constants';

/* ---------------------------------------------------------------------------
   The client's logo, on a transparent background.

   The source is a mockup render — the mark photographed on textured paper with
   studio lighting and a drop shadow. The paper is bright and near-neutral while
   the artwork is saturated green and red, so the two separate on colour
   saturation. The shadow is discarded: it exists only to seat the logo on that
   photographed surface, and on a transparent logo it leaves a grey halo.

   The "A" monogram's counter — the dark shape enclosed by the red strokes — is
   dark but is NOT background. It is identified by a flood fill from the border:
   whatever the fill cannot reach is enclosed by the mark and belongs to it,
   whatever colour it is. That keeps the counter's gradient and, because the
   fill takes its anti-aliased rim along with it, leaves no fringe at the
   boundary with the red.

   FOUR files ship, in two pairs.

   Lockup — a navbar constrains HEIGHT, and the full mark is nearly square, so
   shrinking it to fit a bar leaves the wordmark and tagline unreadable.
   `variant="wide"` places the mark beside the wordmark rather than above it,
   so the same bar height gives the type roughly twice the size.

   Theme — the wordmark's darkest green is (0, 48, 0), chosen by the designer
   for artwork that sits on white. Against the dark theme's #0d100d that is
   1.30:1 contrast, which is effectively invisible. A CSS brightness() filter
   cannot fix it: brightness is multiplicative, so lifting that green enough to
   read would blow the red monogram out to pink. The dark rendition instead
   lifts only the green family, hue-preserved, until it clears 3:1 — the reds
   and the tagline keep their exact brand colour. Same logo, rendered for a
   different ground, the way print work carries a knockout version.

   `size` controls height only; width follows the aspect ratio, since fixing
   both would distort the mark.
--------------------------------------------------------------------------- */

// Heights are per-variant: the wide lockup is 3.8:1, so it needs less height
// than the stacked mark to reach the same optical weight.
const SIZES = {
    stacked: { sm: 'h-12', md: 'h-16 sm:h-18', lg: 'h-24 sm:h-28' },
    wide: { sm: 'h-9', md: 'h-11 sm:h-13', lg: 'h-14 sm:h-16' },
};

const SOURCES = {
    stacked: { light: logoStacked, dark: logoStackedDark },
    wide: { light: logoWide, dark: logoWideDark },
};

const Logo = ({ size = 'md', to = '/', className = '', variant = 'stacked' }) => {
    const { isDark } = UseTheme();

    const key = SOURCES[variant] ? variant : 'stacked';
    const scale = SIZES[key];

    const image = (
        <img
            src={SOURCES[key][isDark ? 'dark' : 'light']}
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
