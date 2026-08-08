import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import UseAuth from '../../Hooks/UseAuth';
import UseToast from '../../Hooks/UseToast';
import { getAuthErrorMessage, isValidEmail } from '../../utils/authErrors';

const Login = () => {
    const { signIn, signInWithGoogle } = UseAuth();
    const { notify } = UseToast();
    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Return the visitor to whatever they were trying to reach before the
    // redirect, falling back to the homepage.
    const redirectTo = location.state?.from ?? '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        if (!isValidEmail(email)) {
            setError('That does not look like a valid email address.');
            return;
        }

        setBusy(true);
        try {
            const { user } = await signIn(email, password);
            notify(`Welcome back${user.displayName ? `, ${user.displayName}` : ''}`);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setBusy(true);
        try {
            const { user } = await signInWithGoogle();
            notify(`Signed in as ${user.displayName ?? user.email}`);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    const fieldClass =
        'w-full border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary';

    return (
        <div>
            <h1 className="font-display text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm text-base-content/60">
                Sign in to track orders and check out faster.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5" noValidate>
                <div>
                    <label htmlFor="email" className="eyebrow mb-2 block">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={fieldClass}
                    />
                </div>

                <div>
                    <div className="mb-2 flex items-baseline justify-between">
                        <label htmlFor="password" className="eyebrow">
                            Password
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-[12px] text-primary hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            autoComplete="current-password"
                            placeholder="••••••••"
                            className={`${fieldClass} pr-12`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((shown) => !shown)}
                            className="absolute inset-y-0 right-0 px-4 text-sm text-base-content/45 hover:text-base-content"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {error && (
                    <p role="alert" className="border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error">
                        {error}
                    </p>
                )}

                <button type="submit" disabled={busy} className="btn-shop w-full">
                    {busy ? 'Signing in…' : 'Sign in'}
                </button>
            </form>

            <div className="my-7 flex items-center gap-4">
                <span className="h-px flex-1 bg-base-300" />
                <span className="text-[11px] tracking-[0.14em] text-base-content/40 uppercase">
                    or
                </span>
                <span className="h-px flex-1 bg-base-300" />
            </div>

            <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={busy}
                className="flex w-full items-center justify-center gap-3 border border-base-300 py-3 text-sm font-medium transition-colors hover:border-base-content/40 disabled:opacity-60"
            >
                <FcGoogle className="text-lg" />
                Continue with Google
            </button>

            <p className="mt-8 text-center text-sm text-base-content/60">
                New here?{' '}
                <Link to="/register" className="font-medium text-base-content underline">
                    Create an account
                </Link>
            </p>
        </div>
    );
};

export default Login;
