/* ---------------------------------------------------------------------------
   Helpers for the "paste a link" image option.

   The trap the shop owner keeps falling into is pasting the PAGE a photo sits
   on instead of the photo itself. ibb.co/whkqJxrx is a web page; the actual
   image is i.ibb.co/…/name.jpg. The page link renders as a broken image with no
   explanation, so these helpers spot the common cases, fix the ones that can be
   fixed by rewriting the URL, and give a plain reason for the rest.

   Nothing here fetches the network — it is pure string work, safe to run on
   every keystroke. Whether the link ACTUALLY loads is proved separately by the
   preview <img> in the uploader.
--------------------------------------------------------------------------- */

// A URL that ends in an image file extension is almost always a direct link.
const IMAGE_EXTENSION = /\.(jpe?g|png|webp|gif|avif|bmp|svg)(\?.*)?$/i;

// Known "share page" hosts, and how to recognise a link that is the page rather
// than the file. Each entry says: does this look like the page (not the image)?
const PAGE_LINK_HINTS = [
    {
        // ibb.co/<id> is the viewer page; i.ibb.co/<path>.<ext> is the image.
        test: (u) => /(^|\.)ibb\.co(\.com)?$/i.test(u.hostname) && !/^i\./i.test(u.hostname),
        advice:
            'This is the ImgBB page link. Open the image on ImgBB, right-click it and choose "Copy image address" — that link starts with i.ibb.co and ends in .jpg.',
    },
    {
        test: (u) => /(^|\.)drive\.google\.com$/i.test(u.hostname),
        advice:
            'Google Drive links open a viewer, not the image. Host the photo on ImgBB or Cloudinary instead and paste the direct image link.',
    },
    {
        test: (u) => /(^|\.)dropbox\.com$/i.test(u.hostname),
        advice:
            'Dropbox share links open a preview page. Use the image on a host that gives a direct link ending in .jpg or .png.',
    },
    {
        test: (u) => /(^|\.)google\.[a-z.]+$/i.test(u.hostname) && u.pathname.includes('/imgres'),
        advice:
            'This is a Google Images result page, not the image. Open the image itself, then copy its direct address.',
    },
];

/**
 * Rewrites the handful of page-links we can safely turn into a direct link.
 * Currently returns the input unchanged for everything — ibb's direct path is
 * not derivable from the page id without a network call — but it is the single
 * place to add safe rewrites later. Kept so callers have one entry point.
 */
export const normalizeImageUrl = (raw = '') => raw.trim();

/**
 * Looks at a pasted link (without loading it) and returns guidance:
 *   { level: 'ok' | 'warn', message: '' | '...'}
 * 'ok' means it looks like a direct image link; 'warn' means it is probably a
 * page link and carries advice on getting the real one. An empty or non-URL
 * string returns 'ok' with no message — the field just looks empty.
 */
export const inspectImageUrl = (raw = '') => {
    const value = raw.trim();
    if (!value) return { level: 'ok', message: '' };

    let url;
    try {
        url = new URL(value);
    } catch {
        return {
            level: 'warn',
            message: 'That does not look like a complete link. Paste the full https:// address of the image.',
        };
    }

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return { level: 'warn', message: 'Use an http:// or https:// image link.' };
    }

    const pageHint = PAGE_LINK_HINTS.find((hint) => {
        try {
            return hint.test(url);
        } catch {
            return false;
        }
    });

    if (pageHint) {
        return { level: 'warn', message: pageHint.advice };
    }

    // Ends in an image extension — the strongest positive signal.
    if (IMAGE_EXTENSION.test(url.pathname)) {
        return { level: 'ok', message: '' };
    }

    // No extension and not a known page host: might still be a direct link
    // (some CDNs omit the extension), so don't block it — let the live preview
    // be the final judge, but nudge the owner to check.
    return {
        level: 'warn',
        message:
            'This might be a page link rather than the image. If the preview below stays blank, copy the image’s direct address (it usually ends in .jpg or .png).',
    };
};
