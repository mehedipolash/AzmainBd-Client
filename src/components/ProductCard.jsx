import React from 'react';
import { Link } from 'react-router';
import { FaWhatsapp, FaCartShopping, FaArrowRight } from 'react-icons/fa6';
import { hasPrice } from '../utils/formatCurrency';
import { getStockBadge, isSoldOut, isLowStock } from '../utils/catalogue';
import { resolveCardImageUrl } from '../utils/imageUrl';
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
    const { _id, name, image } = product;
    const { addItem } = UseCart();
    const { notify } = UseToast();

    const soldOut = isSoldOut(product);
    const lowStock = isLowStock(product);
    const badge = getStockBadge(product);
    // Still needed even though no amount is shown: it decides whether the card
    // offers "Add to Cart" or a WhatsApp enquiry, since an unpriced item has no
    // total for a cart to compute.
    const priced = hasPrice(product);

    const handleAddToCart = () => {
        addItem(product, 1);
        notify(`${name} added to cart`);
    };

    const handleNotifyMe = () => {
        notify('We will email you when this is back in stock', 'info');
    };

    return (
        // A bordered surface rather than a bare image: the client's photography
        // is shot on white, so without a frame the products bleed into the page
        // and the grid loses its rhythm.
        <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)]">
            {/* A faint tinted ground rather than pure white: the packshots are
                themselves shot on white, so a white card behind them made the
                product look like it was floating in a void. */}
            <div className="relative overflow-hidden rounded-t-xl bg-linear-to-b from-white to-base-200/70">
                <Link to={`/product/${_id}`} className="block">
                    <img
                        src={resolveCardImageUrl(image)}
                        alt={name}
                        loading="lazy"
                        // 4:5, and the SAME box on every card. The catalogue
                        // mixes shapes badly — measured from 0.67 (a tall
                        // bottle) to 1.25 (a wide panel) — and in a square box
                        // the tall ones had to shrink to fit, so they read as
                        // small products beside the wide ones.
                        //
                        // A slightly portrait box is the shape that suits the
                        // worst case without starving the best: the tall
                        // bottles now fill it, and object-contain still shows
                        // every product WHOLE, never cropped.
                        //
                        // Padded rather than bled to the edge: these are
                        // packshots, and a product touching the card border
                        // reads as a crop rather than a deliberate frame.
                        className={`aspect-4/5 w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.05] ${
                            soldOut ? 'opacity-45 grayscale' : ''
                        }`}
                    />
                </Link>

                {/* Only one status badge shows at a time — derived from stock,
                    so a sold-out item can never also read "in stock". */}
                {(soldOut || lowStock) && (
                    <span
                        className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase shadow-sm ${TONE_CLASSES[badge.tone]}`}
                    >
                        {badge.label}
                    </span>
                )}

                {/* The discount badge went with the price. "-15%" beside no
                    amount tells a visitor nothing they can act on, and the
                    saving is shown properly on the product page where both
                    prices appear together. */}

                {/* Direct WhatsApp enquiry, appearing on hover and always
                    reachable by keyboard because focus-within keeps it shown.
                    Orders are placed on WhatsApp, so this is a shortcut past
                    the cart rather than a decorative extra. */}
                {!soldOut && (
                    <div className="pointer-events-none absolute top-3 right-3 flex translate-x-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100">
                        <OrderButton
                            href={productEnquiryLink(product)}
                            signedOutLabel=""
                            className="flex size-9 items-center justify-center rounded-full bg-base-100 text-sm shadow-md transition-colors hover:bg-[#25D366] hover:text-white"
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

            {/* flex-1 with the price pushed to the bottom, so a one-line and a
                three-line product name still produce cards whose prices sit on
                the same line across a row. */}
            <div className="flex flex-1 flex-col border-t border-base-300 p-4 sm:p-5">
                {/* Brand, not a star rating: this shop has no review system,
                    and printing an invented score on a real client's site is a
                    claim they cannot stand behind. */}
                {product.brand && (
                    <p className="text-[12px] font-semibold tracking-[0.12em] text-primary uppercase">
                        {product.brand}
                    </p>
                )}

                <Link to={`/product/${_id}`} className="mt-1.5">
                    {/* Clamped to two lines and given an exact two-line
                        height. The clamp stops a nine-word name from making
                        one card taller; the fixed height stops a SHORT name
                        from pulling everything below it up.

                        h-11.5 (46px), not min-h-[2.5em]. An em-based floor is a
                        fraction of the font size, so it resolved to a
                        fractional pixel that rounded differently for one- and
                        two-line names — which is how a row of cards ended up
                        4px shorter than the rest. 46px is exactly two lines of
                        17px at leading-snug. */}
                    <h3 className="font-display line-clamp-2 h-11.5 text-[17px] leading-snug font-semibold transition-colors hover:text-primary">
                        {name}
                    </h3>
                </Link>

                {/* No price on the card, by the client's instruction: the
                    amount lives on the product page, so a visitor who wants it
                    opens the product and sees the full description, size,
                    stock and delivery alongside it rather than a bare number
                    in a grid.

                    A real link, not decoration. It replaced the price row and
                    was left as a <p>, so it looked like a button and did
                    nothing when clicked — the whole point of the row is to be
                    the way through to the price. mt-auto pins it to the bottom
                    so it lines up across a row whatever the name's length. */}
                <Link
                    to={`/product/${_id}`}
                    className="mt-auto flex min-h-8 items-center gap-1.5 pt-3 text-[13px] font-semibold tracking-wide text-primary transition-colors hover:text-primary/75"
                >
                    View details
                    <FaArrowRight
                        className="text-[10px] transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                    />
                </Link>

                {/* Reserved slot, so a card WITH a stock warning and one
                    without still end at the same point.

                    h-4.5 (18px), not min-h-4. The warning renders at 18px but the
                    reservation was 16px, so a card carrying one grew 2px and
                    the grid held three different card heights. A fixed height
                    reserves exactly what the line occupies. */}
                <p className="mt-0.5 h-4.5 overflow-hidden text-[12px] font-medium tracking-wide text-warning">
                    {lowStock ? `Only ${product.stock} left — order soon` : ''}
                </p>
            </div>
        </article>
    );
};

export default ProductCard;
