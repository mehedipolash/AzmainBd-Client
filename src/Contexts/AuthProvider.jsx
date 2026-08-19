import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { AuthContext } from './AuthContext.jsx';
import { auth, googleProvider } from '../Firebase/firebase.config.js';
import { syncUser } from '../api/products.api.js';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Role is whatever the server says it is. Nothing here can change it, and
    // it is only used to decide what to show — the API re-checks on every write.
    const [role, setRole] = useState(null);

    // Creates the account, sets the display name, then sends the verification
    // email — all before resolving, so callers get a fully-prepared user rather
    // than having to chain three calls themselves.
    const createUser = async (email, password, displayName) => {
        setLoading(true);

        try {
            const credential = await createUserWithEmailAndPassword(auth, email, password);

            if (displayName) {
                await updateProfile(credential.user, { displayName });
            }

            // No verification email is sent: the client asked for signup to be
            // immediate, and nothing on this site is gated behind a verified
            // address. Password *changes* still require proving control of the
            // inbox, which is where that check actually protects something.

            // updateProfile does not re-trigger onAuthStateChanged, so push the
            // fresh user object into state ourselves or the navbar keeps
            // showing an empty name until the next reload.
            setUser({ ...credential.user });

            return credential;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleProvider);
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            return await signOut(auth);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const updateUserProfile = async (profile) => {
        if (!auth.currentUser) {
            return Promise.reject(new Error('You need to be signed in to update your profile.'));
        }

        await updateProfile(auth.currentUser, profile);
        setUser({ ...auth.currentUser });
    };

    // Pulls the latest profile from Firebase. Used after a profile edit so the
    // navbar does not keep showing a stale name or photo.
    const refreshUser = async () => {
        if (!auth.currentUser) return null;

        await auth.currentUser.reload();
        setUser({ ...auth.currentUser });
        return auth.currentUser;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (!currentUser) {
                setRole(null);
                setLoading(false);
                return;
            }

            // Create or refresh the server-side record and read back the role.
            try {
                const account = await syncUser();
                setRole(account?.role ?? 'customer');
            } catch {
                // Server unreachable — treat as the least-privileged role so a
                // network failure can never surface admin UI.
                setRole('customer');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        role,
        // Derived so components never re-check the conditions themselves.
        isLoggedIn: !!user,
        isAdmin: role === 'admin',
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        resetPassword,
        updateUserProfile,
        refreshUser,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
