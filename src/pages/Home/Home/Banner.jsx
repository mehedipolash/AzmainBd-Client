import React from 'react';
import { Link } from 'react-router';
import { getHeroBanner } from '../../../data/banners';

const Banner = () => {
    const hero = getHeroBanner();

    if (!hero) return null;

    return (
        <section className="relative">
            <img
                src={hero.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Directional scrim — heavier on the copy side so the headline
                stays readable without flattening the whole photograph. */}
            <div className="absolute inset-0 bg-linear-to-r from-ink/75 via-ink/50 to-ink/20" />

            <div className="container-px relative flex min-h-130 items-center py-20 sm:min-h-150 lg:min-h-165">
                <div className="max-w-xl">
                    <p className="mb-4 text-[11px] font-semibold tracking-[0.22em] text-white/70 uppercase">
                        {hero.eyebrow}
                    </p>

                    <h1 className="font-display text-4xl leading-[1.12] font-semibold text-white sm:text-5xl lg:text-6xl">
                        {hero.title}
                    </h1>

                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80">
                        {hero.body}
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <Link to={hero.ctaPath} className="btn-shop-light">
                            {hero.ctaLabel}
                        </Link>
                        <Link
                            to="/deals"
                            className="inline-flex items-center justify-center gap-2 border border-white/50 px-7 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:border-white hover:bg-white/10"
                        >
                            View Deals
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
