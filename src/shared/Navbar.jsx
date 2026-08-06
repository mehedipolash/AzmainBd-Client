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
import UseCart from '../Hooks/UseCart';
import { formatCurrency } from '../utils/formatCurrency';
import { NAV_LINKS, SITE_NAME } from '../utils/constants';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const { count: cartCount, subtotal } = UseCart();

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
        `rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
            isActive
                ? 'bg-primary text-primary-content shadow-sm'
                : 'text-base-content/65 hover:bg-base-100 hover:text-base-content'
        }`;

    return (
        <header className="sticky top-0 z-50">
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

            {/* Floating bar: the nav detaches from the page edge and sits on a
                rounded card, so it reads as a control surface rather than a
                border. */}
            <div className="bg-base-200/70 px-3 py-3 backdrop-blur-lg sm:px-4">
                <nav className="container-px flex h-14 items-center justify-between gap-4 rounded-full border border-base-300 bg-base-100 px-4 shadow-sm sm:px-6 lg:h-16">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="-ml-1 p-2 text-lg lg:hidden"
                        aria-label="Open menu"
                    >
                        <FaBars />
                    </button>

                    <Link
                        to="/"
                        className="font-display text-xl leading-none font-semibold tracking-tight lg:text-2xl"
                    >
                        Azmain <span className="text-primary">BD</span>
                    </Link>

                    {/* Links grouped inside their own pill, one list so adding a
                        nav item never unbalances the header. */}
                    <ul className="hidden flex-1 items-center justify-center lg:flex">
                        <li className="flex items-center gap-1 rounded-full bg-base-200 p-1">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={linkClass}
                                    end={link.path === '/'}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </li>
                    </ul>

                    <div className="flex items-center gap-1 sm:gap-2">
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
                            to="/cart"
                            className="group flex items-center gap-2.5 p-2 transition-opacity hover:opacity-70"
                            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}, subtotal ${formatCurrency(subtotal)}`}
                        >
                            <span className="relative text-base">
                                <FaBagShopping />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-2 flex min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-content">
                                        {cartCount}
                                    </span>
                                )}
                            </span>

                            {/* Running subtotal — the detail that makes a cart
                                feel like a real shop rather than an icon. */}
                            {cartCount > 0 && (
                                <span
                                    className="hidden text-[13px] font-medium text-primary lg:inline"
                                    aria-hidden="true"
                                >
                                    {formatCurrency(subtotal)}
                                </span>
                            )}
                        </Link>

                        {/* Solid pill anchors the right end of the bar. */}
                        <Link
                            to="/login"
                            className="ml-1 hidden items-center gap-2 rounded-full bg-neutral px-5 py-2.5 text-[13px] font-semibold text-neutral-content transition-opacity hover:opacity-85 sm:inline-flex"
                        >
                            <FaUser className="text-xs" />
                            Sign In
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Search drops down from the header rather than living inline. */}
            {searchOpen && (
                <div className="bg-base-200/70 px-3 pb-3 backdrop-blur-lg sm:px-4">
                    <form onSubmit={handleSearch} className="container-px">
                        <div className="flex items-center gap-3 rounded-full border border-base-300 bg-base-100 px-6 py-3.5 shadow-sm">
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
