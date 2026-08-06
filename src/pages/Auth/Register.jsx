import React, { useState } from 'react';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        // Firebase account creation goes here once AuthProvider is wired.
    };

    const handleGoogleLogin = () => {
        // Firebase Google popup sign-in goes here.
    };

    const fieldClass =
        'w-full border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-base-content/50';

    return (
        <div>
            <h1 className="font-display text-3xl font-semibold">Create your account</h1>
            <p className="mt-2 text-sm text-base-content/60">
                Join for exclusive deals and faster checkout.
            </p>

            <form onSubmit={handleRegister} className="mt-8 space-y-5">
                <div>
                    <label htmlFor="name" className="eyebrow mb-2 block">
                        Full name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className={fieldClass}
                    />
                </div>

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
                    <label htmlFor="password" className="eyebrow mb-2 block">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        autoComplete="new-password"
                        placeholder="At least 6 characters"
                        className={fieldClass}
                    />
                </div>

                {error && (
                    <p role="alert" className="text-sm text-error">
                        {error}
                    </p>
                )}

                <button type="submit" className="btn-shop w-full">
                    Create account
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
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-base-content underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;
