import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
import {
    FaStar,
    FaTruckFast,
    FaShieldHalved,
    FaRotateLeft,
    FaCheck,
    FaRegHeart,
} from 'react-icons/fa6';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import SectionTitle from '../../components/SectionTitle';
import {
    products,
    getRelated,
    isSoldOut,
    isLowStock,
    LOW_STOCK_THRESHOLD,
} from '../../data/products';
import { formatCurrency, calcDiscount } from '../../utils/formatCurrency';

const ProductDetails = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const product = products.find((item) => item._id === id);

    if (!product) {
        return (
            <div className="container-px py-20">
                <EmptyState
                    title="Product not found"
                    message="The product you are looking for is no longer available."
                    actionLabel="Back to shop"
                    actionPath="/shop"
                />
            </div>
        );
    }

    const soldOut = isSoldOut(product);
    const lowStock = isLowStock(product);
    const related = getRelated(product, 4);
    const discount = calcDiscount(product.price, product.oldPrice);

    // Never let the customer request more than we hold.
    const maxQuantity = Math.max(1, product.stock);

    const handleAddToCart = () => {
        // Wired to CartContext once that is built.
    };

    return (
        <div>
            <div className="border-b border-base-300 bg-base-200">
                <div className="container-px py-4">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-base-content/50">
                            <li>
                                <Link to="/" className="hover:text-base-content">
                                    Home
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li>
                                <Link
                                    to={`/shop?category=${product.category}`}
                                    className="capitalize hover:text-base-content"
                                >
                                    {product.category}
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li className="text-base-content">{product.name}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container-px py-10 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="relative overflow-hidden bg-base-200">
                        <img
                            src={product.image}
                            alt={product.name}
                            className={`aspect-square w-full object-cover ${
                                soldOut ? 'opacity-50 grayscale' : ''
                            }`}
                        />
                        {discount > 0 && !soldOut && (
                            <span className="absolute top-5 left-5 bg-base-content px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-base-100 uppercase">
                                Save {discount}%
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="eyebrow mb-3">{product.brand}</p>

                        <h1 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                            {product.name}
                        </h1>

                        <div className="mt-4 flex items-center gap-2 text-[13px]">
                            <span
                                className="flex items-center gap-1"
                                aria-label={`Rated ${product.rating} out of 5`}
                            >
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FaStar
                                        key={index}
                                        className={`text-[11px] ${
                                            index < Math.round(product.rating)
                                                ? 'text-warning'
                                                : 'text-base-content/20'
                                        }`}
                                        aria-hidden="true"
                                    />
                                ))}
                            </span>
                            <span className="text-base-content/50">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>

                        <div className="mt-6 flex flex-wrap items-baseline gap-3">
                            <span className="text-3xl font-medium">
                                {formatCurrency(product.price)}
                            </span>
                            {product.oldPrice && (
                                <span className="text-lg text-base-content/35 line-through">
                                    {formatCurrency(product.oldPrice)}
                                </span>
                            )}
                        </div>

                        <p className="mt-6 text-[15px] leading-relaxed text-base-content/65">
                            {product.description}
                        </p>

                        <ul className="mt-6 flex flex-wrap gap-2">
                            {product.specs.map((spec) => (
                                <li
                                    key={spec}
                                    className="border border-base-300 px-3 py-1.5 text-[12px] text-base-content/65"
                                >
                                    {spec}
                                </li>
                            ))}
                        </ul>

                        {/* Availability line — the exact stock count is shown
                            only when it is low enough to matter. */}
                        <div className="mt-7 border-y border-base-300 py-5">
                            {soldOut ? (
                                <p className="text-sm font-medium text-error">
                                    Currently sold out — join the waitlist below.
                                </p>
                            ) : (
                                <p className="flex items-center gap-2 text-sm">
                                    <FaCheck className="text-xs text-success" aria-hidden="true" />
                                    <span className="font-medium text-success">In stock</span>
                                    <span className="text-base-content/50">
                                        {lowStock
                                            ? `— only ${product.stock} left, order soon`
                                            : '— ships within 24 hours'}
                                    </span>
                                </p>
                            )}
                        </div>

                        <div className="mt-7 flex flex-wrap items-stretch gap-3">
                            {!soldOut && (
                                <div className="flex items-stretch border border-base-300">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        disabled={quantity <= 1}
                                        className="px-4 text-lg disabled:opacity-30"
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span
                                        className="flex w-12 items-center justify-center text-sm font-medium"
                                        aria-live="polite"
                                    >
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQuantity((q) => Math.min(maxQuantity, q + 1))
                                        }
                                        disabled={quantity >= maxQuantity}
                                        className="px-4 text-lg disabled:opacity-30"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className={soldOut ? 'btn-shop-outline flex-1' : 'btn-shop flex-1'}
                            >
                                {soldOut ? 'Notify when available' : 'Add to cart'}
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center border border-base-300 px-4 transition-colors hover:border-base-content/40"
                                aria-label="Add to wishlist"
                            >
                                <FaRegHeart />
                            </button>
                        </div>

                        {lowStock && (
                            <p className="mt-3 text-[12px] text-base-content/45">
                                Maximum {maxQuantity} per order while stock is below{' '}
                                {LOW_STOCK_THRESHOLD} units.
                            </p>
                        )}

                        <ul className="mt-8 space-y-3 text-sm text-base-content/60">
                            <li className="flex items-center gap-3">
                                <FaTruckFast className="text-sm" aria-hidden="true" />
                                Free delivery across Bangladesh on orders over ৳ 5,000
                            </li>
                            <li className="flex items-center gap-3">
                                <FaShieldHalved className="text-sm" aria-hidden="true" />
                                Official brand warranty included
                            </li>
                            <li className="flex items-center gap-3">
                                <FaRotateLeft className="text-sm" aria-hidden="true" />
                                7-day returns, no questions asked
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <section className="border-t border-base-300 bg-base-200">
                    <div className="container-px section-y">
                        <SectionTitle eyebrow="You may also like" title="Related products" />

                        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                            {related.map((item) => (
                                <ProductCard key={item._id} product={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetails;
