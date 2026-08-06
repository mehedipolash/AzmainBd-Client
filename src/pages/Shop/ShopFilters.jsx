import React from 'react';
import { brands, technologies } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';

const ShopFilters = ({
    selectedBrands,
    onToggleBrand,
    selectedTech,
    onToggleTech,
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

            <fieldset className="border-t border-base-300 pt-6">
                <legend className="eyebrow mb-4">Max price</legend>
                <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={1000}
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
            </fieldset>

            <fieldset className="border-t border-base-300 pt-6">
                <legend className="eyebrow mb-4">Technology</legend>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => {
                        const active = selectedTech.includes(tech);

                        return (
                            <button
                                key={tech}
                                type="button"
                                onClick={() => onToggleTech(tech)}
                                aria-pressed={active}
                                className={`border px-3 py-1.5 text-[11px] tracking-wide transition-colors ${
                                    active
                                        ? 'border-primary bg-primary text-primary-content'
                                        : 'border-base-300 text-base-content/65 hover:border-base-content/40'
                                }`}
                            >
                                {tech}
                            </button>
                        );
                    })}
                </div>
            </fieldset>
        </div>
    );
};

export default ShopFilters;
