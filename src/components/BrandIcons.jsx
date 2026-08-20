import React from 'react';

/* ---------------------------------------------------------------------------
   Social icons in each platform's REAL brand colours.

   The footer previously drew these with react-icons, which renders in
   `currentColor` — so Facebook, Instagram and WhatsApp all took the footer's
   text colour and then flipped when the theme changed. A brand mark that
   changes colour is not that brand's mark: Facebook is #1877F2 everywhere in
   the world, and a visitor recognises it by that blue before they read
   anything.

   These are the official marks with their colours baked in, so they look the
   same in light and dark mode — which is both what the client asked for and
   what the platforms' own brand guidelines require.

   Instagram's is a gradient, not a flat colour, so it needs a real <defs>.
   The gradient id is suffixed per-instance because two copies of the same id
   in one document is invalid and the second one silently loses its fill.
--------------------------------------------------------------------------- */

export const FacebookIcon = ({ className = '', ...rest }) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className={className}
        {...rest}
    >
        {/* The rounded-square "f" mark, in Facebook blue. */}
        <path
            fill="#1877F2"
            d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
        />
        <path
            fill="#FFFFFF"
            d="m16.67 15.56.53-3.49h-3.33V9.81c0-.96.47-1.89 1.96-1.89h1.51V4.96s-1.37-.24-2.68-.24c-2.74 0-4.53 1.67-4.53 4.69v2.66H7.08v3.49h3.05V24a12.1 12.1 0 0 0 3.74 0v-8.44h2.8Z"
        />
    </svg>
);

export const InstagramIcon = ({ className = '', ...rest }) => {
    // useId, not a module-level counter: the counter mutates during render,
    // which is impure and breaks under concurrent rendering. Unique ids matter
    // here because duplicate ids in one document are invalid and the second
    // element silently renders with no fill.
    const id = `ig-grad-${React.useId()}`;

    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            className={className}
            {...rest}
        >
            <defs>
                {/* Instagram's mark is a corner-to-corner gradient, not a flat
                    colour — flattening it to one purple is the most common way
                    this icon gets drawn wrong. */}
                <radialGradient id={id} cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#FDF497" />
                    <stop offset="5%" stopColor="#FDF497" />
                    <stop offset="45%" stopColor="#FD5949" />
                    <stop offset="60%" stopColor="#D6249F" />
                    <stop offset="90%" stopColor="#285AEB" />
                </radialGradient>
            </defs>
            <path
                fill={`url(#${id})`}
                d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"
            />
        </svg>
    );
};

export const WhatsAppBrandIcon = ({ className = '', ...rest }) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className={className}
        {...rest}
    >
        {/* WhatsApp green, fixed — the same mark the app itself uses. */}
        <path
            fill="#25D366"
            d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.44 9.88-9.9 9.88Zm8.41-18.29A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.87 11.87 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.4Z"
        />
    </svg>
);
