import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
    FaUser,
    FaRightFromBracket,
    FaBagShopping,
    FaTriangleExclamation,
    FaGaugeHigh,
} from 'react-icons/fa6';
import UseAuth from '../Hooks/UseAuth';
import UseToast from '../Hooks/UseToast';

// Initials stand in when there is no photo — a generic silhouette for every
// signed-in user makes the header look unfinished.
const getInitials = (user) => {
    const source = user?.displayName?.trim() || user?.email || '';
    const parts = source.split(/[\s@.]+/).filter(Boolean);

    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

const UserMenu = () => {
    const { user, isVerified, isAdmin, logOut } = UseAuth();
    const { notify } = UseToast();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);
    const containerRef = useRef(null);

    // Close on outside click or Escape, the two ways people expect to dismiss
    // a dropdown.
    useEffect(() => {
        if (!open) return undefined;

        const handlePointer = (event) => {
            if (!containerRef.current?.contains(event.target)) setOpen(false);
        };
        const handleKey = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', handlePointer);
        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('mousedown', handlePointer);
            document.removeEventListener('keydown', handleKey);
        };
    }, [open]);

    const handleLogOut = async () => {
        setOpen(false);
        await logOut();
        notify('Signed out');
        navigate('/', { replace: true });
    };

    const photo = user?.photoURL;
    const showPhoto = photo && !imageFailed;

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="flex items-center gap-2 rounded-full p-0.5 transition-opacity hover:opacity-80"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Account menu"
            >
                <span className="relative">
                    {showPhoto ? (
                        <img
                            src={photo}
                            alt=""
                            onError={() => setImageFailed(true)}
                            referrerPolicy="no-referrer"
                            className="size-9 rounded-full border border-base-300 object-cover"
                        />
                    ) : (
                        <span className="flex size-9 items-center justify-center rounded-full bg-primary text-[12px] font-semibold text-primary-content">
                            {getInitials(user)}
                        </span>
                    )}

                    {/* Quiet dot rather than a banner — a persistent warning in
                        the header would nag on every page. */}
                    {!isVerified && (
                        <span
                            className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-base-100 bg-warning"
                            aria-hidden="true"
                        />
                    )}
                </span>
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-64 border border-base-300 bg-base-100 shadow-lg motion-safe:animate-[dropdown-in_160ms_ease-out]"
                >
                    <div className="border-b border-base-300 px-4 py-3.5">
                        <p className="truncate text-sm font-semibold">
                            {user?.displayName || 'Your account'}
                        </p>
                        <p className="mt-0.5 truncate text-[12px] text-base-content/50">
                            {user?.email}
                        </p>

                        {isVerified ? (
                            <span className="pill-stock mt-2.5">Verified</span>
                        ) : (
                            <Link
                                to="/verify-email"
                                onClick={() => setOpen(false)}
                                className="pill-urgent mt-2.5"
                            >
                                <FaTriangleExclamation className="text-[9px]" aria-hidden="true" />
                                Verify email
                            </Link>
                        )}
                    </div>

                    <ul className="py-1.5">
                        {isAdmin && (
                            <li>
                                <Link
                                    to="/admin"
                                    role="menuitem"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-base-200"
                                >
                                    <FaGaugeHigh className="text-xs" aria-hidden="true" />
                                    Admin panel
                                </Link>
                            </li>
                        )}
                        <li>
                            {/* Points at the cart until order history exists —
                                a menu item that 404s is worse than one that
                                lands somewhere sensible. */}
                            <Link
                                to="/cart"
                                role="menuitem"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-base-200"
                            >
                                <FaBagShopping
                                    className="text-xs text-base-content/45"
                                    aria-hidden="true"
                                />
                                My cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                role="menuitem"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-base-200"
                            >
                                <FaUser
                                    className="text-xs text-base-content/45"
                                    aria-hidden="true"
                                />
                                Profile
                            </Link>
                        </li>
                    </ul>

                    <div className="border-t border-base-300 p-1.5">
                        <button
                            type="button"
                            role="menuitem"
                            onClick={handleLogOut}
                            className="flex w-full items-center gap-3 px-2.5 py-2.5 text-sm text-error transition-colors hover:bg-error/8"
                        >
                            <FaRightFromBracket className="text-xs" aria-hidden="true" />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
