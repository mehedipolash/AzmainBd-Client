import React from 'react';
import { Link } from 'react-router';
import { FaWhatsapp } from 'react-icons/fa6';
import UseCatalogue from '../../../Hooks/UseCatalogue';
import { getDealOfTheDay, LOW_STOCK_THRESHOLD } from '../../../utils/catalogue';
import { formatCurrency, calcDiscount, hasPrice } from '../../../utils/formatCurrency';
import { resolveImageUrl } from '../../../utils/imageUrl';
import { productEnquiryLink } from '../../../utils/business';

/* ---------------------------------------------------------------------------
   Featured product.

   This used to run a countdown timer against a "deal window" invented in the
   browser — a clock that reset on every page load and counted down to nothing.
   On a real client's site that is a fabricated urgency signal, so it is gone.

   What remains is honest: the item closest to selling out, with its real
   remaining stock.
--------------------------------------------------------------------------- */

const DealOfTheDay = () => {
    const { products, loading } = UseCatalogue();

    const deal = getDealOfTheDay(products);

    if (loading || !deal) return null;

    const discount = calcDiscount(deal.price, deal.oldPrice);
    const priced = hasPrice(deal);
    const scarce = deal.stock <= LOW_STOCK_THRESHOLD;

    return (
        <section className="container-px section-y">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="relative overflow-hidden bg-base-200" data-aos="fade-right">
                    <img
                        src={resolveImageUrl(deal.image)}
                        alt={deal.name}
                        loading="lazy"
                        className="aspect-4/5 w-full bg-white object-contain"
                    />
                    {discount > 0 && (
                        <span className="absolute top-5 left-5 bg-warning px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-warning-content uppercase">
                            Save {discount}%
                        </span>
                    )}
                </div>

                <div data-aos="fade-left">
                    <p className="eyebrow mb-3">Featured product</p>

                    <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                        {deal.name}
                    </h2>

                    {deal.brand && (
                        <p className="mt-2 text-[12px] tracking-[0.12em] text-base-content/45 uppercase">
                            {deal.brand}
                        </p>
                    )}

                    <p className="mt-5 text-[15px] leading-relaxed text-base-content/65">
                        {deal.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-3">
                        <span
                            className={
                                priced
                                    ? 'text-3xl font-semibold text-primary'
                                    : 'text-xl font-medium text-base-content/60 italic'
                            }
                        >
                            {formatCurrency(deal.price)}
                        </span>
                        {priced && deal.oldPrice && (
                            <span className="text-base text-base-content/35 line-through">
                                {formatCurrency(deal.oldPrice)}
                            </span>
                        )}
                    </div>

                    {/* Real remaining stock, straight from the database. */}
                    <p
                        className={`mt-6 text-sm font-medium ${
                            scarce ? 'text-warning' : 'text-base-content/60'
                        }`}
                    >
                        {scarce
                            ? `Only ${deal.stock} left in stock`
                            : `${deal.stock} in stock, ready to dispatch`}
                    </p>

                    {deal.specs?.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-2">
                            {deal.specs.map((spec) => (
                                <li
                                    key={spec}
                                    className="border border-base-300 px-3 py-1.5 text-[11px] tracking-wide text-base-content/65"
                                >
                                    {spec}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-9 flex flex-wrap gap-3">
                        <Link to={`/product/${deal._id}`} className="btn-shop">
                            View details
                        </Link>
                        <a
                            href={productEnquiryLink(deal)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-7 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90"
                        >
                            <FaWhatsapp className="text-base" aria-hidden="true" />
                            Order on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealOfTheDay;
