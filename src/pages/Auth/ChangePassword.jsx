import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { FaEye, FaEyeSlash, FaCheck, FaShieldHalved } from 'react-icons/fa6';
import { auth } from '../../Firebase/firebase.config';
import UseAuth from '../../Hooks/UseAuth';
import UseToast from '../../Hooks/UseToast';
import { getAuthErrorMessage, PASSWORD_MIN_LENGTH } from '../../utils/authErrors';

/* ---------------------------------------------------------------------------
   Change password.

   Signing up needs no email verification, but changing a password does need
   proof — otherwise anyone who finds an unlocked laptop can take the account
   permanently by setting a new password.

   The proof here is the current password, checked by Firebase through
   reauthenticateWithCredential. That is the right check for someone already
   signed in; the email link on /forgot-password covers the case where they
   cannot remember it.
--------------------------------------------------------------------------- */

const ChangePassword = () => {
    const { user, isLoggedIn } = UseAuth();
    const { notify } = UseToast();
    const navigate = useNavigate();

    const [formError, setFormError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'onTouched' });

    const nextPassword = watch('nextPassword', '');

    const rules = [
        {
            label: `At least ${PASSWORD_MIN_LENGTH} characters`,
            met: nextPassword.length >= PASSWORD_MIN_LENGTH,
        },
        { label: 'Contains a letter', met: /[A-Za-z]/.test(nextPassword) },
        { label: 'Contains a number', met: /[0-9]/.test(nextPassword) },
    ];

    // Google accounts have no password to change — Firebase would reject the
    // reauthentication, so say why instead of showing a form that cannot work.
    const isPasswordAccount = user?.providerData?.some(
        (provider) => provider.providerId === 'password',
    );

    const onSubmit = async ({ currentPassword, nextPassword: chosen }) => {
        setFormError('');

        const current = auth.currentUser;

        if (!current?.email) {
            setFormError('You need to be signed in to change your password.');
            return;
        }

        try {
            // Re-authenticate first. Firebase requires a recent sign-in for
            // this operation, and it is what proves the person at the keyboard
            // is the account holder.
            const credential = EmailAuthProvider.credential(current.email, currentPassword);
            await reauthenticateWithCredential(current, credential);

            await updatePassword(current, chosen);

            notify('Password updated');
            navigate('/profile', { replace: true });
        } catch (error) {
            // A wrong current password belongs on that field, not in a banner
            // at the bottom of the form.
            if (error?.code === 'auth/wrong-password' || error?.code === 'auth/invalid-credential') {
                setError('currentPassword', {
                    type: 'server',
                    message: 'That is not your current password.',
                });
                return;
            }

            setFormError(getAuthErrorMessage(error));
        }
    };

    const fieldClass = (invalid) =>
        `w-full border bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary ${
            invalid ? 'border-error' : 'border-base-300'
        }`;

    if (!isLoggedIn) {
        return (
            <div>
                <h1 className="font-display text-3xl font-semibold">Change your password</h1>
                <p className="mt-3 text-sm text-base-content/60">
                    Sign in first, then you can set a new password here.
                </p>
                <Link to="/login" className="btn-shop mt-7">
                    Sign in
                </Link>
            </div>
        );
    }

    if (!isPasswordAccount) {
        return (
            <div>
                <h1 className="font-display text-3xl font-semibold">Change your password</h1>
                <p className="mt-3 text-sm leading-relaxed text-base-content/60">
                    You sign in with Google, so there is no password on this account to change.
                    Manage it from your Google account settings instead.
                </p>
                <Link to="/profile" className="btn-shop mt-7">
                    Back to profile
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="font-display text-3xl font-semibold">Change your password</h1>
            <p className="mt-2 text-sm text-base-content/60">
                Confirm your current password, then choose a new one.
            </p>

            <p className="mt-6 flex items-start gap-3 border-l-2 border-primary bg-primary/5 px-4 py-3 text-[13px] leading-relaxed text-base-content/70">
                <FaShieldHalved className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                We ask for your current password so nobody else can take over your account from an
                unattended device.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
                <div>
                    <label htmlFor="currentPassword" className="eyebrow mb-2 block">
                        Current password
                    </label>
                    <input
                        id="currentPassword"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        aria-invalid={Boolean(errors.currentPassword)}
                        className={fieldClass(errors.currentPassword)}
                        {...register('currentPassword', {
                            required: 'Enter your current password.',
                        })}
                    />
                    {errors.currentPassword && (
                        <p role="alert" className="mt-2 text-[12px] text-error">
                            {errors.currentPassword.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="nextPassword" className="eyebrow mb-2 block">
                        New password
                    </label>
                    <div className="relative">
                        <input
                            id="nextPassword"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="Choose a new password"
                            aria-invalid={Boolean(errors.nextPassword)}
                            className={`${fieldClass(errors.nextPassword)} pr-12`}
                            {...register('nextPassword', {
                                required: 'Choose a new password.',
                                minLength: {
                                    value: PASSWORD_MIN_LENGTH,
                                    message: `Use at least ${PASSWORD_MIN_LENGTH} characters.`,
                                },
                                validate: {
                                    strength: (value) =>
                                        (/[A-Za-z]/.test(value) && /[0-9]/.test(value)) ||
                                        'Include at least one letter and one number.',
                                    different: (value, values) =>
                                        value !== values.currentPassword ||
                                        'That is your current password — choose a different one.',
                                },
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
                    {errors.nextPassword && (
                        <p role="alert" className="mt-2 text-[12px] text-error">
                            {errors.nextPassword.message}
                        </p>
                    )}

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
                    {isSubmitting ? 'Updating…' : 'Update password'}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-base-content/60">
                Forgotten your current password?{' '}
                <Link to="/forgot-password" className="font-medium text-base-content underline">
                    Reset it by email
                </Link>
            </p>
        </div>
    );
};

export default ChangePassword;
