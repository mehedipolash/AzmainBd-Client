import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaStar, FaArrowRight, FaTruckFast, FaShieldHalved } from 'react-icons/fa6';
import { getHeroBanner } from '../../../data/banners';
import {
    getHeroProducts,
    getStoreStats,
    isLowStock,
    getDeliveryEstimate,
} from '../../../data/products';
import { formatCurrency, calcDiscount } from '../../../utils/formatCurrency';
import UseRotator from '../../../Hooks/UseRotator';

const Banner = () => {
    const hero = getHeroBanner();
    // Real catalogue items fill the right side, so the hero proves the shop
    // works rather than showing a stock photograph. Becomes an API call later
    // without changing this component.
    const featured = getHeroProducts(3);
    const stats = getStoreStats();

    // Pause the rotation while the pointer or keyboard focus is on the card,
    // so it never changes out from under someone reading it.
    const [paused, setPaused] = useState(false);
    const { index, goTo, isStatic } = UseRotator(featured.length, { paused });

    if (!hero) return null;

    const product = featured[index] ?? null;
    const discount = product ? calcDiscount(product.price, product.oldPrice) : 0;
    const deliveryDate = product ? getDeliveryEstimate(product) : null;

    return (
        <section className="relative overflow-hidden bg-ink">
            <img
                src={hero.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            {/* Directional scrim — heavier on the copy side so the headline
                stays readable without flattening the whole photograph. */}
            <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/45" />
            {/* A soft brand glow behind the product card lifts it off the photo. */}
            <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 hidden size-136 rounded-full bg-primary/25 blur-3xl lg:block"
            />

            <div className="container-px relative py-14 sm:py-16 lg:py-20">
                {/* Columns align to the top, not the centre. The product card is
                    considerably taller than the copy, so centring the copy
                    against it pushed the headline down and left a gap under the
                    navbar. */}
                <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
                    <div className="lg:pt-2">
                        <p className="mb-4 inline-flex items-center gap-2 border border-white/20 bg-white/8 px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white/85 uppercase backdrop-blur-sm">
                            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                            {hero.eyebrow}
                        </p>

                        <h1 className="font-display text-4xl leading-[1.1] font-semibold text-white sm:text-5xl lg:text-6xl">
                            {hero.title}
                        </h1>

                        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
                            {hero.body}
                        </p>

                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link to={hero.ctaPath} className="btn-shop-light">
                                {hero.ctaLabel}
                                <FaArrowRight className="text-[11px]" />
                            </Link>
                            <Link
                                to="/deals"
                                className="inline-flex items-center justify-center gap-2 border border-white/40 px-7 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:border-white hover:bg-white/10"
                            >
                                View Deals
                            </Link>
                        </div>

                        {/* Figures come from the catalogue, so they stay true as
                            stock changes rather than being decorative. */}
                        <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-7">
                            <div>
                                <dt className="sr-only">Products in stock</dt>
                                <dd>
                                    <span className="font-display text-2xl font-semibold text-white">
                                        {stats.productCount}+
                                    </span>
                                    <span className="mt-1 block text-[11px] tracking-wide text-white/50 uppercase">
                                        In stock
                                    </span>
                                </dd>
                            </div>
                            <div>
                                <dt className="sr-only">Authorised brands</dt>
                                <dd>
                                    <span className="font-display text-2xl font-semibold text-white">
                                        {stats.brandCount}
                                    </span>
                                    <span className="mt-1 block text-[11px] tracking-wide text-white/50 uppercase">
                                        Brands
                                    </span>
                                </dd>
                            </div>
                            <div>
                                <dt className="sr-only">Average customer rating</dt>
                                <dd>
                                    <span className="flex items-baseline gap-1 font-display text-2xl font-semibold text-white">
                                        {stats.averageRating}
                                        <FaStar
                                            className="text-xs text-warning"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <span className="mt-1 block text-[11px] tracking-wide text-white/50 uppercase">
                                        {stats.totalReviews.toLocaleString('en-BD')} reviews
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Live product card — the proof that this is a working shop.
                        Rotates through the featured items on a timer. */}
                    {product && (
                        <div
                            className="relative mx-auto w-full max-w-sm lg:max-w-none"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            onFocusCapture={() => setPaused(true)}
                            onBlurCapture={() => setPaused(false)}
                        >
                            {/* Keyed so each product animates in as it becomes
                                active rather than the content swapping in place. */}
                            <article
                                key={product._id}
                                className="bg-base-100 shadow-2xl motion-safe:animate-[card-in_420ms_ease-out]"
                            >
                                <Link
                                    to={`/product/${product._id}`}
                                    className="group relative block overflow-hidden"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {discount > 0 && (
                                        <span className="absolute top-4 left-4 bg-warning px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-warning-content uppercase">
                                            Save {discount}%
                                        </span>
                                    )}

                                    {isLowStock(product) && (
                                        <span className="absolute top-4 right-4 bg-base-100/95 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-warning uppercase">
                                            Only {product.stock} left
                                        </span>
                                    )}
                                </Link>

                                <div className="p-6">
                                    <p className="text-[11px] font-semibold tracking-[0.18em] text-base-content/45 uppercase">
                                        {product.brand}
                                    </p>

                                    <h2 className="mt-2 font-display text-xl leading-snug font-semibold">
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="transition-opacity hover:opacity-70"
                                        >
                                            {product.name}
                                        </Link>
                                    </h2>

                                    <div className="mt-2 flex items-center gap-1.5">
                                        <span
                                            className="flex items-center gap-0.5"
                                            aria-label={`Rated ${product.rating} out of 5`}
                                        >
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <FaStar
                                                    key={index}
                                                    className={`text-[10px] ${
                                                        index < Math.round(product.rating)
                                                            ? 'text-warning'
                                                            : 'text-base-content/20'
                                                    }`}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </span>
                                        <span className="text-[12px] text-base-content/45">
                                            {product.rating} ({product.reviews})
                                        </span>
                                    </div>

                                    <div className="mt-4 flex items-baseline gap-2.5">
                                        <span className="font-display text-2xl font-semibold text-primary">
                                            {formatCurrency(product.price)}
                                        </span>
                                        {product.oldPrice && (
                                            <span className="text-sm text-base-content/35 line-through">
                                                {formatCurrency(product.oldPrice)}
                                            </span>
                                        )}
                                    </div>

                                    <ul className="mt-5 space-y-2 border-t border-base-300 pt-5 text-[12px] text-base-content/60">
                                        {deliveryDate && (
                                            <li className="flex items-center gap-2.5">
                                                <FaTruckFast
                                                    className="text-[11px] text-primary"
                                                    aria-hidden="true"
                                                />
                                                Delivered by{' '}
                                                <span className="font-medium text-base-content">
                                                    {deliveryDate}
                                                </span>
                                            </li>
                                        )}
                                        <li className="flex items-center gap-2.5">
                                            <FaShieldHalved
                                                className="text-[11px] text-primary"
                                                aria-hidden="true"
                                            />
                                            Official brand warranty included
                                        </li>
                                    </ul>

                                    <Link
                                        to={`/product/${product._id}`}
                                        className="btn-shop mt-6 w-full"
                                    >
                                        View product
                                    </Link>
                                </div>
                            </article>

                            {/* Manual controls — the only way to change slides
                                for anyone who has auto-rotation disabled. */}
                            {featured.length > 1 && (
                                <div className="mt-5 flex items-center justify-center gap-4">
                                    <span className="text-[11px] tracking-[0.16em] text-white/45 uppercase">
                                        Featured
                                    </span>

                                    <div className="flex gap-2">
                                        {featured.map((item, dot) => (
                                            <button
                                                key={item._id}
                                                type="button"
                                                onClick={() => goTo(dot)}
                                                aria-label={`Show ${item.name}`}
                                                aria-current={dot === index}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                                    dot === index
                                                        ? 'w-7 bg-white'
                                                        : 'w-1.5 bg-white/35 hover:bg-white/60'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    {!isStatic && (
                                        <span className="sr-only" aria-live="polite">
                                            Showing {product.name}, {index + 1} of {featured.length}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Banner;
