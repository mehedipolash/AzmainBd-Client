import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import LottieBox from '../../components/LottieBox';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa6';
import UseAuth from '../../Hooks/UseAuth';
import UseToast from '../../Hooks/UseToast';
import { getAuthErrorMessage, PASSWORD_MIN_LENGTH } from '../../utils/authErrors';
import registerAnimation from '../../assets/lottie-files/register.json';

const Register = () => {
    const { createUser, signInWithGoogle } = UseAuth();
    const { notify } = UseToast();
    const navigate = useNavigate();

    const [formError, setFormError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'onTouched' });

    // watch() drives the live checklist — telling someone their password is
    // invalid only after they submit is a poor way to run a signup form.
    const password = watch('password', '');

    const rules = [
        { label: `At least ${PASSWORD_MIN_LENGTH} characters`, met: password.length >= PASSWORD_MIN_LENGTH },
        { label: 'Contains a letter', met: /[A-Za-z]/.test(password) },
        { label: 'Contains a number', met: /[0-9]/.test(password) },
    ];

    const onSubmit = async ({ name, email, password: chosen }) => {
        setFormError('');

        try {
            await createUser(email.trim(), chosen, name.trim());
            notify('Account created — check your inbox to verify your email');
            navigate('/verify-email', { replace: true });
        } catch (error) {
            setFormError(getAuthErrorMessage(error));
        }
    };

    const handleGoogleLogin = async () => {
        setFormError('');

        try {
            const { user } = await signInWithGoogle();
            notify(`Signed in as ${user.displayName ?? user.email}`);
            navigate('/', { replace: true });
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
            <LottieBox animationData={registerAnimation} className="mx-auto mb-6 max-w-55 lg:hidden" />

            <h1 className="font-display text-3xl font-semibold">Create your account</h1>
            <p className="mt-2 text-sm text-base-content/60">
                Join for exclusive deals and faster checkout.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
                <div>
                    <label htmlFor="name" className="eyebrow mb-2 block">
                        Full name
                    </label>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.name)}
                        className={fieldClass(errors.name)}
                        {...register('name', {
                            required: 'Please enter your name.',
                            minLength: { value: 2, message: 'That name looks too short.' },
                        })}
                    />
                    {errors.name && (
                        <p role="alert" className="mt-2 text-[12px] text-error">
                            {errors.name.message}
                        </p>
                    )}
                </div>

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
                    {errors.email ? (
                        <p role="alert" className="mt-2 text-[12px] text-error">
                            {errors.email.message}
                        </p>
                    ) : (
                        <p className="mt-2 text-[12px] text-base-content/45">
                            We send a verification link here before your first order.
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="eyebrow mb-2 block">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="Choose a password"
                            aria-invalid={Boolean(errors.password)}
                            className={`${fieldClass(errors.password)} pr-12`}
                            {...register('password', {
                                required: 'Choose a password.',
                                minLength: {
                                    value: PASSWORD_MIN_LENGTH,
                                    message: `Use at least ${PASSWORD_MIN_LENGTH} characters.`,
                                },
                                validate: (value) =>
                                    (/[A-Za-z]/.test(value) && /[0-9]/.test(value)) ||
                                    'Include at least one letter and one number.',
                            })}
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

                    <ul className="mt-3 space-y-1.5">
                        {rules.map((rule) => (
                            <li
                                key={rule.label}
                                className={`flex items-center gap-2 text-[12px] transition-colors ${
                                    rule.met ? 'text-success' : 'text-base-content/45'
                                }`}
                            >
                                <FaCheck
                                    className={`text-[9px] ${rule.met ? '' : 'opacity-30'}`}
                                    aria-hidden="true"
                                />
                                {rule.label}
                            </li>
                        ))}
                    </ul>
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
                    {isSubmitting ? 'Creating account…' : 'Create account'}
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
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-base-content underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;
