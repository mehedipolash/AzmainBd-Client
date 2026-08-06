import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';
import ThemeToggle from '../components/ThemeToggle';
import { NAV_LINKS, SITE_NAME } from '../utils/constants';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    // Cart count comes from CartContext once that is wired; kept local for now.
    const cartCount = 0;

    const handleSearch = (e) => {
        e.preventDefault();
        const query = term.trim();
        if (!query) return;
        navigate(`/shop?search=${encodeURIComponent(query)}`);
        setMenuOpen(false);
    };

    const linkClass = ({ isActive }) =>
        `relative py-1 text-sm font-medium transition-colors hover:text-primary ${
            isActive
                ? 'text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary'
                : 'text-base-content/70'
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/85 backdrop-blur-lg">
            {/* Thin brand ramp — carries all four palette colors across the top. */}
            <div className="brand-gradient h-1 w-full" />

            <nav className="container-px flex h-16 items-center gap-3 lg:h-18 lg:gap-6">
                <Link to="/" className="flex shrink-0 items-center gap-2">
                    <span className="brand-gradient flex size-9 items-center justify-center rounded-xl text-sm font-black text-white shadow-md shadow-primary/20">
                        A
                    </span>
                    <span className="brand-text-gradient hidden text-lg font-extrabold tracking-tight sm:inline">
                        {SITE_NAME}
                    </span>
                </Link>

                <ul className="hidden flex-1 items-center justify-center gap-7 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.path}>
                            <NavLink to={link.path} className={linkClass} end={link.path === '/'}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleSearch} className="ml-auto hidden md:block lg:ml-0">
                    <label className="input input-sm h-10 w-56 rounded-full border-base-300 bg-base-200 focus-within:border-primary lg:w-64">
                        <FiSearch className="text-base-content/40" aria-hidden="true" />
                        <input
                            type="search"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            placeholder="Search tech..."
                            aria-label="Search products"
                        />
                    </label>
                </form>

                <div className="ml-auto flex items-center gap-1 md:ml-0 sm:gap-2">
                    <ThemeToggle />

                    <Link
                        to="/cart"
                        className="btn btn-ghost btn-circle btn-sm"
                        aria-label={`Cart, ${cartCount} items`}
                    >
                        <div className="indicator">
                            <FiShoppingCart className="text-lg" />
                            {cartCount > 0 && (
                                <span className="indicator-item badge badge-primary badge-xs">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>

                    <Link to="/login" className="btn btn-primary btn-sm hidden rounded-full px-5 sm:inline-flex">
                        <FiUser className="text-base" />
                        Login
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="btn btn-ghost btn-circle btn-sm lg:hidden"
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="border-t border-base-300 bg-base-100 lg:hidden">
                    <div className="container-px space-y-3 py-4">
                        <form onSubmit={handleSearch} className="md:hidden">
                            <label className="input input-sm h-10 w-full rounded-full border-base-300 bg-base-200">
                                <FiSearch className="text-base-content/40" aria-hidden="true" />
                                <input
                                    type="search"
                                    value={term}
                                    onChange={(e) => setTerm(e.target.value)}
                                    placeholder="Search tech..."
                                    aria-label="Search products"
                                />
                            </label>
                        </form>

                        <ul className="space-y-1">
                            {NAV_LINKS.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        end={link.path === '/'}
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                                                isActive
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-base-content/70 hover:bg-base-200'
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="btn btn-primary btn-sm w-full rounded-full sm:hidden"
                        >
                            <FiUser />
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
