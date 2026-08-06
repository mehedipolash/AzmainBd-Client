import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import {
    FaMagnifyingGlass,
    FaBagShopping,
    FaBars,
    FaXmark,
    FaUser,
    FaPhone,
    FaTruckFast,
} from 'react-icons/fa6';
import ThemeToggle from '../components/ThemeToggle';
import { NAV_LINKS, SITE_NAME } from '../utils/constants';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    // Cart count comes from CartContext once that is wired; kept local for now.
    const cartCount = 0;

    const handleSearch = (e) => {
        e.preventDefault();
        const query = term.trim();
        if (!query) return;
        navigate(`/shop?search=${encodeURIComponent(query)}`);
        setSearchOpen(false);
        setMenuOpen(false);
    };

    // NavLink gives us isActive; the underline makes the current page legible
    // without relying on colour alone.
    const linkClass = ({ isActive }) =>
        `relative py-1 text-[15px] font-medium tracking-wide transition-colors hover:text-base-content ${
            isActive
                ? 'text-base-content after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-base-content'
                : 'text-base-content/65'
        }`;

    return (
        <header className="sticky top-0 z-50 bg-base-100">
            {/* Utility strip — shipping promise and hotline, the way real
                storefronts open. */}
            <div className="hidden bg-primary text-primary-content md:block">
                <div className="container-px flex h-9 items-center justify-between text-[11px] tracking-wide">
                    <p className="flex items-center gap-2">
                        <FaTruckFast className="text-xs" aria-hidden="true" />
                        Free delivery on orders over ৳ 5,000
                    </p>
                    <a
                        href="tel:+8801000000000"
                        className="flex items-center gap-2 transition-opacity hover:opacity-75"
                    >
                        <FaPhone className="text-[10px]" aria-hidden="true" />
                        +880 1000-000000
                    </a>
                </div>
            </div>

            <div className="border-b border-base-300">
                <nav className="container-px flex h-16 items-center justify-between gap-4 lg:h-20">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="-ml-2 p-2 text-lg lg:hidden"
                        aria-label="Open menu"
                    >
                        <FaBars />
                    </button>

                    <Link
                        to="/"
                        className="font-display text-2xl leading-none font-semibold tracking-tight lg:text-[28px]"
                    >
                        {SITE_NAME}
                    </Link>

                    {/* One list for every link, so adding a nav item never
                        unbalances the header. */}
                    <ul className="hidden flex-1 items-center justify-center gap-9 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={linkClass}
                                    end={link.path === '/'}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-1 sm:gap-3">
                        <button
                            type="button"
                            onClick={() => setSearchOpen((open) => !open)}
                            className="p-2 text-base transition-opacity hover:opacity-60"
                            aria-label="Search products"
                            aria-expanded={searchOpen}
                        >
                            <FaMagnifyingGlass />
                        </button>

                        <ThemeToggle />

                        <Link
                            to="/login"
                            className="hidden p-2 text-base transition-opacity hover:opacity-60 sm:block"
                            aria-label="Account"
                        >
                            <FaUser />
                        </Link>

                        <Link
                            to="/cart"
                            className="relative p-2 text-base transition-opacity hover:opacity-60"
                            aria-label={`Cart, ${cartCount} items`}
                        >
                            <FaBagShopping />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-content">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Search drops down from the header rather than living inline. */}
            {searchOpen && (
                <div className="border-b border-base-300 bg-base-100">
                    <form onSubmit={handleSearch} className="container-px py-5">
                        <div className="flex items-center gap-3 border-b border-base-content/25 pb-3">
                            <FaMagnifyingGlass
                                className="text-sm text-base-content/40"
                                aria-hidden="true"
                            />
                            <input
                                type="search"
                                autoFocus
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                placeholder="Search for products..."
                                aria-label="Search products"
                                className="w-full bg-transparent text-base outline-none placeholder:text-base-content/35"
                            />
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="text-sm text-base-content/40 hover:text-base-content"
                                aria-label="Close search"
                            >
                                <FaXmark />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Mobile drawer. */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-ink/50"
                        onClick={() => setMenuOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute inset-y-0 left-0 flex w-75 max-w-[85%] flex-col bg-base-100">
                        <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
                            <span className="font-display text-xl font-semibold">{SITE_NAME}</span>
                            <button
                                type="button"
                                onClick={() => setMenuOpen(false)}
                                className="p-1 text-lg"
                                aria-label="Close menu"
                            >
                                <FaXmark />
                            </button>
                        </div>

                        <ul className="flex-1 overflow-y-auto py-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        end={link.path === '/'}
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block border-b border-base-300 px-5 py-4 text-[15px] tracking-wide transition-colors ${
                                                isActive
                                                    ? 'font-semibold text-base-content'
                                                    : 'text-base-content/65'
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-base-300 p-5">
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="btn-shop w-full"
                            >
                                <FaUser className="text-xs" />
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
