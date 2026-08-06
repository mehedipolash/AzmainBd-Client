import React, { useState } from 'react';
import { Link } from 'react-router';
import SectionTitle from '../../components/SectionTitle';
import UseCountdown from '../../Hooks/UseCountdown';
import { products, deals } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';

const DEAL_WINDOW_MS = 8 * 60 * 60 * 1000;

const DEAL_FILTERS = [
    { label: 'All Deals', value: 'all' },
    { label: 'Laptops', value: 'laptops' },
    { label: 'Phones', value: 'smartphones' },
    { label: 'Appliances', value: 'appliances' },
    { label: 'Audio', value: 'audio' },
];

const Deals = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Lazy initialiser runs once on mount, so the deal window is fixed for the
    // life of the page instead of drifting on every render. Replaced by the
    // campaign end time from the API later.
    const [dealEndsAt] = useState(() => Date.now() + DEAL_WINDOW_MS);

    const { hours, minutes, seconds, expired } = UseCountdown(dealEndsAt);

    const featuredDeal = products.find((product) => product._id === 'p1');

    const offers = deals
        .map((deal) => ({
            ...deal,
            product: products.find((product) => product._id === deal.productId),
        }))
        .filter((deal) => deal.product)
        .filter((deal) => activeFilter === 'all' || deal.product.category === activeFilter);

    const pad = (value) => String(value).padStart(2, '0');

    return (
        <div className="container-px space-y-12 py-8 sm:space-y-16 sm:py-10 lg:py-12">
            {featuredDeal && (
                <section className="tint-1 relative overflow-hidden rounded-box border border-base-300 p-5 sm:p-8 lg:p-10">
                    <span className="absolute top-6 right-6 rounded bg-primary px-3 py-1.5 text-xs font-bold tracking-wider text-primary-content uppercase">
                        Deal of the Day
                    </span>

                    <div className="grid items-center gap-8 lg:grid-cols-2">
                        <div className="relative">
                            <img
                                src={featuredDeal.image}
                                alt={featuredDeal.name}
                                className="w-full rounded-box border border-base-300 object-cover"
                            />
                            <span className="absolute bottom-4 left-4 rounded bg-error px-2 py-1 text-[10px] font-bold tracking-wider text-error-content uppercase">
                                Limited Stock
                            </span>
                        </div>

                        <div>
                            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                                {featuredDeal.name}
                            </h1>
                            <p className="mt-4 text-sm leading-relaxed text-base-content/70">
                                {featuredDeal.description}
                            </p>

                            <ul className="mt-5 flex flex-wrap gap-2">
                                {featuredDeal.specs.map((spec) => (
                                    <li
                                        key={spec}
                                        className="rounded-md bg-base-200 px-2.5 py-1 text-xs text-base-content/70"
                                    >
                                        {spec}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-primary">
                                    {formatCurrency(featuredDeal.price)}
                                </span>
                                {featuredDeal.oldPrice && (
                                    <span className="text-lg text-base-content/40 line-through">
                                        {formatCurrency(featuredDeal.oldPrice)}
                                    </span>
                                )}
                            </div>

                            <div className="mt-6">
                                <p className="mb-2 text-xs font-semibold tracking-widest text-base-content/50 uppercase">
                                    {expired ? 'Offer ended' : 'Ends in:'}
                                </p>
                                <div className="flex gap-3">
                                    {[
                                        { value: hours, unit: 'HRS' },
                                        { value: minutes, unit: 'MIN' },
                                        { value: seconds, unit: 'SEC' },
                                    ].map((part) => (
                                        <div
                                            key={part.unit}
                                            className="brand-gradient flex w-16 flex-col items-center rounded-box py-2 text-neutral shadow-sm"
                                        >
                                            <span className="font-mono text-xl font-bold">
                                                {pad(part.value)}
                                            </span>
                                            <span className="text-[10px] text-base-content/50">
                                                {part.unit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link
                                to={`/product/${featuredDeal._id}`}
                                className="btn btn-primary mt-8 w-full rounded-full shadow-lg shadow-primary/25 sm:w-auto sm:px-12"
                            >
                                Grab Deal Now
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <SectionTitle title="Exclusive Offers" />

                    <ul className="flex flex-wrap gap-2 pb-2">
                        {DEAL_FILTERS.map((filter) => (
                            <li key={filter.value}>
                                <button
                                    type="button"
                                    onClick={() => setActiveFilter(filter.value)}
                                    aria-pressed={activeFilter === filter.value}
                                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                                        activeFilter === filter.value
                                            ? 'border-primary text-primary'
                                            : 'border-base-300 text-base-content/70 hover:border-primary/50'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                    {offers.map(({ _id, discount, product }) => (
                        <Link
                            key={_id}
                            to={`/product/${product._id}`}
                            className="card-surface group relative overflow-hidden"
                        >
                            <span className="absolute top-0 left-0 z-10 rounded-br-box bg-primary px-3 py-1.5 text-xs font-bold text-primary-content">
                                {discount}% OFF
                            </span>

                            <figure className="aspect-4/3 overflow-hidden bg-base-200">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </figure>

                            <div className="p-4">
                                <h3 className="line-clamp-1 text-sm font-semibold">
                                    {product.name}
                                </h3>
                                <p className="mt-2 font-bold text-primary">
                                    {formatCurrency(product.price)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Deals;
