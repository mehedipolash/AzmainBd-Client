import { useEffect } from 'react';

const SITE_NAME = 'Azmain BD';
const DEFAULT_TITLE = 'Azmain BD — Genuine Beauty & Personal Care';

/* ---------------------------------------------------------------------------
   Sets the browser-tab title per page.

   This is a single-page app, so without this every page kept the one title
   baked into index.html — a product page, the cart and the contact page all
   read "Azmain BD — Genuine Beauty…" in the tab, in history and in a bookmark.
   Passing a page's own title makes each tab, bookmark and shared link name what
   it actually is, which is both clearer for the shopper and better for search.

   Pass a falsy value (while a product is still loading) and the title is left
   untouched until the real one arrives, rather than flashing the site default.
   On unmount the document returns to the default so the next page never inherits
   a stale product name.
--------------------------------------------------------------------------- */
const UsePageTitle = (title) => {
    useEffect(() => {
        if (!title) return undefined;

        document.title = `${title} · ${SITE_NAME}`;

        return () => {
            document.title = DEFAULT_TITLE;
        };
    }, [title]);
};

export default UsePageTitle;
