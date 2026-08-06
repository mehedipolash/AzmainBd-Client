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

    return (
        <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Create your account
            </h1>
            <p className="mt-2 text-sm text-base-content/60">
                Join us for exclusive deals and faster checkout.
            </p>

            <form onSubmit={handleRegister} className="mt-8 space-y-4">
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Full name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className="input w-full border-base-300 bg-base-100 focus:border-primary"
                    />
                </div>

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
                        minLength={6}
                        autoComplete="new-password"
                        placeholder="At least 6 characters"
                        className="input w-full border-base-300 bg-base-100 focus:border-primary"
                    />
                </div>

                {error && (
                    <p role="alert" className="text-sm text-error">
                        {error}
                    </p>
                )}

                <button type="submit" className="btn btn-primary w-full rounded-full">
                    Create Account
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
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;
