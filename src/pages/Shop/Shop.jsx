import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import ShopFilters from './ShopFilters';
import { products } from '../../data/products';
import { SORT_OPTIONS } from '../../utils/constants';

// Price bounds are derived from the catalogue rather than hardcoded, so the
// slider stays correct when the real API replaces the mock data.
const PRICE_BOUNDS = {
    min: 0,
    max: Math.max(...products.map((product) => product.price)),
};

const Shop = () => {
    // Category and search live in the URL so results stay shareable and the
    // browser back button behaves. Local filters stay in state.
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') ?? '';
    const search = searchParams.get('search') ?? '';

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedTech, setSelectedTech] = useState([]);
    const [maxPrice, setMaxPrice] = useState(PRICE_BOUNDS.max);
    const [sortBy, setSortBy] = useState('newest');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggle = (setter) => (value) =>
        setter((current) =>
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
        );

    const handleClearAll = () => {
        setSelectedBrands([]);
        setSelectedTech([]);
        setMaxPrice(PRICE_BOUNDS.max);
    };

    const visibleProducts = useMemo(() => {
        const term = search.trim().toLowerCase();

        const filtered = products.filter((product) => {
            if (category && product.category !== category) return false;
            if (term && !product.name.toLowerCase().includes(term)) return false;
            if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;
            if (selectedTech.length && !selectedTech.some((tech) => product.specs.includes(tech))) {
                return false;
            }
            if (product.price > maxPrice) return false;
            return true;
        });

        // Sort a copy so the source array is never mutated.
        switch (sortBy) {
            case 'price-asc':
                return [...filtered].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...filtered].sort((a, b) => b.price - a.price);
            case 'rating':
                return [...filtered].sort((a, b) => b.rating - a.rating);
            default:
                return filtered;
        }
    }, [category, search, selectedBrands, selectedTech, maxPrice, sortBy]);

    const filterProps = {
        selectedBrands,
        onToggleBrand: toggle(setSelectedBrands),
        selectedTech,
        onToggleTech: toggle(setSelectedTech),
        maxPrice,
        onMaxPriceChange: setMaxPrice,
        priceBounds: PRICE_BOUNDS,
        onClearAll: handleClearAll,
    };

    return (
        <div>
            {/* Tinted page header keeps Shop visually distinct from Home. */}
            <div className="tint-2 border-b border-base-300">
                <div className="container-px py-8 sm:py-10">
                    <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                        {search ? `Results for "${search}"` : 'Shop All Products'}
                    </h1>
                    <span className="brand-gradient mt-3 block h-1 w-16 rounded-full" />
                </div>
            </div>

            <div className="container-px py-8 sm:py-10 lg:py-12">
                <div className="flex flex-col gap-8 lg:flex-row">
                    <aside className="hidden w-64 shrink-0 lg:block">
                        <div className="sticky top-24 rounded-box border border-base-300 bg-base-100 p-5">
                            <ShopFilters {...filterProps} />
                        </div>
                    </aside>

                    <div className="min-w-0 flex-1">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
                            <p className="text-sm text-base-content/60">
                                Showing{' '}
                                <span className="font-bold text-primary">
                                    {visibleProducts.length}
                                </span>{' '}
                                {search ? 'results' : 'premium products'}
                            </p>

                            <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={() => setDrawerOpen(true)}
                                    className="btn btn-sm rounded-full lg:hidden"
                                >
                                    <FiFilter />
                                    Filters
                                </button>

                                <label className="flex items-center gap-2 text-sm text-base-content/60">
                                    <span className="hidden sm:inline">Sort by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="select select-sm w-40 rounded-full border-base-300 bg-base-100 sm:w-44"
                                        aria-label="Sort products"
                                    >
                                        {SORT_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>

                        {visibleProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                                {visibleProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        variant="compact"
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="No products found"
                                message="Try widening your price range or clearing a few filters."
                                actionLabel="Clear filters"
                                actionPath="/shop"
                            />
                        )}
                    </div>
                </div>
            </div>

            {drawerOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-neutral/60"
                        onClick={() => setDrawerOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto border-r border-base-300 bg-base-100 p-6">
                        <button
                            type="button"
                            onClick={() => setDrawerOpen(false)}
                            className="btn btn-ghost btn-circle btn-sm absolute top-4 right-4"
                            aria-label="Close filters"
                        >
                            <FiX />
                        </button>
                        <ShopFilters {...filterProps} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
