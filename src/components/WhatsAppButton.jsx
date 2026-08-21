import React, { useEffect, useState } from 'react';
import { buildWhatsAppLink, PHONE_DISPLAY } from '../utils/business';
import WhatsAppIcon from './WhatsAppIcon';

/* ---------------------------------------------------------------------------
   Floating WhatsApp button.

   Ordering happens over WhatsApp rather than a checkout, so this is the single
   most important control on the site — it is present on every storefront page
   and never scrolls away.

   This is a general enquiry route, open to everyone — the number is public on
   the contact page, so gating it would achieve nothing. Placing an ORDER does
   require an account; that rule lives on the per-product buttons, which is why
   this one says "Chat with us" rather than "Order".

   Sits above the footer wave and clears the mobile bottom bar. z-40 keeps it
   under modals (z-50) so it can never cover a dialog's close button.
--------------------------------------------------------------------------- */

const WhatsAppButton = () => {
    // The label expands after a moment rather than on load, so it reads as an
    // invitation once the visitor has settled instead of competing with the
    // hero for attention in the first second.
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setExpanded(true), 2500);
        const collapse = setTimeout(() => setExpanded(false), 8000);

        return () => {
            clearTimeout(timer);
            clearTimeout(collapse);
        };
    }, []);

    return (
        <a
            href={buildWhatsAppLink(
                'Hello Azmain BD, I would like to know more about your products.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with us on WhatsApp — ${PHONE_DISPLAY}`}
            className="group fixed right-4 bottom-5 z-40 flex h-14 items-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:shadow-xl sm:right-6 sm:bottom-6"
        >
            {/* The ping is a sibling, not a wrapper — animating the link itself
                would move the click target under the pointer. */}
            <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.5s]"
            />

            {/* A fixed 56px square, so the glyph is centred on the circle
                whatever the label is doing. Previously the anchor used pl-4
                with a collapsing label, which meant the icon sat off to one
                side of an oval — it looked tilted because it was off-centre,
                not because the artwork was crooked. */}
            <span className="relative flex size-14 shrink-0 items-center justify-center">
                <WhatsAppIcon className="size-7" />
            </span>

            {/* Width transition rather than display, so it animates. The label
                is hidden from assistive tech because the link already has an
                accessible name that says the same thing. */}
            <span
                aria-hidden="true"
                className={`relative overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-45 group-hover:pr-6 group-focus-visible:max-w-45 group-focus-visible:pr-6 ${
                    expanded ? 'max-w-45 pr-6' : 'max-w-0 pr-0'
                }`}
            >
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppButton;
