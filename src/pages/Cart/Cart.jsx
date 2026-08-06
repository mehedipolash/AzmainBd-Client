import React from 'react';
import { Link } from 'react-router';
import { FaTrash, FaLock, FaTruckFast } from 'react-icons/fa6';
import EmptyState from '../../components/EmptyState';
import UseCart from '../../Hooks/UseCart';
import UseToast from '../../Hooks/UseToast';
import { formatCurrency } from '../../utils/formatCurrency';
import { FREE_DELIVERY_THRESHOLD } from '../../data/products';

const Cart = () => {
    const { items, removeItem, updateQuantity, subtotal, count } = UseCart();
    const { notify } = UseToast();

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
            <div className="border-b border-base-300 bg-base-200">
                <div className="container-px py-12 text-center sm:py-16">
                    <p className="eyebrow mb-3">Checkout</p>
                    <h1 className="font-display text-3xl font-semibold sm:text-4xl">Your cart</h1>
                </div>
            </div>

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
                                                className="size-24 object-cover sm:size-28"
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
                                                <div className="flex items-stretch border border-base-300">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item._id,
                                                                item.quantity - 1,
                                                            )
                                                        }
                                                        disabled={item.quantity <= 1}
                                                        className="px-3 text-base disabled:opacity-30"
                                                        aria-label={`Decrease quantity of ${item.name}`}
                                                    >
                                                        −
                                                    </button>
                                                    <span
                                                        className="flex w-10 items-center justify-center text-sm font-medium"
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
                                                        className="px-3 text-base disabled:opacity-30"
                                                        aria-label={`Increase quantity of ${item.name}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleRemove(item)}
                                                    className="flex items-center gap-2 text-[12px] tracking-wide text-base-content/45 uppercase transition-colors hover:text-error"
                                                >
                                                    <FaTrash className="text-[10px]" />
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

                                <button
                                    type="button"
                                    onClick={() =>
                                        notify('Checkout goes live once payments are connected', 'info')
                                    }
                                    className="btn-shop mt-7 w-full"
                                >
                                    Proceed to checkout
                                </button>

                                <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-base-content/50">
                                    <FaLock className="text-[10px]" aria-hidden="true" />
                                    Secured by SSLCommerz
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
