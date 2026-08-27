import React from 'react';
import { Link } from 'react-router';
import { FaTrash, FaWhatsapp, FaTruckFast, FaMinus, FaPlus } from 'react-icons/fa6';
import EmptyState from '../../components/EmptyState';
import PageHeader from '../../components/PageHeader';
import OrderButton from '../../components/OrderButton';
import UseCart from '../../Hooks/UseCart';
import UseToast from '../../Hooks/UseToast';
import { formatCurrency } from '../../utils/formatCurrency';
import { FREE_DELIVERY_THRESHOLD } from '../../utils/catalogue';
import { cartEnquiryLink } from '../../utils/business';

const Cart = () => {
    const { items, removeItem, updateQuantity, clearCart, subtotal, count } = UseCart();
    const { notify } = UseToast();

    // The order is placed by sending the basket to WhatsApp. Once that message
    // is on its way the cart has done its job, so it empties — otherwise the
    // same items sit here looking unsent and get ordered twice. The WhatsApp
    // link opens in a new tab, so the shopper stays on the site and lands on a
    // clean, empty cart. A short delay lets the new tab open before the list
    // under it disappears.
    const handleOrderPlaced = () => {
        setTimeout(() => {
            clearCart();
            notify('Order sent on WhatsApp — your cart is now empty', 'success');
        }, 400);
    };

    const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
    const shortfall = FREE_DELIVERY_THRESHOLD - subtotal;
    const deliveryFee = qualifiesForFreeDelivery || count === 0 ? 0 : 120;
    const total = subtotal + deliveryFee;

    const handleRemove = (item) => {
        removeItem(item._id);
        notify(`${item.name} removed from cart`, 'info');
    };

    return (
        <div>
            <PageHeader
                eyebrow="Checkout"
                title="Your cart"
                image="/banners/shop.jpg"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'Cart' }]}
            />

            <div className="container-px section-y">
                {count === 0 ? (
                    <EmptyState
                        title="Your cart is empty"
                        message="Browse the catalogue and add something you like."
                        actionLabel="Start shopping"
                        actionPath="/shop"
                    />
                ) : (
                    <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
                        <div className="lg:col-span-2">
                            {/* Progress toward free delivery — a real nudge, and
                                honest because it disappears once earned. */}
                            {!qualifiesForFreeDelivery && (
                                <div className="mb-8 border border-base-300 bg-base-200 p-4">
                                    <p className="flex items-center gap-2 text-sm">
                                        <FaTruckFast
                                            className="text-xs text-primary"
                                            aria-hidden="true"
                                        />
                                        Add{' '}
                                        <span className="font-semibold text-primary">
                                            {formatCurrency(shortfall)}
                                        </span>{' '}
                                        more for free delivery
                                    </p>
                                    <div className="mt-3 h-1 w-full overflow-hidden bg-base-300">
                                        <div
                                            className="h-full bg-primary transition-[width] duration-500"
                                            style={{
                                                width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <ul className="divide-y divide-base-300 border-y border-base-300">
                                {items.map((item) => (
                                    <li key={item._id} className="flex gap-4 py-5 sm:gap-6">
                                        <Link
                                            to={`/product/${item._id}`}
                                            className="shrink-0 overflow-hidden bg-base-200"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                loading="lazy"
                                                className="size-24 bg-white object-contain sm:size-28"
                                            />
                                        </Link>

                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <Link to={`/product/${item._id}`}>
                                                <h2 className="font-display text-lg font-semibold hover:opacity-70">
                                                    {item.name}
                                                </h2>
                                            </Link>

                                            <p className="mt-1 text-sm text-base-content/55">
                                                {formatCurrency(item.price)} each
                                            </p>

                                            <div className="mt-auto flex flex-wrap items-center gap-4 pt-3">
                                                {/* Real 40px targets on a tinted
                                                    surface. These were two text
                                                    glyphs with horizontal
                                                    padding and no height, so the
                                                    tap area was whatever the
                                                    character happened to be —
                                                    far under what a fingertip
                                                    needs. */}
                                                <div className="flex items-center gap-1 rounded-lg border border-base-300 bg-base-200/60 p-1">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item._id,
                                                                item.quantity - 1,
                                                            )
                                                        }
                                                        disabled={item.quantity <= 1}
                                                        className="flex size-9 items-center justify-center rounded-md bg-base-100 text-primary shadow-sm transition-all hover:bg-primary hover:text-primary-content disabled:bg-transparent disabled:text-base-content/25 disabled:shadow-none"
                                                        aria-label={`Decrease quantity of ${item.name}`}
                                                    >
                                                        <FaMinus className="text-[12px]" />
                                                    </button>

                                                    {/* Tabular figures so the
                                                        stepper does not jitter
                                                        in width going 9 -> 10. */}
                                                    <span
                                                        className="flex w-9 items-center justify-center text-[15px] font-semibold tabular-nums"
                                                        aria-live="polite"
                                                    >
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item._id,
                                                                item.quantity + 1,
                                                            )
                                                        }
                                                        disabled={item.quantity >= item.stock}
                                                        className="flex size-9 items-center justify-center rounded-md bg-base-100 text-primary shadow-sm transition-all hover:bg-primary hover:text-primary-content disabled:bg-transparent disabled:text-base-content/25 disabled:shadow-none"
                                                        aria-label={`Increase quantity of ${item.name}`}
                                                    >
                                                        <FaPlus className="text-[12px]" />
                                                    </button>
                                                </div>

                                                {/* A control, not a caption. A
                                                    10px icon beside grey
                                                    uppercase text reads as a
                                                    label; the tinted surface and
                                                    red say "this deletes
                                                    something" before it is
                                                    clicked. */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemove(item)}
                                                    className="flex h-11 items-center gap-2 rounded-lg border border-error/20 bg-error/8 px-4 text-[12px] font-semibold tracking-wide text-error uppercase transition-all hover:border-error hover:bg-error hover:text-error-content"
                                                >
                                                    <FaTrash className="text-[12px]" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <p className="shrink-0 text-right font-semibold text-primary">
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <aside className="lg:col-span-1">
                            <div className="sticky top-28 border border-base-300 p-6">
                                <h2 className="font-display text-xl font-semibold">
                                    Order summary
                                </h2>

                                <dl className="mt-6 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-base-content/60">
                                            Subtotal ({count} {count === 1 ? 'item' : 'items'})
                                        </dt>
                                        <dd className="font-medium">{formatCurrency(subtotal)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-base-content/60">Delivery</dt>
                                        <dd className="font-medium">
                                            {deliveryFee === 0 ? (
                                                <span className="text-success">Free</span>
                                            ) : (
                                                formatCurrency(deliveryFee)
                                            )}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between border-t border-base-300 pt-3 text-base">
                                        <dt className="font-semibold">Total</dt>
                                        <dd className="font-semibold text-primary">
                                            {formatCurrency(total)}
                                        </dd>
                                    </div>
                                </dl>

                                {/* No online payment: the shop takes orders on
                                    WhatsApp, so the cart hands the whole basket
                                    over as a pre-written message rather than
                                    pretending a checkout exists. */}
                                <OrderButton
                                    href={cartEnquiryLink(items)}
                                    signedOutLabel="Sign in to order"
                                    onOrder={handleOrderPlaced}
                                    className="mt-7 flex w-full items-center justify-center gap-2 bg-[#25D366] py-3.5 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90"
                                >
                                    <FaWhatsapp className="text-base" aria-hidden="true" />
                                    Order on WhatsApp
                                </OrderButton>

                                <p className="mt-4 text-center text-[12px] leading-relaxed text-base-content/50">
                                    Your basket is sent as a message. We confirm
                                    stock, delivery and payment on chat.
                                </p>

                                <Link
                                    to="/shop"
                                    className="mt-5 block text-center text-[12px] tracking-wide text-base-content/50 uppercase hover:text-base-content"
                                >
                                    Continue shopping
                                </Link>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
