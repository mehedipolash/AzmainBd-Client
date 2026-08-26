import React, { useCallback, useEffect, useState } from 'react';
import { FaTrash, FaUserShield, FaUser, FaCrown } from 'react-icons/fa6';
import { fetchUsers, updateUserRole, deleteUser } from '../../api/products.api';
import Loader from '../../components/Loader';
import AdminBanner from '../../components/AdminBanner';
import UseToast from '../../Hooks/UseToast';
import UseAuth from '../../Hooks/UseAuth';
import { confirmAction, alertError } from '../../utils/alerts';

const AdminUsers = () => {
    const { notify } = UseToast();
    // The signed-in admin's own uid, so their row cannot demote or delete
    // itself — the server refuses this too, but disabling the buttons makes it
    // obvious rather than a surprise error.
    const { user } = UseAuth();
    const myUid = user?.uid;

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // uid currently being changed, so only that row's buttons show as busy.
    const [busyUid, setBusyUid] = useState(null);

    const load = useCallback(async () => {
        try {
            setItems(await fetchUsers());
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(load, 0);
        return () => clearTimeout(timer);
    }, [load]);

    const handleToggleRole = async (target) => {
        const nextRole = target.role === 'admin' ? 'customer' : 'admin';
        const makingAdmin = nextRole === 'admin';

        const confirmed = await confirmAction({
            title: makingAdmin ? 'Make admin?' : 'Remove admin access?',
            text: makingAdmin
                ? `${target.email} will get full access to this admin panel.`
                : `${target.email} will lose admin access and become a normal customer.`,
            confirmLabel: makingAdmin ? 'Make admin' : 'Remove access',
            danger: !makingAdmin,
        });

        if (!confirmed) return;

        setBusyUid(target.uid);
        try {
            await updateUserRole(target.uid, nextRole);
            notify(makingAdmin ? `${target.email} is now an admin` : `${target.email} is now a customer`);
            load();
        } catch (err) {
            alertError('Could not change role', err.message);
        } finally {
            setBusyUid(null);
        }
    };

    const handleDelete = async (target) => {
        const confirmed = await confirmAction({
            title: 'Delete user?',
            text: `${target.email} will be removed from the site's records. If they sign in again a fresh account is created.`,
            confirmLabel: 'Delete',
            danger: true,
        });

        if (!confirmed) return;

        setBusyUid(target.uid);
        try {
            await deleteUser(target.uid);
            notify(`${target.email} deleted`);
            load();
        } catch (err) {
            alertError('Could not delete', err.message);
        } finally {
            setBusyUid(null);
        }
    };

    const adminCount = items.filter((u) => u.role === 'admin').length;

    return (
        <div>
            <AdminBanner
                eyebrow="Access"
                title="Users"
                subtitle="Everyone who has signed in. To add an admin, ask them to sign up first, then use Make admin on their row. Owner accounts are protected and cannot be changed here."
                stats={[
                    { label: 'Users', value: items.length },
                    { label: 'Admins', value: adminCount },
                ]}
            />

            <div className="p-5 sm:p-8 lg:p-10">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p
                        role="alert"
                        className="border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error"
                    >
                        {error}
                    </p>
                ) : items.length === 0 ? (
                    <p className="border border-dashed border-base-300 px-5 py-10 text-center text-sm text-base-content/50">
                        No users yet.
                    </p>
                ) : (
                    <div className="overflow-x-auto border border-base-300 bg-base-100">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-base-300 bg-base-200/60 text-left">
                                    {['User', 'Role', ''].map((heading) => (
                                        <th key={heading} className="admin-th">
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((account) => {
                                    const isMe = account.uid === myUid;
                                    const isAdmin = account.role === 'admin';
                                    const busy = busyUid === account.uid;
                                    // Protected owner (the proprietor / maintainer, from the
                                    // server's ADMIN_EMAILS). Their controls are locked here —
                                    // and the server refuses the change too, so this only makes
                                    // the rule visible rather than being the rule itself.
                                    const isOwner = account.isOwner === true;
                                    const locked = isMe || isOwner;

                                    return (
                                        <tr
                                            key={account.uid}
                                            className="border-b border-base-300 last:border-0"
                                        >
                                            <td className="admin-td">
                                                <div className="min-w-0">
                                                    <p className="truncate font-medium">
                                                        {account.displayName || account.email}
                                                        {isMe && (
                                                            <span className="ml-2 text-[11px] font-normal text-base-content/45">
                                                                (you)
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="truncate text-[12px] text-base-content/50">
                                                        {account.email}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="admin-td">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {isAdmin ? (
                                                        <span className="inline-flex items-center gap-1.5 bg-secondary px-2.5 py-1 text-[11px] font-semibold tracking-wide text-secondary-content uppercase">
                                                            <FaUserShield className="text-[10px]" />
                                                            Admin
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 text-[12px] text-base-content/60">
                                                            <FaUser className="text-[10px]" />
                                                            Customer
                                                        </span>
                                                    )}
                                                    {/* Marks the proprietor / maintainer — a protected
                                                        account no admin can demote or delete from here. */}
                                                    {isOwner && (
                                                        <span className="inline-flex items-center gap-1.5 border border-warning/60 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-warning uppercase">
                                                            <FaCrown className="text-[10px]" />
                                                            Owner
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="admin-td">
                                                {locked ? (
                                                    /* Own row, or a protected owner — no controls.
                                                       An admin cannot change their own access (it
                                                       could lock the last admin out), and no admin
                                                       can touch an owner. The server enforces both;
                                                       this just shows why the buttons are gone. */
                                                    <p className="text-right text-[11px] text-base-content/40">
                                                        {isMe ? 'This is you' : 'Protected'}
                                                    </p>
                                                ) : (
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleRole(account)}
                                                            disabled={busy}
                                                            className="border border-base-300 px-3 py-1.5 text-[12px] font-medium transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            {isAdmin ? 'Remove admin' : 'Make admin'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(account)}
                                                            disabled={busy}
                                                            className="btn-icon btn-icon-delete disabled:cursor-not-allowed disabled:opacity-40"
                                                            aria-label={`Delete ${account.email}`}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
