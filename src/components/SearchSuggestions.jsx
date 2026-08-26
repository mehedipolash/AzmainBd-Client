import React from 'react';
import { Link } from 'react-router';
import { resolveCardImageUrl } from '../utils/imageUrl';
import { isSoldOut } from '../utils/catalogue';

// The live dropdown under the navbar search. Shared by the desktop panel and
// the mobile drawer so both show the exact same matches for a query. Purely
// presentational — the parent owns the query, the results and what a tap does.
const SearchSuggestions = ({ results, query, onPick, onSeeAll }) => {
    const term = query.trim();
    if (!term) return null;

    if (results.length === 0) {
        return (
            <div className="px-4 py-5 text-center text-[13px] text-base-content/50">
                No products match “{term}”.
            </div>
        );
    }

    return (
        <div>
            <ul className="max-h-80 overflow-y-auto">
                {results.map((product) => {
                    const soldOut = isSoldOut(product);

                    return (
                        <li key={product._id}>
                            <Link
                                to={`/product/${product._id}`}
                                onClick={onPick}
                                className="flex items-center gap-3 border-b border-base-300 px-4 py-3 transition-colors hover:bg-base-200/60"
                            >
                                {/* Small fixed thumbnail, contain so the whole
                                    product shows however it was shot. */}
                                <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-base-300 bg-white">
                                    <img
                                        src={resolveCardImageUrl(product.image)}
                                        alt=""
                                        loading="lazy"
                                        className={`h-full w-full object-contain p-1 ${
                                            soldOut ? 'opacity-45 grayscale' : ''
                                        }`}
                                    />
                                </span>

                                <span className="min-w-0 flex-1">
                                    {product.brand && (
                                        <span className="block text-[10px] font-semibold tracking-[0.12em] text-primary uppercase">
                                            {product.brand}
                                        </span>
                                    )}
                                    <span className="block truncate text-[14px] font-medium">
                                        {product.name}
                                    </span>
                                </span>

                                {soldOut && (
                                    <span className="shrink-0 text-[10px] font-semibold tracking-wide text-base-content/40 uppercase">
                                        Sold out
                                    </span>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Enter, or this row, takes the shopper to the full results page. */}
            <button
                type="button"
                onClick={onSeeAll}
                className="block w-full px-4 py-3 text-center text-[13px] font-semibold tracking-wide text-primary transition-colors hover:bg-base-200/60"
            >
                See all results for “{term}”
            </button>
        </div>
    );
};

export default SearchSuggestions;
