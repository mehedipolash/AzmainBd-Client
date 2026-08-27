import React, { useCallback, useEffect, useState } from 'react';
import { FaTrash, FaUserShield, FaUser, FaCrown, FaLock } from 'react-icons/fa6';
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
    // Whether THIS viewer may act. Only a super admin (the owner) can add or
    // remove admins; a general admin sees the list read-only. The server is the
    // source of truth — it returns callerRole and refuses any write from a
    // non-super-admin — so this only decides what the panel shows.
    const [canManage, setCanManage] = useState(false);
    // The admin cap, from the server: how many general admins are allowed and
    // how many exist now, so the panel can stop offering "Make admin" once full.
    const [maxAdmins, setMaxAdmins] = useState(0);
    const [adminCount, setAdminCount] = useState(0);

    const load = useCallback(async () => {
        try {
            const data = await fetchUsers();
            setItems(data.users ?? []);
            setCanManage(data.callerRole === 'superadmin');
            setMaxAdmins(data.maxAdmins ?? 0);
            setAdminCount(data.adminCount ?? 0);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const adminsFull = maxAdmins > 0 && adminCount >= maxAdmins;

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

    // Total holders of any admin power, for the banner figure (super + general).
    const totalAdmins = items.filter(
        (u) => u.role === 'admin' || u.role === 'superadmin',
    ).length;

    return (
        <div>
            <AdminBanner
                royal={canManage}
                eyebrow={canManage ? 'Owner access' : 'Access'}
                title="Users"
                subtitle={
                    canManage
                        ? `Everyone who has signed in. To add an admin, ask them to sign up first, then use Make admin on their row — up to ${maxAdmins} admins alongside you. The owner account is protected.`
                        : 'Everyone who has signed in. Only the owner can add or remove admins, so these controls are locked for your account.'
                }
                stats={[
                    { label: 'Users', value: items.length },
                    { label: 'Admins', value: totalAdmins },
                ]}
            />

            <div className="p-5 sm:p-8 lg:p-10">
                {/* A distinct panel that marks WHO is looking. The owner gets a
                    premium "owner controls" plate in gold — this is the one
                    screen where their super-admin power lives, so it should feel
                    special and earned. A general admin gets a plain locked
                    notice instead, so the difference in authority is obvious at
                    a glance rather than only discovered on a disabled button. */}
                {!loading && !error && (
                    canManage ? (
                        // A solid deep-royal plate matching the banner — indigo
                        // plum with a warm gold glow. A pale gold wash washed out
                        // in light mode; this fixed dark ground reads strong and
                        // identical in both themes.
                        <div className="mb-8 overflow-hidden rounded-2xl bg-[#211546] text-white shadow-lg ring-1 ring-brand-gold/40">
                            <div
                                className="flex flex-wrap items-center gap-4 p-5 sm:p-6"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(130% 170% at 100% 0%, rgba(255,205,110,0.24) 0%, rgba(255,205,110,0) 55%), radial-gradient(90% 140% at 0% 100%, rgba(129,90,255,0.28) 0%, rgba(129,90,255,0) 60%)',
                                }}
                            >
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-gold/20 text-brand-gold ring-1 ring-brand-gold/40">
                                    <FaCrown className="text-xl" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="flex flex-wrap items-center gap-2 font-display text-lg font-semibold text-white">
                                        Owner controls
                                        <span className="rounded-full bg-brand-gold/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-brand-gold uppercase ring-1 ring-brand-gold/40">
                                            Super Admin
                                        </span>
                                    </p>
                                    <p className="mt-1 text-[13px] leading-relaxed text-white/70">
                                        You have full control of this store. Only you can grant or
                                        remove admin access — no admin you add can ever change that.
                                    </p>
                                </div>
                                {/* The admin budget at a glance, so it is obvious
                                    how many more can be added before the cap. */}
                                <div className="shrink-0 rounded-xl bg-black/20 px-4 py-3 text-center ring-1 ring-brand-gold/25">
                                    <p className="font-display text-2xl font-semibold text-brand-gold tabular-nums">
                                        {adminCount}<span className="text-white/40">/{maxAdmins}</span>
                                    </p>
                                    <p className="mt-0.5 text-[10px] font-semibold tracking-[0.14em] text-white/50 uppercase">
                                        Admins used
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-base-300 bg-base-200/50 p-5">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-base-300/60 text-base-content/50">
                                <FaLock className="text-sm" />
                            </span>
                            <div>
                                <p className="text-[14px] font-semibold">Read-only for your account</p>
                                <p className="mt-0.5 text-[13px] leading-relaxed text-base-content/55">
                                    You can see who has access, but only the owner can add or remove
                                    admins.
                                </p>
                            </div>
                        </div>
                    )
                )}

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
                                    // The owner is a super admin; other admins are plain admins.
                                    const isSuper =
                                        account.isOwner === true || account.role === 'superadmin';
                                    const isAdmin = account.role === 'admin' || isSuper;
                                    const busy = busyUid === account.uid;
                                    // Protected owner — controls locked here, and the server
                                    // refuses the change too, so this only makes the rule visible.
                                    const isOwner = isSuper;
                                    // Locked when: the viewer is not a super admin (general admins
                                    // see the list read-only), or it is the viewer's own row, or
                                    // the target is the protected owner.
                                    const locked = !canManage || isMe || isOwner;

                                    return (
                                        <tr
                                            key={account.uid}
                                            className={`border-b border-base-300 last:border-0 ${
                                                isSuper
                                                    ? 'bg-brand-gold/10 ring-1 ring-inset ring-brand-gold/25'
                                                    : ''
                                            }`}
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
                                                    {isSuper ? (
                                                        /* The owner — a distinct gold badge, not the
                                                           same plate a general admin gets, so the top
                                                           of the hierarchy reads at a glance. gold-ink
                                                           text so it stays legible on the light table
                                                           surface, unlike the bright banner gold. */
                                                        <span className="inline-flex items-center gap-1.5 bg-brand-gold/20 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-gold-ink uppercase ring-1 ring-brand-gold/50">
                                                            <FaCrown className="text-[10px]" />
                                                            Super Admin
                                                        </span>
                                                    ) : isAdmin ? (
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
                                                </div>
                                            </td>
                                            <td className="admin-td">
                                                {locked ? (
                                                    /* No controls. Reasons, in order: a general
                                                       admin may only look; the owner's own row and
                                                       the protected owner account cannot be changed.
                                                       The server enforces all three — this just
                                                       shows why the buttons are gone. */
                                                    <p className="text-right text-[11px] text-base-content/40">
                                                        {!canManage ? '—' : isMe ? 'This is you' : 'Protected'}
                                                    </p>
                                                ) : (
                                                    <div className="flex items-center justify-end gap-2">
                                                        {/* Block promotion once the admin budget is
                                                            full — the server refuses it too, but a
                                                            disabled button with a reason is kinder
                                                            than a click that errors. Demotion is
                                                            always allowed, so the cap never traps
                                                            the owner. */}
                                                        {!isAdmin && adminsFull ? (
                                                            <span className="text-[11px] text-base-content/40">
                                                                Admin limit reached
                                                            </span>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggleRole(account)}
                                                                disabled={busy}
                                                                className="border border-base-300 px-3 py-1.5 text-[12px] font-medium transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                                                            >
                                                                {isAdmin ? 'Remove admin' : 'Make admin'}
                                                            </button>
                                                        )}
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
