import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import PageHeader from '../../components/PageHeader';
import PromoBanner from '../../components/PromoBanner';
import { products, byAvailability } from '../../data/products';
import { getBannersByPlacement } from '../../data/banners';
import { calcDiscount } from '../../utils/formatCurrency';

const DEAL_FILTERS = [
    { label: 'All deals', value: 'all' },
    { label: 'Laptops', value: 'laptops' },
    { label: 'Phones', value: 'smartphones' },
    { label: 'Audio', value: 'audio' },
    { label: 'Appliances', value: 'appliances' },
];

const Deals = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const [strip] = getBannersByPlacement('strip');

    // A deal is any product carrying a real discount. Sorted by depth of
    // discount, with sold-out items pushed to the end.
    const discounted = products
        .filter((product) => calcDiscount(product.price, product.oldPrice) > 0)
        .filter((product) => activeFilter === 'all' || product.category === activeFilter)
        .sort(
            (a, b) =>
                byAvailability(a, b) ||
                calcDiscount(b.price, b.oldPrice) - calcDiscount(a.price, a.oldPrice),
        );

    return (
        <div>
            <PageHeader
                eyebrow="Savings"
                title="Exclusive deals & special offers"
                subtitle="Genuine reductions on authorised stock — every price includes full manufacturer warranty."
                image="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1600&q=80"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'Deals' }]}
            />

            {strip && (
                <div className="container-px pt-10 lg:pt-14">
                    <PromoBanner banner={strip} variant="strip" />
                </div>
            )}

            <div className="container-px section-y">
                <SectionTitle eyebrow="Browse" title="Current offers" />

                <div className="mb-10 flex flex-wrap justify-center gap-2">
                    {DEAL_FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            type="button"
                            onClick={() => setActiveFilter(filter.value)}
                            aria-pressed={activeFilter === filter.value}
                            className={`border px-5 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors ${
                                activeFilter === filter.value
                                    ? 'border-primary bg-primary text-primary-content'
                                    : 'border-base-300 text-base-content/60 hover:border-base-content/40'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {discounted.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                        {discounted.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="No deals in this category"
                        message="Check back soon, or browse everything currently on offer."
                        actionLabel="View all deals"
                        actionPath="/deals"
                    />
                )}
            </div>
        </div>
    );
};

export default Deals;
