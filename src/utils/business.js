/* ---------------------------------------------------------------------------
   Real business details for Azmain BD Int.

   Every phone number, address and social link on the site reads from here.
   One edit changes the footer, the contact page, the floating WhatsApp button
   and every "order on WhatsApp" link at once — which is what stops a stale
   number surviving in a corner of the site nobody remembers to check.
--------------------------------------------------------------------------- */

// Digits only, international format, no + or spaces — this is the shape
// wa.me requires. The display version is separate on purpose.
export const WHATSAPP_NUMBER = '8801711979966';

export const PHONE_DISPLAY = '+880 1711-979966';
export const PHONE_HREF = 'tel:+8801711979966';

export const EMAIL = 'azminbdweb@gmail.com';
export const EMAIL_HREF = 'mailto:azminbdweb@gmail.com';

export const ADDRESS_LINES = ['42, Jabbar Tower', 'Gulshan-1, Dhaka-1212'];
export const ADDRESS = ADDRESS_LINES.join(', ');

// Opens the shop in Maps rather than showing a dead address string.
export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    '42 Jabbar Tower, Gulshan-1, Dhaka-1212, Bangladesh',
)}`;

// Jabbar Tower, Gulshan-1 circle, Dhaka. Used by the embedded map on the
// contact page, which needs a point rather than a search string.
export const SHOP_COORDS = { lat: 23.7806, lng: 90.4152 };

// Turn-by-turn directions from wherever the visitor is, rather than only
// showing them where the shop sits.
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SHOP_COORDS.lat},${SHOP_COORDS.lng}`;

export const SOCIAL_LINKS = {
    facebook: 'https://www.facebook.com/azmain.con.bd',
    instagram: 'https://www.instagram.com/azmain_com_bd',
};

export const OPENING_HOURS = 'Saturday – Thursday, 10:00 am – 8:00 pm';

/* --------------------------------- WhatsApp -------------------------------- */

/**
 * Builds a wa.me link with the message pre-typed.
 *
 * Orders are placed over WhatsApp rather than a checkout, so the message has
 * to arrive carrying enough context for the shop owner to act on it without a
 * round of "which one?" — product name, variant and quantity where known.
 */
export const buildWhatsAppLink = (message = '') => {
    const base = `https://wa.me/${WHATSAPP_NUMBER}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Enquiry about one product, optionally with a chosen variant and quantity. */
export const productEnquiryLink = (product, { variant = '', quantity = 1 } = {}) => {
    if (!product) return buildWhatsAppLink();

    const lines = [
        `Hello Azmain BD, I would like to order:`,
        ``,
        `Product: ${product.name}`,
    ];

    if (variant) lines.push(`Variant: ${variant}`);
    if (quantity > 1) lines.push(`Quantity: ${quantity}`);

    // A product with no price is exactly the case where the customer needs to
    // ask, so the message says so rather than omitting the line.
    lines.push(
        product.price
            ? `Price: BDT ${product.price.toLocaleString('en-BD')}`
            : `Price: please confirm`,
    );

    return buildWhatsAppLink(lines.join('\n'));
};

/** Enquiry carrying a whole cart. */
export const cartEnquiryLink = (items = []) => {
    if (items.length === 0) return buildWhatsAppLink();

    const lines = ['Hello Azmain BD, I would like to order:', ''];

    items.forEach((item, index) => {
        lines.push(`${index + 1}. ${item.name} × ${item.quantity}`);
    });

    const total = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
    const hasUnpriced = items.some((item) => !item.price);

    lines.push('');
    lines.push(
        hasUnpriced
            ? `Total: BDT ${total.toLocaleString('en-BD')} + items marked "price on request"`
            : `Total: BDT ${total.toLocaleString('en-BD')}`,
    );

    return buildWhatsAppLink(lines.join('\n'));
};
