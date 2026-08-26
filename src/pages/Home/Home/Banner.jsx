import React, { useState } from 'react';
import { Link } from 'react-router';
import {
    FaArrowRight,
    FaTruckFast,
    FaShieldHalved,
    FaWhatsapp,
    FaChevronLeft,
    FaChevronRight,
} from 'react-icons/fa6';
import { getHeroBanner } from '../../../data/banners';
import { getHeroProducts, getStoreStats, isLowStock, HERO_LIMIT } from '../../../utils/catalogue';
import { resolveImageUrl, resolveCardImageUrl } from '../../../utils/imageUrl';
import { productEnquiryLink } from '../../../utils/business';
import OrderButton from '../../../components/OrderButton';
import Reveal from '../../../components/motion/Reveal';
import CountUp from '../../../components/motion/CountUp';
import UseCatalogue from '../../../Hooks/UseCatalogue';
import UseRotator from '../../../Hooks/UseRotator';



const Banner = () => {
    const hero = getHeroBanner();
    const { products, categories } = UseCatalogue();

    // Whichever products the shop owner flagged as featured in the admin
    // panel. Real catalogue items, so the hero proves the shop works rather
    // than showing a stock photograph — and the client chooses which ones,
    // rather than the code ranking them.
    const featured = getHeroProducts(products, HERO_LIMIT);
    const stats = getStoreStats(products, categories);

    // Pause the rotation while the pointer or keyboard focus is on the card,
    // so it never changes out from under someone reading it.
    const [paused, setPaused] = useState(false);
    const { index, goTo, next, previous } = UseRotator(featured.length, { paused });

    if (!hero) return null;

    const product = featured[index] ?? null;

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

            <div className="container-px relative py-12 sm:py-14 lg:py-16">
                {/* items-start. The card must line up with the TOP of the copy,
                    not with its middle: the copy column is a four-line headline
                    plus a paragraph, buttons and stats, so centring the shorter
                    card against it pushes the card 150px down the page and
                    leaves the space beside the headline empty.

                    The leftover height under the card is not a defect — it is
                    where the background photograph shows through, which is the
                    point of having one. */}
                {/* The card column is the wider one. The client wanted the
                    product shots given real room — they are the thing being
                    advertised — so the copy column was cut back to pay for it
                    rather than the card being stretched into the page margin.
                    Its height is unchanged; only the width grew. */}
                <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-10">
                    <div>
                        {/* The client's own tagline, set in the display serif
                            rather than as a pill of uppercase micro-type. A
                            rounded pill with a pulsing dot is the default hero
                            eyebrow on every template on the web; this is the
                            phrase printed under their logo, so it belongs in
                            the brand's voice. The gold rule brings the
                            palette's third colour into the hero, where it
                            otherwise never appeared. */}
                        <Reveal direction="up" className="mb-6 flex items-center gap-3.5">
                            <span
                                aria-hidden="true"
                                className="h-px w-10 bg-linear-to-r from-brand-gold to-brand-gold/20"
                            />
                            <p className="font-display text-[20px] leading-none font-semibold text-brand-gold italic sm:text-[22px]">
                                {hero.eyebrow}
                            </p>
                        </Reveal>

                        {/* Deliberately narrow — max-w-sm holds the headline to
                            about two words a line, which is what frees the
                            width for the card. Capping the TEXT rather than
                            shrinking the type again keeps the headline big and
                            confident; it just occupies a tall narrow column
                            instead of a wide short one. */}
                        <Reveal direction="up" delay={0.08}>
                            <h1 className="font-display max-w-sm text-[2.1rem] leading-[1.08] font-semibold text-white sm:text-[2.9rem] lg:text-[3.15rem]">
                                {hero.title}
                            </h1>
                        </Reveal>

                        {/* The supporting paragraph came out at the client's
                            request. The brands it listed are on the cards and
                            in the shop, the delivery promise is in the strip
                            above the nav, and the WhatsApp route is a button
                            right below — so it was restating what the page
                            already says, using the width the card wanted. */}

                        <Reveal direction="up" delay={0.16} className="mt-7 flex flex-wrap gap-3">
                            {/* The palette's own teal->cyan gradient, which is
                                what makes the primary action look like part of
                                this brand rather than a default button. */}
                            <Link
                                to={hero.ctaPath}
                                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-brand-teal to-brand-cyan px-5 py-3.5 text-[12px] font-semibold tracking-[0.14em] text-white uppercase shadow-lg shadow-brand-cyan/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-cyan/40"
                            >
                                {hero.ctaLabel}
                                <FaArrowRight className="text-[11px] transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                to="/deals"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-3.5 text-[12px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm transition-colors hover:border-brand-gold hover:bg-white/10 hover:text-brand-gold"
                            >
                                View Deals
                            </Link>
                        </Reveal>

                        {/* Figures come from the catalogue, so they stay true as
                            stock changes rather than being decorative. */}
                        <Reveal
                            direction="up"
                            delay={0.24}
                            as="dl"
                            // Tightened with the column: the copy side is much
                            // narrower now, so max-w-md and gap-6 would wrap
                            // "Categories" onto two lines. These three figures
                            // are the shop's proof it is real and have to stay
                            // readable at this width.
                            className="mt-7 grid max-w-xs grid-cols-3 gap-3 border-t border-white/15 pt-5"
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
                                            className="font-display text-3xl font-semibold text-brand-cyan"
                                        />
                                        <span className="mt-1 block text-[10px] tracking-wide text-white/65 uppercase">
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
                            // Top-aligned with the TAGLINE, at the client's
                            // request: the card now starts on the same line as
                            // "House of global brands" rather than 46px below
                            // it. With the card this tall, hanging it off the
                            // headline instead left the tagline floating
                            // beside empty space.
                            className="w-full"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            onFocusCapture={() => setPaused(true)}
                            onBlurCapture={() => setPaused(false)}
                        >
                            {/* relative, so the arrows can be positioned against
                                the card rather than against the grid cell —
                                they must track the card's own edges. */}
                            <div className="relative">
                            {/* Keyed so each product animates in as it becomes
                                active rather than the content swapping in place. */}
                            <article
                                key={product._id}
                                className="overflow-hidden rounded-2xl bg-base-100 shadow-2xl motion-safe:animate-[card-in_420ms_ease-out]"
                            >
                                {/* items-stretch so both halves take the row's
                                    height, and the row's height is fixed by the
                                    image box below — never by the copy or the
                                    image's own proportions. That is what stops
                                    the whole card growing or shrinking when the
                                    owner uploads a taller or shorter photo. */}
                                <div className="flex flex-col sm:flex-row sm:items-stretch">
                                    {/* Half the card, a FIXED height so the card
                                        never grows or shrinks with the upload —
                                        but object-CONTAIN, never cover: the whole
                                        product must show, nothing clipped off the
                                        top or sides whatever shape the owner
                                        uploads. The tinted ground fills the box
                                        around a tall or wide shot so the spare
                                        space reads as framing rather than a gap. */}
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="group relative block shrink-0 overflow-hidden bg-linear-to-b from-white to-base-200/60 p-3 sm:w-1/2"
                                    >
                                        <img
                                            src={resolveCardImageUrl(product.image)}
                                            alt={product.name}
                                            loading="eager"
                                            fetchPriority="high"
                                            className="h-60 w-full object-contain object-center transition-transform duration-500 group-hover:scale-105 sm:h-96"
                                        />

                                        {/* The "Save N%" badge went with the
                                            price: a percentage with no amount
                                            beside it is not something a
                                            visitor can act on. Stock urgency
                                            below is unrelated to price, so it
                                            stays. */}
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

                                        {/* No price here either — the client
                                            wants amounts on the product page
                                            only. The description takes the
                                            space instead, which sells the item
                                            better than a number did and gives
                                            the horizontal card a reason to be
                                            as wide as it is. */}
                                        {product.description && (
                                            <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-base-content/60">
                                                {product.description}
                                            </p>
                                        )}

                                        <p className="mt-4 flex items-center gap-4 text-[11px] text-base-content/55">
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

                            {/* Prev / next, one on each side of the card, so it
                                reads as a carousel at a glance instead of the
                                thumbnails below being the only clue that there
                                is more than one product.

                                They sit just OUTSIDE the card and overlap its
                                edge, which keeps them clear of the product
                                photograph and the buttons inside. Hidden below
                                lg, where the card is full-width and there is no
                                margin to sit in — the thumbnail strip is the
                                control there, and it is already touch-sized.

                                text-ink, not text-base-content: the button
                                brings its OWN white surface in both themes, so
                                an icon that follows the theme turns near-white
                                on white in dark mode — measured at 1.12:1,
                                invisible. Fixed dark ink is 17.4:1 on it. */}
                            {featured.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={previous}
                                        aria-label="Previous product"
                                        className="absolute top-1/2 -left-5 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/95 text-ink shadow-xl backdrop-blur-sm transition-all hover:-translate-x-0.5 hover:border-brand-gold hover:bg-white hover:text-primary lg:flex"
                                    >
                                        <FaChevronLeft className="text-[13px]" aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={next}
                                        aria-label="Next product"
                                        className="absolute top-1/2 -right-5 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/95 text-ink shadow-xl backdrop-blur-sm transition-all hover:translate-x-0.5 hover:border-brand-gold hover:bg-white hover:text-primary lg:flex"
                                    >
                                        <FaChevronRight className="text-[13px]" aria-hidden="true" />
                                    </button>
                                </>
                            )}
                            </div>

                            {/* The other featured products, as a horizontal strip.
                                These double as the rotator's controls — a real
                                thumbnail says what you are switching to, which a
                                row of dots cannot.

                                Thumbnails only, no captions. The strip holds up
                                to five items now that the client picks them, and
                                five columns of brand-plus-price text at this
                                width truncates to nothing useful. The active
                                item's name is already spelled out on the card
                                directly above, so repeating it here bought
                                nothing and cost the room the images needed. */}
                            {/* Held to a sensible width rather than stretched
                                across the whole card. The card is wide now, so
                                five equal tiles across it made each one far
                                wider than it is tall and the products sat lost
                                in the middle of them. */}
                            {featured.length > 1 && (
                                <div className="mt-4 flex max-w-lg gap-2.5">
                                    {featured.map((item, dot) => (
                                        <button
                                            key={item._id}
                                            type="button"
                                            onClick={() => goTo(dot)}
                                            aria-label={`Show ${item.name}`}
                                            aria-current={dot === index}
                                            title={item.name}
                                            className={`flex flex-1 items-center justify-center rounded-xl border p-1.5 backdrop-blur-sm transition-all ${
                                                dot === index
                                                    ? 'border-brand-gold bg-white/25 shadow-lg'
                                                    : 'border-white/20 bg-white/8 hover:border-white/45 hover:bg-white/15'
                                            }`}
                                        >
                                            {/* A short fixed height, not a
                                                square. A square tile is as tall
                                                as it is wide, so a portrait
                                                bottle had to shrink to fit and
                                                read as half a product. A wide
                                                short tile matches the strip's
                                                real proportions, and
                                                object-contain then shows the
                                                WHOLE product inside it. */}
                                            <img
                                                src={resolveCardImageUrl(item.image)}
                                                alt=""
                                                loading="lazy"
                                                className="h-12 w-full rounded-lg bg-white object-contain p-1"
                                            />
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
