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
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Welcome back</h1>
            <p className="mt-2 text-sm text-base-content/60">
                Sign in to track orders and check out faster.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="input w-full border-base-300 bg-base-100 focus:border-primary"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="input w-full border-base-300 bg-base-100 focus:border-primary"
                    />
                </div>

                {error && (
                    <p role="alert" className="text-sm text-error">
                        {error}
                    </p>
                )}

                <button type="submit" className="btn btn-primary w-full rounded-full">
                    Sign In
                </button>
            </form>

            <div className="divider text-xs text-base-content/40">OR</div>

            <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn w-full rounded-full border-base-300 bg-base-100 hover:border-primary"
            >
                <FcGoogle className="text-lg" />
                Continue with Google
            </button>

            <p className="mt-8 text-center text-sm text-base-content/60">
                New here?{' '}
                <Link to="/register" className="text-primary hover:underline">
                    Create an account
                </Link>
            </p>
        </div>
    );
};

export default Login;
