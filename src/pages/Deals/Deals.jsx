import React, { useMemo, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import PageHeader from '../../components/PageHeader';
import PromoBanner from '../../components/PromoBanner';
import Loader from '../../components/Loader';
import UseCatalogue from '../../Hooks/UseCatalogue';
import { byAvailability, isInStock } from '../../utils/catalogue';
import { getBannersByPlacement } from '../../data/banners';
import { calcDiscount } from '../../utils/formatCurrency';

/* ---------------------------------------------------------------------------
   Offers.

   This page used to list only products carrying a strike-through discount.
   The client prices each item once rather than running reductions, so that
   filter matched nothing and the page was permanently empty.

   It now leads with genuine reductions when any exist, and otherwise shows
   what is actually worth featuring — in-stock items, newest first. The
   category filters are built from the live catalogue rather than a hardcoded
   list that would rot the moment a category is renamed.
--------------------------------------------------------------------------- */

const Deals = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const { products, categories, loading, error } = UseCatalogue();

    const [strip] = getBannersByPlacement('strip');

    const filters = useMemo(
        () => [
            { label: 'All', value: 'all' },
            ...categories.map((category) => ({
                label: category.name,
                value: category.slug,
            })),
        ],
        [categories],
    );

    const { featured, hasRealDiscounts } = useMemo(() => {
        const inCategory = products.filter(
            (product) => activeFilter === 'all' || product.category === activeFilter,
        );

        const discounted = inCategory.filter(
            (product) => calcDiscount(product.price, product.oldPrice) > 0,
        );

        if (discounted.length > 0) {
            return {
                hasRealDiscounts: true,
                featured: [...discounted].sort(
                    (a, b) =>
                        byAvailability(a, b) ||
                        calcDiscount(b.price, b.oldPrice) - calcDiscount(a.price, a.oldPrice),
                ),
            };
        }

        return {
            hasRealDiscounts: false,
            featured: inCategory
                .filter(isInStock)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        };
    }, [products, activeFilter]);

    return (
        <div>
            <PageHeader
                eyebrow="Featured"
                title={hasRealDiscounts ? 'Deals & special offers' : 'Featured products'}
                subtitle="Genuine branded stock at honest prices. Order any item on WhatsApp."
                image="/banners/deals.jpg"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'Deals' }]}
            />

            {strip && (
                <div className="container-px pt-10 lg:pt-14">
                    <PromoBanner banner={strip} variant="strip" />
                </div>
            )}

            <div className="container-px section-y">
                <SectionTitle
                    eyebrow="Browse"
                    title={hasRealDiscounts ? 'Current offers' : 'In stock now'}
                />

                <div className="mb-10 flex flex-wrap justify-center gap-2">
                    {filters.map((filter) => (
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

                {loading ? (
                    <Loader />
                ) : error ? (
                    <EmptyState
                        title="Could not load products"
                        message={error}
                        actionLabel="Back to home"
                        actionPath="/"
                    />
                ) : featured.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                        {featured.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="Nothing in this category yet"
                        message="Check back soon, or browse everything currently in stock."
                        actionLabel="View all products"
                        actionPath="/shop"
                    />
                )}
            </div>
        </div>
    );
};

export default Deals;
