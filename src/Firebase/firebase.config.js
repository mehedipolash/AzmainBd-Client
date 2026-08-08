import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';



const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Fail loudly at startup rather than letting Firebase throw an opaque error on
// the first sign-in attempt. A missing .env.local is the most common setup
// mistake for a new developer cloning this repo.
const missingKeys = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

if (missingKeys.length > 0) {
    throw new Error(
        `Firebase config is incomplete — missing: ${missingKeys.join(', ')}.\n` +
            'Copy .env.example to .env.local and fill in the values from your ' +
            'Firebase console (Project settings > General > Your apps), then ' +
            'restart the dev server so Vite picks them up.',
    );
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Single shared provider instance — creating a new one per sign-in call drops
// any custom scopes or parameters set on it.
export const googleProvider = new GoogleAuthProvider();

export default app;
