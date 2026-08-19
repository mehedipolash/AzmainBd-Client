import React from 'react';
import { Link } from 'react-router';
import { FaWhatsapp, FaCartShopping } from 'react-icons/fa6';
import { formatCurrency, calcDiscount, hasPrice } from '../utils/formatCurrency';
import { getStockBadge, isSoldOut, isLowStock } from '../utils/catalogue';
import { resolveImageUrl } from '../utils/imageUrl';
import { productEnquiryLink } from '../utils/business';
import OrderButton from './OrderButton';
import UseCart from '../Hooks/UseCart';
import UseToast from '../Hooks/UseToast';

const TONE_CLASSES = {
    sold: 'bg-base-content/75 text-base-100',
    // Amber signals scarcity — the only place colour means urgency.
    low: 'bg-warning text-warning-content',
    ok: 'bg-base-100 text-base-content',
};

// One card shape for every grid on the site. Availability drives what the card
// shows: sold-out items dim their image, lose the cart button and surface a
// "notify me" affordance instead.
const ProductCard = ({ product }) => {
    const { _id, name, image, price, oldPrice } = product;
    const { addItem } = UseCart();
    const { notify } = UseToast();

    const soldOut = isSoldOut(product);
    const lowStock = isLowStock(product);
    const badge = getStockBadge(product);
    const discount = calcDiscount(price, oldPrice);
    const priced = hasPrice(product);

    const handleAddToCart = () => {
        addItem(product, 1);
        notify(`${name} added to cart`);
    };

    const handleNotifyMe = () => {
        notify('We will email you when this is back in stock', 'info');
    };

    return (
        <article className="group">
            <div className="relative overflow-hidden bg-base-200">
                <Link to={`/product/${_id}`} className="block">
                    <img
                        src={resolveImageUrl(image)}
                        alt={name}
                        loading="lazy"
                        className={`aspect-4/5 w-full bg-white object-contain transition-transform duration-700 group-hover:scale-105 ${
                            soldOut ? 'opacity-45 grayscale' : ''
                        }`}
                    />
                </Link>

                {/* Only one status badge shows at a time — derived from stock,
                    so a sold-out item can never also read "in stock". */}
                {(soldOut || lowStock) && (
                    <span
                        className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase ${TONE_CLASSES[badge.tone]}`}
                    >
                        {badge.label}
                    </span>
                )}

                {discount > 0 && !soldOut && (
                    <span className="absolute top-3 right-3 bg-primary px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-primary-content uppercase">
                        -{discount}%
                    </span>
                )}

                {/* Direct WhatsApp enquiry, appearing on hover and always
                    reachable by keyboard because focus-within keeps it shown.
                    Orders are placed on WhatsApp, so this is a shortcut past
                    the cart rather than a decorative extra. */}
                {!soldOut && (
                    <div className="pointer-events-none absolute top-3 right-3 flex translate-x-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100">
                        {discount > 0 && <span className="h-6" aria-hidden="true" />}
                        <OrderButton
                            href={productEnquiryLink(product)}
                            signedOutLabel=""
                            className="flex size-9 items-center justify-center bg-base-100 text-sm shadow-sm transition-colors hover:bg-[#25D366] hover:text-white"
                        >
                            <FaWhatsapp />
                        </OrderButton>
                    </div>
                )}

                {/* Add-to-cart slides up over the image on hover. */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
                    {soldOut ? (
                        <button
                            type="button"
                            onClick={handleNotifyMe}
                            className="w-full bg-base-content/85 py-3 text-[11px] font-semibold tracking-[0.14em] text-base-100 uppercase"
                        >
                            Notify Me
                        </button>
                    ) : priced ? (
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="flex w-full items-center justify-center gap-2 bg-primary py-3 text-[11px] font-semibold tracking-[0.14em] text-primary-content uppercase transition-opacity hover:opacity-90"
                        >
                            <FaCartShopping className="text-[12px]" aria-hidden="true" />
                            Add to Cart
                        </button>
                    ) : (
                        /* No price means no cart total to compute, so the only
                           honest action is to ask. */
                        <OrderButton
                            href={productEnquiryLink(product)}
                            signedOutLabel="Sign in to ask"
                            className="flex w-full items-center justify-center gap-2 bg-[#25D366] py-3 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90"
                        >
                            <FaWhatsapp className="text-[13px]" aria-hidden="true" />
                            Ask Price
                        </OrderButton>
                    )}
                </div>
            </div>

            <div className="pt-4 text-center">
                <Link to={`/product/${_id}`}>
                    <h3 className="font-display text-[17px] leading-snug font-semibold transition-opacity hover:opacity-60">
                        {name}
                    </h3>
                </Link>

                {/* Brand, not a star rating: this shop has no review system,
                    and printing an invented score on a real client's site is a
                    claim they cannot stand behind. */}
                {product.brand && (
                    <p className="mt-1.5 text-[11px] tracking-[0.1em] text-base-content/45 uppercase">
                        {product.brand}
                    </p>
                )}

                <div className="mt-2 flex items-baseline justify-center gap-2">
                    <span
                        className={
                            priced
                                ? 'text-[16px] font-semibold text-primary'
                                : 'text-[13px] font-medium text-base-content/55 italic'
                        }
                    >
                        {formatCurrency(price)}
                    </span>
                    {priced && oldPrice && (
                        <span className="text-[13px] text-base-content/35 line-through">
                            {formatCurrency(oldPrice)}
                        </span>
                    )}
                </div>

                {lowStock && (
                    <p className="mt-2 text-[11px] font-medium tracking-wide text-warning">
                        Only {product.stock} left — order soon
                    </p>
                )}
            </div>
        </article>
    );
};

export default ProductCard;
