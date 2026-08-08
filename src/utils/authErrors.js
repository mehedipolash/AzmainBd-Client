// Firebase throws codes like "auth/invalid-credential", which mean nothing to a
// shopper. Translate to plain language that says what to do next.
//
// Note on invalid-credential: modern Firebase deliberately returns the same
// code for a wrong password and an unknown email, so an attacker cannot use the
// login form to discover which addresses are registered. The wording below
// keeps that ambiguity rather than leaking it back.
const MESSAGES = {
    'auth/invalid-credential': 'That email and password combination is not right.',
    'auth/invalid-email': 'That does not look like a valid email address.',
    'auth/user-disabled': 'This account has been disabled. Contact support for help.',
    'auth/user-not-found': 'That email and password combination is not right.',
    'auth/wrong-password': 'That email and password combination is not right.',
    'auth/email-already-in-use': 'An account already exists with this email. Try signing in.',
    'auth/weak-password': 'Choose a password of at least 6 characters.',
    'auth/missing-password': 'Enter your password.',
    'auth/too-many-requests': 'Too many attempts. Wait a few minutes and try again.',
    'auth/network-request-failed': 'Network problem — check your connection and try again.',
    'auth/popup-closed-by-user': 'Sign-in window closed before finishing.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    'auth/popup-blocked': 'Your browser blocked the sign-in window. Allow pop-ups and retry.',
    'auth/account-exists-with-different-credential':
        'This email is already registered using a different sign-in method.',
    'auth/requires-recent-login': 'Please sign in again before making this change.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled for this project.',
};

export const getAuthErrorMessage = (error) => {
    if (!error) return '';

    const code = error.code ?? '';
    if (MESSAGES[code]) return MESSAGES[code];

    // Anything unmapped: prefer a generic line over exposing a raw SDK string.
    return 'Something went wrong. Please try again.';
};

// Basic shape check before hitting the network — catches typos early without
// pretending to fully validate deliverability.
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());

export const PASSWORD_MIN_LENGTH = 6;

// Returns null when valid, otherwise the reason. Mirrored on the server later.
export const getPasswordProblem = (password) => {
    if (!password || password.length < PASSWORD_MIN_LENGTH) {
        return `Use at least ${PASSWORD_MIN_LENGTH} characters.`;
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        return 'Include at least one letter and one number.';
    }
    return null;
};
