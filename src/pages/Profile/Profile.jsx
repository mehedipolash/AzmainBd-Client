import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaKey } from 'react-icons/fa6';
import PageHeader from '../../components/PageHeader';
import UseAuth from '../../Hooks/UseAuth';
import UseToast from '../../Hooks/UseToast';
import { getAuthErrorMessage } from '../../utils/authErrors';

const Profile = () => {
    const { user, updateUserProfile } = UseAuth();
    const { notify } = UseToast();

    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setBusy(true);

        try {
            // Only the display name is editable. The photo comes from the
            // account they signed up with (Google gives one automatically), so a
            // "photo URL" box was just a way to break their avatar — removed.
            await updateUserProfile({
                displayName: e.target.displayName.value.trim(),
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
                image="/banners/about.jpg"
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

                            <Link
                                to="/change-password"
                                className="mt-3 inline-flex items-center gap-2 text-[12px] tracking-wide text-primary uppercase transition-opacity hover:opacity-70"
                            >
                                <FaKey className="text-[9px]" aria-hidden="true" />
                                Change password
                            </Link>
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
