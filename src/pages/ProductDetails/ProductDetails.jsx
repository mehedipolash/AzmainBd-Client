import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import {
    FaTruckFast,
    FaShieldHalved,
    FaRotateLeft,
    FaWhatsapp,
    FaCartShopping,
} from 'react-icons/fa6';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';
import SectionTitle from '../../components/SectionTitle';
import Loader from '../../components/Loader';
import OrderButton from '../../components/OrderButton';
import UseCatalogue from '../../Hooks/UseCatalogue';
import { fetchProduct } from '../../api/products.api';
import {
    getRelated,
    isSoldOut,
    isLowStock,
    getDeliveryEstimate,
    LOW_STOCK_THRESHOLD,
} from '../../utils/catalogue';
import { formatCurrency, calcDiscount, hasPrice } from '../../utils/formatCurrency';
import { resolveImageUrl } from '../../utils/imageUrl';
import { productEnquiryLink } from '../../utils/business';
import UseCart from '../../Hooks/UseCart';
import UseToast from '../../Hooks/UseToast';

const ProductDetails = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState('');
    const { addItem } = UseCart();
    const { notify } = UseToast();

    const { products, categoryName, loading: catalogueLoading } = UseCatalogue();

    // Prefer the already-loaded catalogue so navigating from a grid is
    // instant. A direct link or a refresh will not have it, so the product is
    // fetched on its own in that case rather than showing "not found".
    const fromCatalogue = products.find((item) => item._id === id);

    const [fetched, setFetched] = useState(null);
    const [fetchState, setFetchState] = useState({ loading: false, error: '' });

    useEffect(() => {
        if (fromCatalogue || catalogueLoading) return;

        let cancelled = false;
        setFetchState({ loading: true, error: '' });

        fetchProduct(id)
            .then((data) => {
                if (!cancelled) {
                    setFetched(data);
                    setFetchState({ loading: false, error: '' });
                }
            })
            .catch((error) => {
                if (!cancelled) setFetchState({ loading: false, error: error.message });
            });

        return () => {
            cancelled = true;
        };
    }, [id, fromCatalogue, catalogueLoading]);

    const product = fromCatalogue ?? fetched;

    // Quantity and variant reset when the visitor moves to another product,
    // otherwise "3" carries over to an item that only has 1 in stock.
    useEffect(() => {
        setQuantity(1);
        setVariant(product?.variants?.[0] ?? '');
    }, [product?._id, product?.variants]);

    if (catalogueLoading || fetchState.loading) {
        return <Loader fullScreen />;
    }

    if (!product) {
        return (
            <div className="container-px py-20">
                <EmptyState
                    title="Product not found"
                    message={
                        fetchState.error ||
                        'The product you are looking for is no longer available.'
                    }
                    actionLabel="Back to shop"
                    actionPath="/shop"
                />
            </div>
        );
    }

    const soldOut = isSoldOut(product);
    const lowStock = isLowStock(product);
    const priced = hasPrice(product);
    const related = getRelated(product, products, 4);
    const discount = calcDiscount(product.price, product.oldPrice);

    // Never let the customer request more than we hold.
    const maxQuantity = Math.max(1, product.stock);
    const deliveryDate = getDeliveryEstimate(product);

    const handleAddToCart = () => {
        if (soldOut) {
            notify('Message us on WhatsApp and we will tell you when it is back', 'info');
            return;
        }

        addItem(product, quantity);
        notify(`${quantity} × ${product.name} added to cart`);
    };

    return (
        <div>
            {/* Compact brand bar — the product photo carries this page, so the
                header stays a slim breadcrumb strip rather than a full banner. */}
            <div className="bg-primary">
                <div className="container-px py-3.5">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/65">
                            <li>
                                <Link to="/" className="transition-colors hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li>
                                <Link
                                    to={`/shop?category=${product.category}`}
                                    className="transition-colors hover:text-white"
                                >
                                    {categoryName(product.category)}
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li className="text-white">{product.name}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container-px py-10 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* A FIXED-height box, the same for every product, so the
                        card never grows or shrinks with the upload — but the
                        image inside is object-CONTAIN, never cover: the customer
                        must see the WHOLE product, nothing cropped off the top
                        or sides, whatever shape the owner uploaded. A soft
                        tinted ground fills the box around a tall or wide photo
                        so the spare space reads as intentional framing rather
                        than a gap. lg:sticky keeps it in view while the long
                        details column scrolls. */}
                    <div className="relative h-104 overflow-hidden rounded-xl border border-base-300 bg-linear-to-b from-white to-base-200/70 p-4 sm:h-128 sm:p-6 lg:sticky lg:top-24">
                        <img
                            src={resolveImageUrl(product.image)}
                            alt={product.name}
                            className={`h-full w-full object-contain object-center ${
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

                        <div className="mt-6 flex flex-wrap items-baseline gap-3">
                            <span
                                className={
                                    priced
                                        ? 'text-3xl font-medium'
                                        : 'text-xl font-medium text-base-content/60 italic'
                                }
                            >
                                {formatCurrency(product.price)}
                            </span>
                            {priced && product.oldPrice && (
                                <span className="text-lg text-base-content/35 line-through">
                                    {formatCurrency(product.oldPrice)}
                                </span>
                            )}
                        </div>

                        {!priced && (
                            <p className="mt-2 text-[13px] text-base-content/55">
                                Message us on WhatsApp for the current price.
                            </p>
                        )}

                        <p className="mt-6 text-[15px] leading-relaxed text-base-content/65">
                            {product.description}
                        </p>

                        {product.specs?.length > 0 && (
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
                        )}

                        {/* Variants are labels, not separate SKUs — the chosen
                            one travels in the WhatsApp message so the owner
                            knows exactly which version to pack.

                            Shown from ONE variant, not two. Anything the owner
                            types into the admin form has to appear here, and a
                            product with a single "500ml" was saving that label
                            and then never displaying it. With one option there
                            is nothing to choose, so it reads as a stated fact
                            rather than a control. */}
                        {product.variants?.length > 1 ? (
                            <fieldset className="mt-7">
                                <legend className="eyebrow mb-3">Choose an option</legend>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => setVariant(option)}
                                            aria-pressed={variant === option}
                                            className={`border px-4 py-2 text-[12px] transition-colors ${
                                                variant === option
                                                    ? 'border-primary bg-primary text-primary-content'
                                                    : 'border-base-300 text-base-content/70 hover:border-base-content/40'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>
                        ) : (
                            product.variants?.length === 1 && (
                                <div className="mt-7">
                                    <p className="eyebrow mb-3">Option</p>
                                    <span className="inline-block border border-base-300 px-4 py-2 text-[12px] text-base-content/70">
                                        {product.variants[0]}
                                    </span>
                                </div>
                            )
                        )}

                        {/* Availability line — the exact stock count is shown
                            only when it is low enough to matter. */}
                        <div className="mt-7 border-y border-base-300 py-5">
                            {soldOut ? (
                                <p className="text-sm font-medium text-error">
                                    Currently sold out — message us to be told when it returns.
                                </p>
                            ) : (
                                <div className="space-y-2.5">
                                    <p className="flex flex-wrap items-center gap-2 text-sm">
                                        {lowStock ? (
                                            <span className="pill-urgent">
                                                Only {product.stock} left
                                            </span>
                                        ) : (
                                            <span className="pill-stock">In stock</span>
                                        )}
                                        <span className="text-base-content/50">
                                            {lowStock
                                                ? 'Order soon to avoid missing out'
                                                : 'Ships within 24 hours'}
                                        </span>
                                    </p>

                                    {deliveryDate && (
                                        <p className="flex items-center gap-2 text-sm text-base-content/60">
                                            <FaTruckFast className="text-xs" aria-hidden="true" />
                                            Delivered by{' '}
                                            <span className="font-medium text-base-content">
                                                {deliveryDate}
                                            </span>{' '}
                                            in Dhaka, 2–4 days nationwide
                                        </p>
                                    )}
                                </div>
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

                            {/* WhatsApp is the primary action: it is how this
                                shop actually takes orders. */}
                            <OrderButton
                                href={productEnquiryLink(product, { variant, quantity })}
                                signedOutLabel={soldOut ? 'Sign in to ask' : 'Sign in to order'}
                                className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] px-6 py-3.5 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90"
                            >
                                <FaWhatsapp className="text-base" aria-hidden="true" />
                                {soldOut ? 'Ask about restock' : 'Order on WhatsApp'}
                            </OrderButton>

                            {/* The cart stays as a way to gather several items
                                before sending one message, so it is only
                                offered for products that have a price. */}
                            {!soldOut && priced && (
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className="flex items-center justify-center gap-2 border border-base-300 px-5 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:border-base-content/40"
                                >
                                    <FaCartShopping aria-hidden="true" />
                                    <span className="hidden sm:inline">Add to cart</span>
                                </button>
                            )}
                        </div>

                        {lowStock && (
                            <p className="mt-3 text-[12px] text-base-content/45">
                                Maximum {maxQuantity} per order while stock is below{' '}
                                {LOW_STOCK_THRESHOLD} units.
                            </p>
                        )}

                        {/* Owner-defined detail rows. Anything the shop wants to
                            state about a product that does not fit a fixed
                            field lives here. */}
                        {product.customFields?.length > 0 && (
                            <dl className="mt-8 divide-y divide-base-300 border-y border-base-300 text-sm">
                                {product.customFields.map((field) => (
                                    <div
                                        key={`${field.label}-${field.value}`}
                                        className="flex gap-4 py-3"
                                    >
                                        <dt className="w-36 shrink-0 text-base-content/50">
                                            {field.label}
                                        </dt>
                                        <dd className="text-base-content/80">{field.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}

                        <ul className="mt-8 space-y-3 text-sm text-base-content/60">
                            <li className="flex items-center gap-3">
                                <FaTruckFast className="text-sm" aria-hidden="true" />
                                Delivery across Bangladesh — free over ৳ 5,000
                            </li>
                            <li className="flex items-center gap-3">
                                <FaShieldHalved className="text-sm" aria-hidden="true" />
                                Genuine branded product, sourced direct
                            </li>
                            <li className="flex items-center gap-3">
                                <FaRotateLeft className="text-sm" aria-hidden="true" />
                                Damaged or wrong item? We replace it
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <section className="border-t border-base-300 bg-base-200">
                    <div className="container-px section-y">
                        <SectionTitle eyebrow="You may also like" title="Related products" />

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
