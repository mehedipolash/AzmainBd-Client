import React from 'react';
import { Link } from 'react-router';
import { FaStar, FaArrowRight, FaTruckFast, FaShieldHalved } from 'react-icons/fa6';
import { getHeroBanner } from '../../../data/banners';
import {
    getHeroProduct,
    getStoreStats,
    isLowStock,
    getDeliveryEstimate,
} from '../../../data/products';
import { formatCurrency, calcDiscount } from '../../../utils/formatCurrency';

const Banner = () => {
    const hero = getHeroBanner();
    // A real catalogue item fills the right side, so the hero proves the shop
    // works rather than showing a stock photograph. Becomes an API call later
    // without changing this component.
    const product = getHeroProduct();
    const stats = getStoreStats();

    if (!hero) return null;

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
                className="absolute -top-24 -right-24 hidden size-[34rem] rounded-full bg-primary/25 blur-3xl lg:block"
            />

            <div className="container-px relative py-16 sm:py-20 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                    <div>
                        <p className="mb-5 inline-flex items-center gap-2 border border-white/20 bg-white/8 px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white/85 uppercase backdrop-blur-sm">
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
                        <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-8">
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

                    {/* Live product card — the proof that this is a working shop. */}
                    {product && (
                        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                            <article className="bg-base-100 shadow-2xl">
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

                            <p className="mt-4 text-center text-[11px] tracking-[0.16em] text-white/45 uppercase">
                                Featured this week
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Banner;
