import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
import { FiShoppingCart, FiCheck, FiTruck, FiShield, FiStar } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import SectionTitle from '../../components/SectionTitle';
import { products } from '../../data/products';
import { formatCurrency, calcDiscount } from '../../utils/formatCurrency';

const ProductDetails = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const product = products.find((item) => item._id === id);

    if (!product) {
        return (
            <div className="container-px py-16">
                <EmptyState
                    title="Product not found"
                    message="The product you are looking for is no longer available."
                    actionLabel="Back to shop"
                    actionPath="/shop"
                />
            </div>
        );
    }

    const related = products
        .filter((item) => item.category === product.category && item._id !== product._id)
        .slice(0, 3);

    const discount = calcDiscount(product.price, product.oldPrice);

    const handleAddToCart = () => {
        // Wired to CartContext once that is built.
    };

    return (
        <div className="container-px py-8 sm:py-10 lg:py-12">
            <div className="breadcrumbs mb-6 text-sm text-base-content/60 sm:mb-8">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
                    </li>
                    <li className="text-base-content">{product.name}</li>
                </ul>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <figure className="overflow-hidden rounded-box border border-base-300 bg-base-200 shadow-lg shadow-primary/5">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="aspect-square w-full object-cover"
                    />
                </figure>

                <div>
                    <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                        {product.brand}
                    </p>
                    <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                        {product.name}
                    </h1>

                    <div className="mt-4 flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-1 text-primary">
                            <FiStar className="fill-current" aria-hidden="true" />
                            {product.rating}
                        </span>
                        <span className="text-base-content/50">({product.reviews} reviews)</span>
                    </div>

                    <div className="mt-6 flex flex-wrap items-baseline gap-3">
                        <span className="text-3xl font-bold text-primary">
                            {formatCurrency(product.price)}
                        </span>
                        {product.oldPrice && (
                            <>
                                <span className="text-lg text-base-content/40 line-through">
                                    {formatCurrency(product.oldPrice)}
                                </span>
                                <span className="rounded bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
                                    Save {discount}%
                                </span>
                            </>
                        )}
                    </div>

                    <p className="mt-6 leading-relaxed text-base-content/70">
                        {product.description}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                        {product.specs.map((spec) => (
                            <li
                                key={spec}
                                className="rounded-md bg-base-200 px-3 py-1 text-xs text-base-content/70"
                            >
                                {spec}
                            </li>
                        ))}
                    </ul>

                    <p
                        className={`mt-6 flex items-center gap-2 text-sm ${
                            product.inStock ? 'text-success' : 'text-error'
                        }`}
                    >
                        <FiCheck aria-hidden="true" />
                        {product.inStock ? 'In stock — ships within 24 hours' : 'Out of stock'}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <div className="join border border-base-300">
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="btn join-item btn-sm btn-ghost"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <span
                                className="join-item flex w-12 items-center justify-center text-sm font-semibold"
                                aria-live="polite"
                            >
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => q + 1)}
                                className="btn join-item btn-sm btn-ghost"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="btn btn-primary flex-1 rounded-full shadow-lg shadow-primary/20 sm:flex-none sm:px-10"
                        >
                            <FiShoppingCart />
                            Add to Cart
                        </button>
                    </div>

                    <div className="mt-8 grid gap-3 border-t border-base-300 pt-6 sm:grid-cols-2">
                        <p className="flex items-center gap-3 text-sm text-base-content/70">
                            <FiTruck className="text-primary" aria-hidden="true" />
                            Free delivery across Bangladesh
                        </p>
                        <p className="flex items-center gap-3 text-sm text-base-content/70">
                            <FiShield className="text-primary" aria-hidden="true" />
                            Official brand warranty
                        </p>
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <section className="mt-20">
                    <SectionTitle title="Related Products" />
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((item) => (
                            <ProductCard key={item._id} product={item} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetails;
