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
    priceBounds,
    onClearAll,
}) => {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                    type="button"
                    onClick={onClearAll}
                    className="text-xs text-primary hover:underline"
                >
                    Clear all
                </button>
            </div>

            <fieldset>
                <legend className="mb-3 text-xs font-semibold tracking-widest text-base-content/50 uppercase">
                    Brand
                </legend>
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <label key={brand} className="flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => onToggleBrand(brand)}
                                className="checkbox checkbox-sm checkbox-primary"
                            />
                            <span className="text-sm text-base-content/80">{brand}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <fieldset className="border-t border-base-300 pt-6">
                <legend className="mb-3 text-xs font-semibold tracking-widest text-base-content/50 uppercase">
                    Price Range
                </legend>
                <div className="mb-2 flex justify-between text-xs text-base-content/60">
                    <span>{formatCurrency(priceBounds.min)}</span>
                    <span>{formatCurrency(maxPrice)}</span>
                </div>
                <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={1000}
                    value={maxPrice}
                    onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                    className="range range-primary range-sm"
                    aria-label="Maximum price"
                />
            </fieldset>

            <fieldset className="border-t border-base-300 pt-6">
                <legend className="mb-3 text-xs font-semibold tracking-widest text-base-content/50 uppercase">
                    Technology
                </legend>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => {
                        const active = selectedTech.includes(tech);

                        return (
                            <button
                                key={tech}
                                type="button"
                                onClick={() => onToggleTech(tech)}
                                aria-pressed={active}
                                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                                    active
                                        ? 'border-primary bg-primary text-primary-content'
                                        : 'border-base-300 bg-base-200 text-base-content/70 hover:border-primary/50'
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
