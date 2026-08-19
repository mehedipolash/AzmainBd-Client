import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

/* Filter options are passed in rather than imported: brands and categories now
   come from the live catalogue, so a brand the owner adds in the admin panel
   appears here without a code change. */
const ShopFilters = ({
    brands = [],
    selectedBrands,
    onToggleBrand,
    categories = [],
    selectedCategory,
    onCategoryChange,
    maxPrice,
    onMaxPriceChange,
    inStockOnly,
    onInStockOnlyChange,
    priceBounds,
    onClearAll,
}) => {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-base-300 pb-4">
                <h2 className="font-display text-lg font-semibold">Filters</h2>
                <button
                    type="button"
                    onClick={onClearAll}
                    className="text-[11px] tracking-[0.12em] text-base-content/45 uppercase hover:text-base-content"
                >
                    Clear all
                </button>
            </div>

            {/* Availability first — it is the filter customers reach for most. */}
            <div>
                <label className="flex cursor-pointer items-center gap-3">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => onInStockOnlyChange(e.target.checked)}
                        className="size-4 accent-primary"
                    />
                    <span className="text-sm">In stock only</span>
                </label>
            </div>

            {categories.length > 0 && (
                <fieldset className="border-t border-base-300 pt-6">
                    <legend className="eyebrow mb-4">Category</legend>
                    <div className="space-y-2.5">
                        <label className="flex cursor-pointer items-center gap-3">
                            <input
                                type="radio"
                                name="category"
                                checked={!selectedCategory}
                                onChange={() => onCategoryChange('')}
                                className="size-4 accent-primary"
                            />
                            <span className="text-sm text-base-content/75">All categories</span>
                        </label>

                        {categories.map((category) => (
                            <label
                                key={category.slug}
                                className="flex cursor-pointer items-center gap-3"
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === category.slug}
                                    onChange={() => onCategoryChange(category.slug)}
                                    className="size-4 accent-primary"
                                />
                                <span className="text-sm text-base-content/75">
                                    {category.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            )}

            {brands.length > 0 && (
                <fieldset className="border-t border-base-300 pt-6">
                    <legend className="eyebrow mb-4">Brand</legend>
                    <div className="space-y-2.5">
                        {brands.map((brand) => (
                            <label key={brand} className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => onToggleBrand(brand)}
                                    className="size-4 accent-primary"
                                />
                                <span className="text-sm text-base-content/75">{brand}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            )}

            <fieldset className="border-t border-base-300 pt-6">
                <legend className="eyebrow mb-4">Max price</legend>
                <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                    className="w-full accent-primary"
                    aria-label="Maximum price"
                />
                <div className="mt-2 flex justify-between text-[12px] text-base-content/55">
                    <span>{formatCurrency(priceBounds.min)}</span>
                    <span className="font-medium text-base-content">
                        {formatCurrency(maxPrice)}
                    </span>
                </div>
                {/* Unpriced items would otherwise vanish the moment the slider
                    moves, which looks like stock disappearing. */}
                <p className="mt-3 text-[11px] leading-relaxed text-base-content/45">
                    Items marked “price on request” are always shown.
                </p>
            </fieldset>
        </div>
    );
};

export default ShopFilters;
