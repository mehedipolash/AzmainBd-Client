import React from 'react';

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
    inStockOnly,
    onInStockOnlyChange,
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

            {/* The max-price slider was removed with the rest of the price
                display. A filter that prints "৳ 450" at one end and "৳ 3,400"
                at the other is a price display, and one whose handle can be
                dragged to read off any individual product's price — which is
                exactly what the client asked to keep on the product page only.
                Brand, category and availability all still filter. */}
        </div>
    );
};

export default ShopFilters;
