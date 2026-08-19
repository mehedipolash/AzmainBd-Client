const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

/* ---------------------------------------------------------------------------
   Product photos come from three places, and each resolves differently:

     - /api/images/<id>  uploaded by the shop owner and stored in MongoDB.
                         These live on the API server, so they need its origin
                         prefixed.

     - /products/…       the client's own product photography, shipped as a
                         static asset of the frontend. These are served by the
                         same origin as the page, so they must be left ALONE —
                         prefixing the API origin here points them at a host
                         that has never heard of them, and the browser reports
                         a "successful" empty decode rather than a 404.

     - https://…         an absolute URL, used as-is.

   Relative paths are what gets stored in the database, on purpose: the same
   records then work unchanged against localhost and the deployed domain.
   Turning them into a full URL is a display concern, so it happens here at the
   last moment.
--------------------------------------------------------------------------- */
export const resolveImageUrl = (image) => {
    if (!image) return '';
    if (/^https?:\/\//i.test(image)) return image;

    // Only uploads live on the API. Everything else that starts with "/" is a
    // static asset of this app and is already correctly addressed.
    if (image.startsWith('/api/')) return `${API_BASE}${image}`;

    return image;
};
