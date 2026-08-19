import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { FaSliders, FaXmark } from 'react-icons/fa6';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import ShopFilters from './ShopFilters';
import UseCatalogue from '../../Hooks/UseCatalogue';
import { isSoldOut, byAvailability, getBrands } from '../../utils/catalogue';
import { SORT_OPTIONS } from '../../utils/constants';

const Shop = () => {
    // Category and search live in the URL so results stay shareable and the
    // browser back button behaves. Local filters stay in state.
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') ?? '';
    const search = searchParams.get('search') ?? '';

    const { products, categories, loading, error } = UseCatalogue();

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [maxPrice, setMaxPrice] = useState(null);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Bounds follow the live catalogue. Unpriced items are excluded from the
    // max calculation — they have no price to be the ceiling.
    const priceBounds = useMemo(() => {
        const prices = products.map((product) => product.price).filter(Boolean);
        return { min: 0, max: prices.length ? Math.max(...prices) : 10000 };
    }, [products]);

    // maxPrice starts as null and adopts the real ceiling once products land,
    // so the slider is never pinned to a stale bound from the first render.
    useEffect(() => {
        setMaxPrice((current) => (current === null ? priceBounds.max : current));
    }, [priceBounds.max]);

    const brands = useMemo(() => getBrands(products), [products]);

    const toggleBrand = (value) =>
        setSelectedBrands((current) =>
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
        );

    const handleCategoryChange = (slug) => {
        const next = new URLSearchParams(searchParams);
        if (slug) next.set('category', slug);
        else next.delete('category');
        setSearchParams(next);
        setDrawerOpen(false);
    };

    const handleClearAll = () => {
        setSelectedBrands([]);
        setMaxPrice(priceBounds.max);
        setInStockOnly(false);
    };

    const visibleProducts = useMemo(() => {
        const term = search.trim().toLowerCase();
        const ceiling = maxPrice ?? priceBounds.max;

        const filtered = products.filter((product) => {
            if (category && product.category !== category) return false;
            if (term && !product.name.toLowerCase().includes(term)) return false;
            if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;
            // An unpriced item has nothing to compare against the slider, so it
            // stays visible rather than silently disappearing.
            if (product.price && product.price > ceiling) return false;
            if (inStockOnly && isSoldOut(product)) return false;
            return true;
        });

        // Sort a copy so the source array is never mutated. Availability is the
        // primary key on every ordering — customers should never lead with
        // items they cannot buy. Unpriced items sort last within price sorts.
        const byPrice = (direction) => (a, b) => {
            const availability = byAvailability(a, b);
            if (availability) return availability;
            if (!a.price) return 1;
            if (!b.price) return -1;
            return direction === 'asc' ? a.price - b.price : b.price - a.price;
        };

        switch (sortBy) {
            case 'price-asc':
                return [...filtered].sort(byPrice('asc'));
            case 'price-desc':
                return [...filtered].sort(byPrice('desc'));
            default:
                return [...filtered].sort(
                    (a, b) => byAvailability(a, b) || new Date(b.createdAt) - new Date(a.createdAt),
                );
        }
    }, [
        products,
        category,
        search,
        selectedBrands,
        maxPrice,
        priceBounds.max,
        inStockOnly,
        sortBy,
    ]);

    const soldOutCount = visibleProducts.filter(isSoldOut).length;

    const filterProps = {
        brands,
        selectedBrands,
        onToggleBrand: toggleBrand,
        categories,
        selectedCategory: category,
        onCategoryChange: handleCategoryChange,
        maxPrice: maxPrice ?? priceBounds.max,
        onMaxPriceChange: setMaxPrice,
        inStockOnly,
        onInStockOnlyChange: setInStockOnly,
        priceBounds,
        onClearAll: handleClearAll,
    };

    const activeCategory = categories.find((item) => item.slug === category);

    return (
        <div>
            <PageHeader
                eyebrow="Shop"
                title={
                    search
                        ? `Results for “${search}”`
                        : (activeCategory?.name ?? 'All products')
                }
                subtitle="Genuine branded stock, sourced direct. Order any item on WhatsApp."
                image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=80"
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

                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <EmptyState
                                title="Could not load products"
                                message={error}
                                actionLabel="Back to home"
                                actionPath="/"
                            />
                        ) : visibleProducts.length > 0 ? (
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
