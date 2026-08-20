import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaGaugeHigh, FaBoxOpen, FaLayerGroup, FaArrowLeft } from 'react-icons/fa6';
import UseAuth from '../Hooks/UseAuth';
import ScrollToTop from '../components/ScrollToTop';
import Logo from '../components/Logo';

const NAV = [
    { label: 'Dashboard', path: '/admin', icon: FaGaugeHigh, end: true },
    { label: 'Products', path: '/admin/products', icon: FaBoxOpen },
    { label: 'Categories', path: '/admin/categories', icon: FaLayerGroup },
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

            <aside className="shrink-0 border-b border-base-300 bg-base-100 lg:w-64 lg:border-r lg:border-b-0">
                <div className="flex items-center justify-between border-b border-base-300 px-5 py-4 lg:block">
                    {/* The client's real mark, not a text stand-in — the admin
                        panel is the screen the owner sees most. */}
                    <Logo variant="wide" size="sm" />
                    <p className="mt-0.5 hidden text-[11px] tracking-[0.16em] text-base-content/45 uppercase lg:block">
                        Admin panel
                    </p>
                </div>

                <nav className="p-2 lg:py-4">
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

                <div className="hidden border-t border-base-300 p-4 lg:block">
                    <p className="truncate text-[12px] text-base-content/50">{user?.email}</p>
                    <Link
                        to="/"
                        className="mt-3 flex items-center gap-2 text-[12px] text-primary hover:underline"
                    >
                        <FaArrowLeft className="text-[10px]" />
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
