const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

/* ---------------------------------------------------------------------------
   Product photos come from two places:

     - uploads, stored in MongoDB (GridFS) and referenced by the relative path
       the upload endpoint returns: /api/images/<id>
     - absolute http(s) URLs, for stock photography

   The relative form is stored in the database on purpose: the same records
   then work unchanged against localhost and the deployed domain. Resolving it
   to a full URL is a display concern, so it happens here at the last moment.
--------------------------------------------------------------------------- */
export const resolveImageUrl = (image) => {
    if (!image) return '';
    if (/^https?:\/\//i.test(image)) return image;
    if (image.startsWith('/')) return `${API_BASE}${image}`;
    return image;
};
