import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { FaXmark, FaWhatsapp } from 'react-icons/fa6';
import { buildWhatsAppLink, PHONE_DISPLAY } from '../utils/business';

const STORAGE_KEY = 'azmainbd-welcome-seen';
const OPEN_DELAY_MS = 1400;

// Shown once per visitor. The flag is written the moment it opens — not on
// close — so refreshing mid-modal does not re-trigger it.
const WelcomeOffer = () => {
    const [open, setOpen] = useState(false);
    const closeRef = useRef(null);
    const previouslyFocused = useRef(null);

    useEffect(() => {
        let seen;
        try {
            seen = window.localStorage.getItem(STORAGE_KEY) === 'true';
        } catch {
            // Private browsing can block reads; treat it as already seen so we
            // never nag someone on every page load.
            seen = true;
        }

        if (seen) return undefined;

        // Brief delay so the page paints first — an instant modal reads as an
        // error, not an offer.
        const timer = setTimeout(() => {
            setOpen(true);
            try {
                window.localStorage.setItem(STORAGE_KEY, 'true');
            } catch {
                // Non-fatal; the modal simply may appear again next visit.
            }
        }, OPEN_DELAY_MS);

        return () => clearTimeout(timer);
    }, []);

    // Move focus into the dialog on open and restore it on close, so keyboard
    // users are not stranded behind the overlay.
    useEffect(() => {
        if (!open) return undefined;

        previouslyFocused.current = document.activeElement;
        closeRef.current?.focus();

        const handleKey = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
            previouslyFocused.current?.focus?.();
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-90 flex items-center justify-center p-4">
            <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => setOpen(false)}
                className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm motion-safe:animate-[fade-in_200ms_ease-out]"
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="welcome-title"
                className="relative grid w-full max-w-3xl overflow-hidden bg-base-100 shadow-2xl motion-safe:animate-[pop-in_260ms_ease-out] sm:grid-cols-2"
            >
                <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center bg-base-100/85 text-base transition-colors hover:bg-base-200"
                    aria-label="Close offer"
                >
                    <FaXmark />
                </button>

                <div className="relative hidden min-h-72 sm:block">
                    <img
                        src="/products/vica-premium-herbal-soap-charcoal-lavender.jpg"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/35" />
                </div>

                <div className="flex flex-col justify-center p-8 text-center sm:p-10 sm:text-left">
                    <span className="mx-auto flex w-fit items-center gap-2 bg-[#25D366]/15 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#128C4A] uppercase sm:mx-0">
                        <FaWhatsapp className="text-[11px]" aria-hidden="true" />
                        How to order
                    </span>

                    <h2
                        id="welcome-title"
                        className="mt-5 font-display text-3xl leading-tight font-semibold sm:text-4xl"
                    >
                        We take orders on WhatsApp
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-base-content/65">
                        Browse the shop, then tap the WhatsApp button on any product. Your basket
                        arrives with us as a message and we confirm stock, delivery and payment on
                        chat — usually within minutes.
                    </p>

                    <p className="mt-4 text-[13px] font-medium text-base-content/75">
                        {PHONE_DISPLAY}
                    </p>

                    <div className="mt-6 grid gap-2">
                        <a
                            href={buildWhatsAppLink('Hello Azmain BD, I would like to order.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90"
                        >
                            <FaWhatsapp className="text-base" aria-hidden="true" />
                            Message us now
                        </a>

                        <Link to="/shop" onClick={() => setOpen(false)} className="btn-shop-outline">
                            Browse the shop
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="mt-4 text-[12px] tracking-wide text-base-content/45 underline underline-offset-2 hover:text-base-content"
                    >
                        No thanks, just browsing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeOffer;
