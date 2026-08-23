import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaGaugeHigh, FaBoxOpen, FaLayerGroup, FaUsers, FaArrowLeft } from 'react-icons/fa6';
import UseAuth from '../Hooks/UseAuth';
import ScrollToTop from '../components/ScrollToTop';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';

const NAV = [
    { label: 'Dashboard', path: '/admin', icon: FaGaugeHigh, end: true },
    { label: 'Products', path: '/admin/products', icon: FaBoxOpen },
    { label: 'Categories', path: '/admin/categories', icon: FaLayerGroup },
    { label: 'Users', path: '/admin/users', icon: FaUsers },
];

const AdminLayout = () => {
    const { user } = UseAuth();

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
            isActive
                ? 'bg-primary text-primary-content'
                : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
        }`;

    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            <ScrollToTop />

            <aside className="shrink-0 border-b border-base-300 bg-base-100 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-b-0">
                <div className="flex items-center justify-between gap-3 border-b border-base-300 px-5 py-4">
                    <div className="min-w-0">
                        {/* The client's real mark, not a text stand-in — the
                            admin panel is the screen the owner sees most. */}
                        <Logo size="sm" />
                        <p className="mt-1 hidden text-[11px] tracking-[0.16em] text-base-content/45 uppercase lg:block">
                            Admin panel
                        </p>
                    </div>

                    {/* The storefront's toggle is not reachable from the admin
                        routes, so without this the panel is stuck in whatever
                        theme was last set on the shop. The owner works in here
                        daily, often in the evening. */}
                    <ThemeToggle className="shrink-0 rounded-lg border border-base-300 hover:opacity-100 hover:border-primary hover:text-primary" />
                </div>

                <nav className="p-2 lg:py-4">
                    <p className="mb-2 hidden px-4 text-[10px] font-semibold tracking-[0.2em] text-base-content/35 uppercase lg:block">
                        Manage
                    </p>
                    <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5">
                        {NAV.map((item) => {
                            const Icon = item.icon;

                            return (
                                <li key={item.path} className="shrink-0 lg:shrink">
                                    <NavLink to={item.path} end={item.end} className={linkClass}>
                                        <Icon className="text-sm" aria-hidden="true" />
                                        {item.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mt-auto hidden border-t border-base-300 p-4 lg:block">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-base-content/35 uppercase">
                        Signed in as
                    </p>
                    <p className="mt-1 truncate text-[12px] font-medium" title={user?.email}>
                        {user?.email}
                    </p>
                    <span className="mt-2 inline-block bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-secondary-content uppercase">
                        Administrator
                    </span>

                    <Link
                        to="/"
                        className="mt-4 flex items-center justify-center gap-2 border border-base-300 px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:border-primary hover:text-primary"
                    >
                        <FaArrowLeft className="text-[10px]" aria-hidden="true" />
                        Back to store
                    </Link>
                </div>
            </aside>

            <main className="min-w-0 flex-1 bg-base-200/40">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
