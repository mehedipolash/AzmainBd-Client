import React from 'react';
import { Link } from 'react-router';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { formatCurrency, calcDiscount } from '../utils/formatCurrency';

// Badge colors walk the brand ramp so a grid of cards shows the whole palette
// instead of one repeated accent.
const BADGE_STYLES = {
    HOT: 'bg-brand-1 text-white',
    NEW: 'bg-brand-2 text-neutral',
    SALE: 'bg-brand-4 text-neutral',
    PREMIUM: 'bg-brand-3 text-neutral',
    FEATURED: 'bg-brand-1 text-white',
    'BEST SELLER': 'bg-brand-2 text-neutral',
};

// One card shape for every grid on the site. `variant="compact"` renders the
// add-to-cart version used on Shop and Trending.
const ProductCard = ({ product, variant = 'default' }) => {
    const { _id, name, image, price, oldPrice, badge, specs, inStock, rating } = product;
    const isCompact = variant === 'compact';
    const discount = calcDiscount(price, oldPrice);

    const handleAddToCart = () => {
        // Wired to CartContext once that is built.
    };

    return (
        <article className="card-surface group flex h-full flex-col overflow-hidden">
            <Link to={`/product/${_id}`} className="relative block">
                <figure className="aspect-4/3 overflow-hidden bg-base-200">
                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </figure>

                {badge && (
                    <span
                        className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm ${
                            BADGE_STYLES[badge] ?? 'bg-primary text-primary-content'
                        }`}
                    >
                        {badge}
                    </span>
                )}

                {discount > 0 && (
                    <span className="absolute right-3 bottom-3 rounded-full bg-base-100/95 px-2.5 py-1 text-[11px] font-bold text-primary shadow-sm">
                        -{discount}%
                    </span>
                )}

                {!inStock && (
                    <span className="absolute inset-0 flex items-center justify-center bg-base-100/70 text-sm font-bold tracking-wide uppercase backdrop-blur-[2px]">
                        Out of stock
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                    <Link to={`/product/${_id}`} className="min-w-0">
                        <h3 className="line-clamp-1 font-semibold transition-colors group-hover:text-primary">
                            {name}
                        </h3>
                    </Link>
                    {rating && (
                        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-base-content/60">
                            <FiStar className="fill-current text-brand-1" aria-hidden="true" />
                            {rating}
                        </span>
                    )}
                </div>

                {specs?.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5">
                        {specs.map((spec) => (
                            <li
                                key={spec}
                                className="rounded-md bg-base-200 px-2 py-0.5 text-[11px] text-base-content/60"
                            >
                                {spec}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-auto flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-extrabold text-primary">
                        {formatCurrency(price)}
                    </span>
                    {oldPrice && (
                        <span className="text-sm text-base-content/40 line-through">
                            {formatCurrency(oldPrice)}
                        </span>
                    )}
                </div>

                {isCompact ? (
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className="btn btn-primary btn-sm w-full rounded-full"
                        aria-label={`Add ${name} to cart`}
                    >
                        <FiShoppingCart />
                        Add to Cart
                    </button>
                ) : (
                    <Link
                        to={`/product/${_id}`}
                        className="btn btn-outline btn-primary btn-sm w-full rounded-full"
                    >
                        View Details
                    </Link>
                )}
            </div>
        </article>
    );
};

export default ProductCard;
