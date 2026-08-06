import React, { useState } from 'react';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        // Firebase email/password sign-in goes here once AuthProvider is wired.
    };

    const handleGoogleLogin = () => {
        // Firebase Google popup sign-in goes here.
    };

    return (
        <div>
            <h1 className="font-display text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm text-base-content/60">
                Sign in to track orders and check out faster.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
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
                        className="w-full border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-base-content/50"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="eyebrow mb-2 block">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="w-full border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-base-content/50"
                    />
                </div>

                {error && (
                    <p role="alert" className="text-sm text-error">
                        {error}
                    </p>
                )}

                <button type="submit" className="btn-shop w-full">
                    Sign in
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
                className="flex w-full items-center justify-center gap-3 border border-base-300 py-3 text-sm font-medium transition-colors hover:border-base-content/40"
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
