import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import UseAuth from '../../Hooks/UseAuth';
import UseToast from '../../Hooks/UseToast';
import { getAuthErrorMessage } from '../../utils/authErrors';
import loginAnimation from '../../assets/lottie-files/login.json';

const Login = () => {
    const { signIn, signInWithGoogle } = UseAuth();
    const { notify } = UseToast();
    const navigate = useNavigate();
    const location = useLocation();

    const [formError, setFormError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'onTouched' });

    // Return the visitor to whatever they were trying to reach before the
    // redirect, falling back to the homepage.
    const redirectTo = location.state?.from ?? '/';

    const onSubmit = async ({ email, password }) => {
        setFormError('');

        try {
            const { user } = await signIn(email.trim(), password);
            notify(`Welcome back${user.displayName ? `, ${user.displayName}` : ''}`);
            navigate(redirectTo, { replace: true });
        } catch (error) {
            setFormError(getAuthErrorMessage(error));
        }
    };

    const handleGoogleLogin = async () => {
        setFormError('');

        try {
            const { user } = await signInWithGoogle();
            notify(`Signed in as ${user.displayName ?? user.email}`);
            navigate(redirectTo, { replace: true });
        } catch (error) {
            setFormError(getAuthErrorMessage(error));
        }
    };

    const fieldClass = (invalid) =>
        `w-full border bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary ${
            invalid ? 'border-error' : 'border-base-300'
        }`;

    return (
        <div>
            {/* Lottie sits above the form on narrow screens where the decorative
                side panel is hidden, so the page still has a focal point. */}
            <div className="mx-auto mb-6 max-w-55 lg:hidden">
                <Lottie animationData={loginAnimation} loop aria-hidden="true" />
            </div>

            <h1 className="font-display text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm text-base-content/60">
                Sign in to track orders and check out faster.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
                <div>
                    <label htmlFor="email" className="eyebrow mb-2 block">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className={fieldClass(errors.email)}
                        {...register('email', {
                            required: 'Enter your email address.',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                message: 'That does not look like a valid email address.',
                            },
                        })}
                    />
                    {errors.email && (
                        <p role="alert" className="mt-2 text-[12px] text-error">
                            {errors.email.message}
                        </p>
                    )}
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
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            aria-invalid={Boolean(errors.password)}
                            className={`${fieldClass(errors.password)} pr-12`}
                            {...register('password', { required: 'Enter your password.' })}
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
                    {errors.password && (
                        <p role="alert" className="mt-2 text-[12px] text-error">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {formError && (
                    <p
                        role="alert"
                        className="border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error"
                    >
                        {formError}
                    </p>
                )}

                <button type="submit" disabled={isSubmitting} className="btn-shop w-full">
                    {isSubmitting ? 'Signing in…' : 'Sign in'}
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
                disabled={isSubmitting}
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
