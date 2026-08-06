import React from 'react';
import { Link } from 'react-router';

// Renders one advertising banner from src/data/banners.js. `variant` picks the
// layout: 'split' is a half-width image tile, 'strip' is a full-width band.
const PromoBanner = ({ banner, variant = 'split' }) => {
    if (!banner) return null;

    const { eyebrow, title, body, ctaLabel, ctaPath, image } = banner;
    const isStrip = variant === 'strip';

    return (
        <Link
            to={ctaPath}
            className={`group relative block overflow-hidden ${
                isStrip ? 'min-h-[260px] sm:min-h-[320px]' : 'min-h-[300px]'
            }`}
        >
            <img
                src={image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scrim keeps the copy readable regardless of the photograph. */}
            <div className="absolute inset-0 bg-ink/45" />

            <div
                className={`relative flex h-full flex-col justify-center p-8 sm:p-10 ${
                    isStrip ? 'mx-auto max-w-2xl text-center lg:p-16' : ''
                }`}
            >
                {eyebrow && (
                    <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-white/70 uppercase">
                        {eyebrow}
                    </p>
                )}

                <h3
                    className={`font-display font-semibold text-white ${
                        isStrip ? 'text-3xl sm:text-4xl lg:text-[42px]' : 'text-2xl sm:text-3xl'
                    }`}
                >
                    {title}
                </h3>

                {body && (
                    <p className="mt-4 text-sm leading-relaxed text-white/75">{body}</p>
                )}

                <span
                    className={`mt-6 w-fit border-b border-white/50 pb-1 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors group-hover:border-white ${
                        isStrip ? 'mx-auto' : ''
                    }`}
                >
                    {ctaLabel}
                </span>
            </div>
        </Link>
    );
};

export default PromoBanner;
