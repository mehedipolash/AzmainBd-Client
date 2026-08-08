import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEnvelopeCircleCheck, FaCircleCheck } from 'react-icons/fa6';
import UseAuth from '../../Hooks/UseAuth';
import UseToast from '../../Hooks/UseToast';
import { getAuthErrorMessage } from '../../utils/authErrors';

// Firebase caches emailVerified locally, so clicking the link in another tab
// does not update this one. Poll for the change rather than making the visitor
// guess that they need to refresh.
const POLL_MS = 4000;
const RESEND_COOLDOWN_S = 45;

const VerifyEmail = () => {
    const { user, isVerified, resendVerification, refreshUser, logOut } = UseAuth();
    const { notify } = UseToast();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [sending, setSending] = useState(false);
    const announced = useRef(false);

    // Poll until verified, then stop.
    useEffect(() => {
        if (!user || isVerified) return undefined;

        const timer = setInterval(() => {
            refreshUser().catch(() => {
                // Offline or token refresh failed; the next tick retries.
            });
        }, POLL_MS);

        return () => clearInterval(timer);
    }, [user, isVerified, refreshUser]);

    // Announce once, then send them on their way.
    useEffect(() => {
        if (!isVerified || announced.current) return undefined;

        announced.current = true;
        notify('Email verified — you are all set');

        const timer = setTimeout(() => navigate('/', { replace: true }), 1800);
        return () => clearTimeout(timer);
    }, [isVerified, notify, navigate]);

    // Tick the resend cooldown down to zero.
    useEffect(() => {
        if (cooldown <= 0) return undefined;

        const timer = setTimeout(() => setCooldown((current) => current - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleResend = async () => {
        setError('');
        setSending(true);

        try {
            await resendVerification();
            notify('Verification email sent');
            setCooldown(RESEND_COOLDOWN_S);
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setSending(false);
        }
    };

    const handleSignOut = async () => {
        await logOut();
        navigate('/login', { replace: true });
    };

    if (isVerified) {
        return (
            <div className="text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success/12">
                    <FaCircleCheck className="text-2xl text-success" aria-hidden="true" />
                </span>
                <h1 className="mt-6 font-display text-3xl font-semibold">Email verified</h1>
                <p className="mt-3 text-sm text-base-content/60">Taking you to the store…</p>
            </div>
        );
    }

    return (
        <div>
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <FaEnvelopeCircleCheck className="text-lg text-primary" aria-hidden="true" />
            </span>

            <h1 className="mt-6 font-display text-3xl font-semibold">Verify your email</h1>

            <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                We sent a verification link to{' '}
                <span className="font-medium text-base-content">{user?.email}</span>. Open it and
                this page will continue on its own.
            </p>

            <div className="mt-6 flex items-center gap-3 border border-base-300 px-4 py-3">
                <span
                    className="size-2 shrink-0 animate-pulse rounded-full bg-primary"
                    aria-hidden="true"
                />
                <p className="text-[13px] text-base-content/55" aria-live="polite">
                    Waiting for confirmation…
                </p>
            </div>

            {error && (
                <p
                    role="alert"
                    className="mt-5 border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error"
                >
                    {error}
                </p>
            )}

            <button
                type="button"
                onClick={handleResend}
                disabled={sending || cooldown > 0}
                className="btn-shop mt-6 w-full"
            >
                {cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : sending
                      ? 'Sending…'
                      : 'Resend verification email'}
            </button>

            <p className="mt-5 text-[13px] leading-relaxed text-base-content/50">
                Check your spam folder if it has not arrived. You can browse the store meanwhile —
                verification is only required before placing an order.
            </p>

            <div className="mt-7 flex flex-wrap gap-4 border-t border-base-300 pt-6 text-[13px]">
                <Link to="/" className="text-primary hover:underline">
                    Continue browsing
                </Link>
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-base-content/50 hover:text-base-content"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;
