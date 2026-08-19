import axios from 'axios';
import { auth } from '../Firebase/firebase.config';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

/* ---------------------------------------------------------------------------
   Axios instance.

   Two interceptors carry all the shared behaviour:

     request  — attaches a fresh Firebase ID token. getIdToken() returns the
                cached token until it is close to expiry and refreshes
                transparently, so calling it per-request is correct rather
                than wasteful.

     response — unwraps `data` and normalises every failure into an ApiError
                with a human-readable message, so callers never have to dig
                through error.response?.data?.error themselves.
--------------------------------------------------------------------------- */

export class ApiError extends Error {
    constructor(message, status, field) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.field = field;
    }
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
});

// Routes that need a token are marked with `withAuth: true` at the call site,
// so public reads never wait on Firebase to resolve.
axiosInstance.interceptors.request.use(async (config) => {
    if (!config.withAuth) return config;

    const current = auth.currentUser;
    if (!current) return config;

    try {
        const token = await current.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    } catch {
        // A failed refresh means the session is gone; let the request proceed
        // and surface the server's 401 rather than failing silently here.
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            return Promise.reject(new ApiError('The server took too long to respond.', 0));
        }

        if (!error.response) {
            return Promise.reject(
                new ApiError('Could not reach the server. Check your connection.', 0),
            );
        }

        const { status, data } = error.response;

        return Promise.reject(
            new ApiError(data?.error ?? `Request failed (${status})`, status, data?.field),
        );
    },
);

export const api = {
    get: (path, params) => axiosInstance.get(path, { params }),
    getAuthed: (path, params) => axiosInstance.get(path, { params, withAuth: true }),
    post: (path, body, { withAuth = true } = {}) => axiosInstance.post(path, body, { withAuth }),
    patch: (path, body) => axiosInstance.patch(path, body, { withAuth: true }),
    delete: (path) => axiosInstance.delete(path, { withAuth: true }),

    // Multipart upload. Content-Type is deleted rather than set: the browser
    // has to generate it itself so it can append the multipart boundary, and
    // the instance default of application/json would otherwise override it.
    upload: (path, formData, { onProgress } = {}) =>
        axiosInstance.post(path, formData, {
            withAuth: true,
            headers: { 'Content-Type': undefined },
            timeout: 60000,
            onUploadProgress: onProgress
                ? (event) =>
                      onProgress(
                          event.total ? Math.round((event.loaded * 100) / event.total) : 0,
                      )
                : undefined,
        }),
};

export default axiosInstance;
