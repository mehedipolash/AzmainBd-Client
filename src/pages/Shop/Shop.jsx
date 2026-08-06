import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { FaSliders, FaXmark } from 'react-icons/fa6';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import PageHeader from '../../components/PageHeader';
import ShopFilters from './ShopFilters';
import { products, isSoldOut, byAvailability } from '../../data/products';
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
    const [inStockOnly, setInStockOnly] = useState(false);
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
        setInStockOnly(false);
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
            if (inStockOnly && isSoldOut(product)) return false;
            return true;
        });

        // Sort a copy so the source array is never mutated. Availability is the
        // primary key on every ordering — customers should never lead with
        // items they cannot buy.
        switch (sortBy) {
            case 'price-asc':
                return [...filtered].sort((a, b) => byAvailability(a, b) || a.price - b.price);
            case 'price-desc':
                return [...filtered].sort((a, b) => byAvailability(a, b) || b.price - a.price);
            case 'rating':
                return [...filtered].sort((a, b) => byAvailability(a, b) || b.rating - a.rating);
            default:
                return [...filtered].sort(
                    (a, b) => byAvailability(a, b) || new Date(b.createdAt) - new Date(a.createdAt),
                );
        }
    }, [category, search, selectedBrands, selectedTech, maxPrice, inStockOnly, sortBy]);

    const soldOutCount = visibleProducts.filter(isSoldOut).length;

    const filterProps = {
        selectedBrands,
        onToggleBrand: toggle(setSelectedBrands),
        selectedTech,
        onToggleTech: toggle(setSelectedTech),
        maxPrice,
        onMaxPriceChange: setMaxPrice,
        inStockOnly,
        onInStockOnlyChange: setInStockOnly,
        priceBounds: PRICE_BOUNDS,
        onClearAll: handleClearAll,
    };

    return (
        <div>
            <PageHeader
                eyebrow="Shop"
                title={search ? `Results for “${search}”` : 'All products'}
                subtitle="Authorised stock with full manufacturer warranty on every order."
                image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'Shop' }]}
            />

            <div className="container-px py-10 lg:py-14">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
                    <aside className="hidden w-60 shrink-0 lg:block">
                        <div className="sticky top-28">
                            <ShopFilters {...filterProps} />
                        </div>
                    </aside>

                    <div className="min-w-0 flex-1">
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-base-300 pb-5">
                            <p className="text-[13px] text-base-content/55">
                                {visibleProducts.length}{' '}
                                {visibleProducts.length === 1 ? 'product' : 'products'}
                                {soldOutCount > 0 && (
                                    <span className="text-base-content/40">
                                        {' '}
                                        · {soldOutCount} sold out
                                    </span>
                                )}
                            </p>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setDrawerOpen(true)}
                                    className="flex items-center gap-2 border border-base-300 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase lg:hidden"
                                >
                                    <FaSliders className="text-xs" />
                                    Filters
                                </button>

                                <label className="flex items-center gap-2 text-[13px] text-base-content/55">
                                    <span className="hidden sm:inline">Sort:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="border border-base-300 bg-base-100 px-3 py-2 text-[13px] outline-none focus:border-base-content/40"
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
                            <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                                {visibleProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
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
                        className="absolute inset-0 bg-ink/50"
                        onClick={() => setDrawerOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute inset-y-0 left-0 w-75 max-w-[85%] overflow-y-auto bg-base-100 p-6">
                        <button
                            type="button"
                            onClick={() => setDrawerOpen(false)}
                            className="absolute top-5 right-5 text-lg"
                            aria-label="Close filters"
                        >
                            <FaXmark />
                        </button>
                        <ShopFilters {...filterProps} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
