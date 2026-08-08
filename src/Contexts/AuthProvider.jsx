import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { AuthContext } from './AuthContext.jsx';
import { auth, googleProvider } from '../Firebase/firebase.config.js';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

            await sendEmailVerification(credential.user);

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

    // Re-sends the verification email to whoever is currently signed in.
    const resendVerification = () => {
        if (!auth.currentUser) {
            return Promise.reject(new Error('You need to be signed in to resend that email.'));
        }
        return sendEmailVerification(auth.currentUser);
    };

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const updateUserProfile = async (profile) => {
        if (!auth.currentUser) {
            return Promise.reject(new Error('You need to be signed in to update your profile.'));
        }

        await updateProfile(auth.currentUser, profile);
        setUser({ ...auth.currentUser });
    };

    // Firebase caches emailVerified on the local user object. After someone
    // clicks the link in their inbox, the app still reads the stale value until
    // the token is refreshed — so reload on demand.
    const refreshUser = async () => {
        if (!auth.currentUser) return null;

        await auth.currentUser.reload();
        setUser({ ...auth.currentUser });
        return auth.currentUser;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        // Derived so components never re-check the two conditions themselves.
        isLoggedIn: !!user,
        isVerified: !!user?.emailVerified,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        resendVerification,
        resetPassword,
        updateUserProfile,
        refreshUser,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
