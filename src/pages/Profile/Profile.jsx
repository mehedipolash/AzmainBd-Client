import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6';
import PageHeader from '../../components/PageHeader';
import UseAuth from '../../Hooks/UseAuth';
import UseToast from '../../Hooks/UseToast';
import { getAuthErrorMessage } from '../../utils/authErrors';

const Profile = () => {
    const { user, isVerified, updateUserProfile } = UseAuth();
    const { notify } = UseToast();

    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setBusy(true);

        try {
            await updateUserProfile({
                displayName: e.target.displayName.value.trim(),
                photoURL: e.target.photoURL.value.trim(),
            });
            notify('Profile updated');
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
            <PageHeader
                eyebrow="Account"
                title="Your profile"
                image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'Profile' }]}
            />

            <div className="container-px section-y">
                <div className="mx-auto max-w-xl">
                    <div className="mb-8 flex items-center gap-4 border border-base-300 p-5">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt=""
                                referrerPolicy="no-referrer"
                                className="size-14 rounded-full border border-base-300 object-cover"
                            />
                        ) : (
                            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-content">
                                {(user?.displayName || user?.email || '?').charAt(0).toUpperCase()}
                            </span>
                        )}

                        <div className="min-w-0">
                            <p className="truncate font-display text-lg font-semibold">
                                {user?.displayName || 'Your account'}
                            </p>
                            <p className="truncate text-[13px] text-base-content/55">
                                {user?.email}
                            </p>

                            {isVerified ? (
                                <span className="pill-stock mt-2">
                                    <FaCircleCheck className="text-[9px]" aria-hidden="true" />
                                    Verified
                                </span>
                            ) : (
                                <Link to="/verify-email" className="pill-urgent mt-2">
                                    <FaTriangleExclamation
                                        className="text-[9px]"
                                        aria-hidden="true"
                                    />
                                    Verify your email
                                </Link>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="displayName" className="eyebrow mb-2 block">
                                Display name
                            </label>
                            <input
                                id="displayName"
                                name="displayName"
                                type="text"
                                defaultValue={user?.displayName ?? ''}
                                placeholder="Your name"
                                className={fieldClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="photoURL" className="eyebrow mb-2 block">
                                Photo URL
                            </label>
                            <input
                                id="photoURL"
                                name="photoURL"
                                type="url"
                                defaultValue={user?.photoURL ?? ''}
                                placeholder="https://…"
                                className={fieldClass}
                            />
                            <p className="mt-2 text-[12px] text-base-content/45">
                                Direct image uploads arrive with the backend.
                            </p>
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error"
                            >
                                {error}
                            </p>
                        )}

                        <button type="submit" disabled={busy} className="btn-shop w-full">
                            {busy ? 'Saving…' : 'Save changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
