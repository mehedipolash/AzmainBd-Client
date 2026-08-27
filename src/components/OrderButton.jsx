import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaWhatsapp, FaLock } from 'react-icons/fa6';
import UseAuth from '../Hooks/UseAuth';

/* ---------------------------------------------------------------------------
   The single way to start an order.

   Ordering requires an account. Every WhatsApp entry point on the site renders
   through this component, so that rule is enforced in one place — adding a new
   "Order" button anywhere cannot accidentally skip it.

   Signed out, the control is a button that routes to /login carrying the page
   it came from, so the visitor lands back where they were and can order in one
   more tap. It is deliberately NOT an anchor: a link would expose an href a
   visitor could open directly, which would defeat the point.

   Note what this is and is not. It is a business rule the client asked for —
   know who is ordering — not a security boundary. WhatsApp itself is open to
   anyone with the number, which is public on the contact page. Nothing
   sensitive sits behind this gate, so a client-side check is the right weight;
   the real controls stay on the server, where writes are checked.
--------------------------------------------------------------------------- */

const OrderButton = ({
    href,
    children,
    className = '',
    signedOutLabel = 'Sign in to order',
    disabled = false,
    onOrder,
}) => {
    const { isLoggedIn, loading } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // While the session is resolving, show the control in its signed-out form
    // rather than flashing an order link that then disappears.
    const ready = !loading;

    if (ready && isLoggedIn) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                // Fired when the order is actually sent (the WhatsApp link
                // opens). The cart uses it to empty itself once the basket has
                // been handed over, so a placed order does not linger as if it
                // were still waiting to be sent. Opens in a new tab, so the
                // shopper stays on the site with a fresh cart.
                onClick={onOrder}
                className={className}
                aria-disabled={disabled || undefined}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            type="button"
            onClick={() =>
                navigate('/login', {
                    // Bring them back to the product they were looking at.
                    state: { from: location.pathname + location.search },
                })
            }
            className={className}
        >
            <FaLock className="text-[11px]" aria-hidden="true" />
            {signedOutLabel}
        </button>
    );
};

export default OrderButton;

/* Convenience wrapper for the common green WhatsApp bar, so the six call sites
   do not each repeat the same class string. */
export const WhatsAppOrderButton = ({ href, label = 'Order on WhatsApp', className = '' }) => (
    <OrderButton
        href={href}
        className={`flex items-center justify-center gap-2 bg-[#25D366] text-xs font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90 ${className}`}
    >
        <FaWhatsapp className="text-base" aria-hidden="true" />
        {label}
    </OrderButton>
);
