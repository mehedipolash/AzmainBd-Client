import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaArrowRight, FaTruckFast, FaShieldHalved, FaWhatsapp } from 'react-icons/fa6';
import { getHeroBanner } from '../../../data/banners';
import { getHeroProducts, getStoreStats, isLowStock } from '../../../utils/catalogue';
import { formatCurrency, calcDiscount, hasPrice } from '../../../utils/formatCurrency';
import { resolveImageUrl, resolveCardImageUrl } from '../../../utils/imageUrl';
import { productEnquiryLink } from '../../../utils/business';
import OrderButton from '../../../components/OrderButton';
import Reveal from '../../../components/motion/Reveal';
import CountUp from '../../../components/motion/CountUp';
import UseCatalogue from '../../../Hooks/UseCatalogue';
import UseRotator from '../../../Hooks/UseRotator';

/* ---------------------------------------------------------------------------
   The hero.

   The featured product used to sit in a tall VERTICAL card beside the copy.
   That shape was the problem: a portrait card is far taller than a block of
   headline text, so the two columns never balanced, and the card kept running
   past the section's padding and getting clipped.

   The card is now HORIZONTAL — photo on the left, details on the right, laid
   out along the x axis. A wide card is naturally close in height to the copy
   beside it, so the two columns balance without anything being stretched,
   squeezed or cropped. It also suits the product photography, which is square,
   and leaves room to show the next two products as a small strip beneath.
--------------------------------------------------------------------------- */

const Banner = () => {
    const hero = getHeroBanner();
    const { products, categories } = UseCatalogue();

    // Real catalogue items fill the right side, so the hero proves the shop
    // works rather than showing a stock photograph.
    const featured = getHeroProducts(products, 3);
    const stats = getStoreStats(products, categories);

    // Pause the rotation while the pointer or keyboard focus is on the card,
    // so it never changes out from under someone reading it.
    const [paused, setPaused] = useState(false);
    const { index, goTo } = UseRotator(featured.length, { paused });

    if (!hero) return null;

    const product = featured[index] ?? null;
    const discount = product ? calcDiscount(product.price, product.oldPrice) : 0;
    const priced = product ? hasPrice(product) : false;

    return (
        <section className="relative overflow-hidden bg-ink">
            <img
                src={resolveImageUrl(hero.image)}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* A TEAL scrim, not a neutral black wash — that is what ties the
                photograph to the palette instead of just darkening it.

                It fades to TRANSPARENT on the right rather than to a tinted
                value: the product card there brings its own white surface and
                needs no help, so letting the background through on that side
                is what gives the section depth instead of flattening it. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-r from-[#061217]/88 via-[#0a2531]/58 to-transparent"
            />

            {/* Soft brand glows lift the card off the photo. */}
            <div
                aria-hidden="true"
                className="absolute -top-32 -right-24 hidden size-136 rounded-full bg-brand-cyan/20 blur-3xl lg:block"
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-32 right-1/4 hidden size-96 rounded-full bg-brand-gold/12 blur-3xl lg:block"
            />

            <div className="container-px relative py-14 sm:py-16 lg:py-20">
                <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
                    <div>
                        <Reveal direction="up" as="p" className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-cyan/45 bg-brand-cyan/15 px-4 py-2 text-[12px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-sm">
                            <span
                                className="size-2 animate-pulse rounded-full bg-brand-cyan"
                                aria-hidden="true"
                            />
                            {hero.eyebrow}
                        </Reveal>

                        <Reveal direction="up" delay={0.08}>
                            <h1 className="font-display text-[2.6rem] leading-[1.06] font-semibold text-white sm:text-6xl lg:text-[4.25rem]">
                                {hero.title}
                            </h1>
                        </Reveal>

                        <Reveal direction="up" delay={0.16}>
                            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/80">
                                {hero.body}
                            </p>
                        </Reveal>

                        <Reveal direction="up" delay={0.24} className="mt-9 flex flex-wrap gap-3">
                            {/* The palette's own teal->cyan gradient, which is
                                what makes the primary action look like part of
                                this brand rather than a default button. */}
                            <Link
                                to={hero.ctaPath}
                                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-brand-teal to-brand-cyan px-9 py-4 text-[13px] font-semibold tracking-[0.14em] text-white uppercase shadow-lg shadow-brand-cyan/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-cyan/40"
                            >
                                {hero.ctaLabel}
                                <FaArrowRight className="text-[11px] transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                to="/deals"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-9 py-4 text-[13px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm transition-colors hover:border-brand-gold hover:bg-white/10 hover:text-brand-gold"
                            >
                                View Deals
                            </Link>
                        </Reveal>

                        {/* Figures come from the catalogue, so they stay true as
                            stock changes rather than being decorative. */}
                        <Reveal
                            direction="up"
                            delay={0.32}
                            as="dl"
                            className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-7"
                        >
                            {[
                                { label: 'In stock', count: stats.productCount, suffix: '+' },
                                { label: 'Brands', count: stats.brandCount },
                                // Category count, not a star rating: this shop
                                // has no review system, so an average score
                                // would be a number the client cannot stand
                                // behind.
                                { label: 'Categories', count: stats.categoryCount },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <dt className="sr-only">{stat.label}</dt>
                                    <dd>
                                        {/* Counted up rather than printed: these
                                            are the site's proof that it is a
                                            working shop, so they are worth the
                                            eye. The value is the live catalogue
                                            figure, not a hardcoded target. */}
                                        <CountUp
                                            value={stat.count}
                                            suffix={stat.suffix ?? ''}
                                            className="font-display text-4xl font-semibold text-brand-cyan"
                                        />
                                        <span className="mt-1 block text-[12px] tracking-wide text-white/60 uppercase">
                                            {stat.label}
                                        </span>
                                    </dd>
                                </div>
                            ))}
                        </Reveal>
                    </div>

                    {/* Live product card — the proof that this is a working shop.
                        Horizontal, so its height sits close to the copy beside
                        it and neither column has to stretch or crop. */}
                    {product && (
                        <Reveal
                            direction="left"
                            delay={0.18}
                            // A small top offset rather than none: level with
                            // the headline reads as deliberate, level with the
                            // very top of the section reads as unanchored.
                            className="w-full lg:mt-6"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            onFocusCapture={() => setPaused(true)}
                            onBlurCapture={() => setPaused(false)}
                        >
                            {/* Keyed so each product animates in as it becomes
                                active rather than the content swapping in place. */}
                            <article
                                key={product._id}
                                className="overflow-hidden rounded-2xl bg-base-100 shadow-2xl motion-safe:animate-[card-in_420ms_ease-out]"
                            >
                                <div className="flex flex-col sm:flex-row">
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="group relative block shrink-0 overflow-hidden bg-white sm:w-[46%]"
                                    >
                                        <img
                                            src={resolveCardImageUrl(product.image)}
                                            alt={product.name}
                                            loading="eager"
                                            fetchPriority="high"
                                            className="h-52 w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 sm:h-full sm:min-h-72.5"
                                        />

                                        {discount > 0 && (
                                            <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-accent-content uppercase shadow-sm">
                                                Save {discount}%
                                            </span>
                                        )}

                                        {isLowStock(product) && (
                                            <span className="absolute top-4 right-4 rounded-full bg-error px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-error-content uppercase shadow-sm">
                                                Only {product.stock} left
                                            </span>
                                        )}
                                    </Link>

                                    <div className="flex min-w-0 flex-1 flex-col justify-center border-t border-base-300 p-6 sm:border-t-0 sm:border-l">
                                        <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                                            {product.brand}
                                        </p>

                                        <h2 className="font-display mt-2 text-xl leading-snug font-semibold">
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="transition-colors hover:text-primary"
                                            >
                                                {product.name}
                                            </Link>
                                        </h2>

                                        <div className="mt-4 flex items-baseline gap-2.5">
                                            <span
                                                className={
                                                    priced
                                                        ? 'font-display text-3xl font-semibold text-primary'
                                                        : 'text-base font-medium text-base-content/60 italic'
                                                }
                                            >
                                                {formatCurrency(product.price)}
                                            </span>
                                            {priced && product.oldPrice && (
                                                <span className="text-sm text-base-content/35 line-through">
                                                    {formatCurrency(product.oldPrice)}
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-3 flex items-center gap-4 text-[11px] text-base-content/55">
                                            <span className="flex items-center gap-1.5">
                                                <FaShieldHalved
                                                    className="text-[11px] text-primary"
                                                    aria-hidden="true"
                                                />
                                                100% genuine
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <FaTruckFast
                                                    className="text-[11px] text-primary"
                                                    aria-hidden="true"
                                                />
                                                Nationwide
                                            </span>
                                        </p>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="flex-1 rounded-lg border border-base-300 px-4 py-3 text-center text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:border-primary hover:text-primary"
                                            >
                                                View
                                            </Link>
                                            {/* Orders are placed on WhatsApp, so
                                                the hero offers that route directly
                                                rather than making the visitor
                                                find it. */}
                                            <OrderButton
                                                href={productEnquiryLink(product)}
                                                signedOutLabel="Sign in to order"
                                                className="flex flex-2 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-[11px] font-semibold tracking-[0.12em] text-white uppercase shadow-md shadow-[#25D366]/25 transition-opacity hover:opacity-90"
                                            >
                                                <FaWhatsapp className="text-sm" aria-hidden="true" />
                                                Order
                                            </OrderButton>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* The other featured products, as a horizontal strip.
                                These double as the rotator's controls — a real
                                thumbnail says what you are switching to, which a
                                row of dots cannot. */}
                            {featured.length > 1 && (
                                <div className="mt-4 flex gap-3">
                                    {featured.map((item, dot) => (
                                        <button
                                            key={item._id}
                                            type="button"
                                            onClick={() => goTo(dot)}
                                            aria-label={`Show ${item.name}`}
                                            aria-current={dot === index}
                                            className={`flex flex-1 items-center gap-3 rounded-xl border p-2 text-left backdrop-blur-sm transition-all ${
                                                dot === index
                                                    ? 'border-primary bg-primary/20'
                                                    : 'border-white/20 bg-white/8 hover:border-white/45 hover:bg-white/15'
                                            }`}
                                        >
                                            <img
                                                src={resolveCardImageUrl(item.image)}
                                                alt=""
                                                loading="lazy"
                                                className="size-11 shrink-0 rounded-lg bg-white object-contain p-1"
                                            />
                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate text-[11px] font-medium text-white">
                                                    {item.brand}
                                                </span>
                                                <span className="block truncate text-[11px] text-white/55">
                                                    {formatCurrency(item.price)}
                                                </span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Banner;
