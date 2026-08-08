import React, { useState } from 'react';
import { Link } from 'react-router';
import UseCountdown from '../../../Hooks/UseCountdown';
import { getDealOfTheDay, getSoldPercent } from '../../../data/products';
import { formatCurrency, calcDiscount } from '../../../utils/formatCurrency';

const DEAL_WINDOW_MS = 8 * 60 * 60 * 1000;

const DealOfTheDay = () => {
    // Lazy initialiser runs once on mount, so the deal window is fixed for the
    // life of the page instead of drifting on every render.
    const [dealEndsAt] = useState(() => Date.now() + DEAL_WINDOW_MS);
    const { hours, minutes, seconds, expired } = UseCountdown(dealEndsAt);

    // Picks the discounted, in-stock product closest to selling out, so the
    // banner always promotes something with genuine scarcity.
    const deal = getDealOfTheDay();

    if (!deal) return null;

    const soldPercent = getSoldPercent(deal);
    const remaining = deal.stockTotal - deal.soldCount;
    const discount = calcDiscount(deal.price, deal.oldPrice);
    const pad = (value) => String(value).padStart(2, '0');

    return (
        <section className="container-px section-y">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="relative overflow-hidden bg-base-200" data-aos="fade-right">
                    <img
                        src={deal.image}
                        alt={deal.name}
                        loading="lazy"
                        className="aspect-square w-full object-cover"
                    />
                    {discount > 0 && (
                        <span className="absolute top-5 left-5 bg-warning px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-warning-content uppercase">
                            Save {discount}%
                        </span>
                    )}
                </div>

                <div>
                    <p className="eyebrow mb-3">Deal of the day</p>

                    <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                        {deal.name}
                    </h2>

                    <p className="mt-5 text-[15px] leading-relaxed text-base-content/65">
                        {deal.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-3">
                        <span className="text-3xl font-semibold text-primary">
                            {formatCurrency(deal.price)}
                        </span>
                        {deal.oldPrice && (
                            <span className="text-base text-base-content/35 line-through">
                                {formatCurrency(deal.oldPrice)}
                            </span>
                        )}
                    </div>

                    {/* Stock progress — the honest scarcity signal. */}
                    <div className="mt-8">
                        <div className="mb-2 flex items-baseline justify-between text-[13px]">
                            <span className="text-base-content/60">
                                Sold: <span className="font-medium text-base-content">{deal.soldCount}</span>
                            </span>
                            <span className="text-base-content/60">
                                Available:{' '}
                                <span className="font-medium text-base-content">{remaining}</span>
                            </span>
                        </div>

                        <div
                            className="h-1.5 w-full overflow-hidden bg-base-300"
                            role="progressbar"
                            aria-valuenow={soldPercent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${deal.soldCount} of ${deal.stockTotal} sold`}
                        >
                            <div
                                className="h-full bg-warning transition-[width] duration-500"
                                style={{ width: `${soldPercent}%` }}
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="eyebrow mb-3 text-warning">
                            {expired ? 'Offer ended' : 'Offer ends in'}
                        </p>
                        <div className="flex gap-3">
                            {[
                                { value: hours, unit: 'Hrs' },
                                { value: minutes, unit: 'Min' },
                                { value: seconds, unit: 'Sec' },
                            ].map((part) => (
                                <div
                                    key={part.unit}
                                    className="flex w-17 flex-col items-center border border-warning/30 bg-warning/8 py-2.5"
                                >
                                    <span className="font-display text-2xl font-semibold text-warning tabular-nums">
                                        {pad(part.value)}
                                    </span>
                                    <span className="text-[10px] tracking-[0.14em] text-base-content/45 uppercase">
                                        {part.unit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link to={`/product/${deal._id}`} className="btn-shop mt-9">
                        Shop this deal
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default DealOfTheDay;
