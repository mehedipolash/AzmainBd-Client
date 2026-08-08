import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaEnvelopeOpenText, FaArrowLeft } from 'react-icons/fa6';
import UseAuth from '../../Hooks/UseAuth';
import { getAuthErrorMessage, isValidEmail } from '../../utils/authErrors';

const ForgotPassword = () => {
    const { resetPassword } = UseAuth();

    const [error, setError] = useState('');
    const [sentTo, setSentTo] = useState('');
    const [busy, setBusy] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const email = e.target.email.value.trim();

        if (!isValidEmail(email)) {
            setError('That does not look like a valid email address.');
            return;
        }

        setBusy(true);
        try {
            await resetPassword(email);
            setSentTo(email);
        } catch (err) {
            // auth/user-not-found is deliberately swallowed: confirming which
            // addresses are registered would let anyone enumerate your customer
            // list from this form. The success screen shows either way.
            if (err.code === 'auth/user-not-found') {
                setSentTo(email);
            } else {
                setError(getAuthErrorMessage(err));
            }
        } finally {
            setBusy(false);
        }
    };

    if (sentTo) {
        return (
            <div>
                <span className="flex size-12 items-center justify-center rounded-full bg-secondary">
                    <FaEnvelopeOpenText className="text-lg text-primary" aria-hidden="true" />
                </span>

                <h1 className="mt-6 font-display text-3xl font-semibold">Check your inbox</h1>

                <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                    If an account exists for{' '}
                    <span className="font-medium text-base-content">{sentTo}</span>, we have sent a
                    link to reset the password. It expires in one hour.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-base-content/55">
                    Nothing arriving? Check the spam folder, or{' '}
                    <button
                        type="button"
                        onClick={() => setSentTo('')}
                        className="font-medium text-primary underline"
                    >
                        try a different address
                    </button>
                    .
                </p>

                <Link to="/login" className="btn-shop-outline mt-8 w-full">
                    Back to sign in
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Link
                to="/login"
                className="mb-6 inline-flex items-center gap-2 text-[12px] tracking-wide text-base-content/50 uppercase transition-colors hover:text-base-content"
            >
                <FaArrowLeft className="text-[10px]" />
                Back to sign in
            </Link>

            <h1 className="font-display text-3xl font-semibold">Reset your password</h1>
            <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                Enter the email you signed up with and we will send a link to set a new password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                <div>
                    <label htmlFor="email" className="eyebrow mb-2 block">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoFocus
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="w-full border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary"
                    />
                </div>

                {error && (
                    <p
                        role="alert"
                        className="border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error"
                    >
                        {error}
                    </p>
                )}

                <button type="submit" disabled={busy} className="btn-shop w-full">
                    {busy ? 'Sending…' : 'Send reset link'}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
