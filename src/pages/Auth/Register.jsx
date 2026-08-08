import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa6';
import UseAuth from '../../Hooks/UseAuth';
import UseToast from '../../Hooks/UseToast';
import {
    getAuthErrorMessage,
    getPasswordProblem,
    isValidEmail,
    PASSWORD_MIN_LENGTH,
} from '../../utils/authErrors';

const Register = () => {
    const { createUser, signInWithGoogle } = UseAuth();
    const { notify } = UseToast();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    // Live requirement checklist — telling someone their password is invalid
    // only after they submit is a poor way to run a signup form.
    const rules = [
        { label: `At least ${PASSWORD_MIN_LENGTH} characters`, met: password.length >= PASSWORD_MIN_LENGTH },
        { label: 'Contains a letter', met: /[A-Za-z]/.test(password) },
        { label: 'Contains a number', met: /[0-9]/.test(password) },
    ];

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();

        if (!name) {
            setError('Please enter your name.');
            return;
        }

        if (!isValidEmail(email)) {
            setError('That does not look like a valid email address.');
            return;
        }

        const passwordProblem = getPasswordProblem(password);
        if (passwordProblem) {
            setError(passwordProblem);
            return;
        }

        setBusy(true);
        try {
            await createUser(email, password, name);
            notify('Account created — check your inbox to verify your email');
            navigate('/verify-email', { replace: true });
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
            navigate('/', { replace: true });
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
            <h1 className="font-display text-3xl font-semibold">Create your account</h1>
            <p className="mt-2 text-sm text-base-content/60">
                Join for exclusive deals and faster checkout.
            </p>

            <form onSubmit={handleRegister} className="mt-8 space-y-5" noValidate>
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
                    <p className="mt-2 text-[12px] text-base-content/45">
                        We send a verification link here before your first order.
                    </p>
                </div>

                <div>
                    <label htmlFor="password" className="eyebrow mb-2 block">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            placeholder="Choose a password"
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

                {error && (
                    <p role="alert" className="border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error">
                        {error}
                    </p>
                )}

                <button type="submit" disabled={busy} className="btn-shop w-full">
                    {busy ? 'Creating account…' : 'Create account'}
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
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-base-content underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;
