import { auth } from '../Firebase/firebase.config';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

/* ---------------------------------------------------------------------------
   Thin fetch wrapper.

   Every authenticated call attaches a fresh Firebase ID token. Tokens expire
   after an hour, so getIdToken() is called per-request rather than cached —
   the SDK returns the cached token until it is close to expiry and refreshes
   transparently, which is exactly the behaviour we want.
--------------------------------------------------------------------------- */

export class ApiError extends Error {
    constructor(message, status, field) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.field = field;
    }
}

const getAuthHeader = async () => {
    const current = auth.currentUser;
    if (!current) return {};

    try {
        const token = await current.getIdToken();
        return { Authorization: `Bearer ${token}` };
    } catch {
        // A failed refresh means the session is no longer valid; let the call
        // proceed unauthenticated and surface the server's 401.
        return {};
    }
};

const request = async (path, { method = 'GET', body, auth: needsAuth = false } = {}) => {
    const headers = { 'Content-Type': 'application/json' };

    if (needsAuth) {
        Object.assign(headers, await getAuthHeader());
    }

    let response;
    try {
        response = await fetch(`${BASE_URL}${path}`, {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    } catch {
        throw new ApiError('Could not reach the server. Check your connection.', 0);
    }

    if (response.status === 204) return null;

    let payload = null;
    try {
        payload = await response.json();
    } catch {
        // Non-JSON response — fall through to the status check below.
    }

    if (!response.ok) {
        throw new ApiError(
            payload?.error ?? `Request failed (${response.status})`,
            response.status,
            payload?.field,
        );
    }

    return payload;
};

export const api = {
    get: (path) => request(path),
    getAuthed: (path) => request(path, { auth: true }),
    post: (path, body, { auth: needsAuth = true } = {}) =>
        request(path, { method: 'POST', body, auth: needsAuth }),
    patch: (path, body) => request(path, { method: 'PATCH', body, auth: true }),
    delete: (path) => request(path, { method: 'DELETE', auth: true }),
};

export const buildQuery = (params) => {
    const search = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        search.set(key, String(value));
    });

    const query = search.toString();
    return query ? `?${query}` : '';
};
