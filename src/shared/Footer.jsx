import React from 'react';
import { Link } from 'react-router';
import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
    FaLocationDot,
    FaPhone,
    FaEnvelope,
    FaArrowRight,
} from 'react-icons/fa6';
import { FOOTER_LINKS, SITE_NAME } from '../utils/constants';

const SOCIALS = [
    { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: FaXTwitter, label: 'X', href: 'https://x.com' },
    { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com' },
];

const Footer = () => {
    const year = new Date().getFullYear();

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Wired to the newsletter endpoint once the backend exists.
    };

    return (
        <footer className="relative mt-20 bg-brand-surface text-brand-surface-content">
            {/* Wave crest — the footer rises out of the page rather than
                starting at a hard rule. Sits above the footer and is pulled up
                by its own height so it never adds layout space. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-full -mb-px overflow-hidden leading-0"
            >
                <svg
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    className="block h-16 w-full sm:h-20 lg:h-24"
                >
                    <path
                        d="M0,64 C240,120 480,8 720,32 C960,56 1200,120 1440,72 L1440,120 L0,120 Z"
                        fill="currentColor"
                        className="text-brand-surface"
                    />
                </svg>
            </div>

            <div className="container-px relative pt-14 pb-10 lg:pt-16">
                {/* Closing call to action. */}
                <div className="flex flex-col gap-6 border-b border-white/15 pb-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                    <div>
                        <h2 className="font-display text-2xl leading-tight font-semibold sm:text-3xl lg:text-[34px]">
                            Ready to upgrade your setup?
                        </h2>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                            Authorised stock, official warranty and free delivery over ৳ 5,000 —
                            with support that picks up the phone.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center gap-2 bg-base-100 px-7 py-3 text-xs font-semibold tracking-[0.14em] text-base-content uppercase transition-opacity hover:opacity-90"
                        >
                            Start shopping
                            <FaArrowRight className="text-[11px]" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 border border-white/45 px-7 py-3 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:border-white hover:bg-white/10"
                        >
                            Talk to us
                        </Link>
                    </div>
                </div>

                <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link to="/" className="font-display text-2xl font-semibold">
                            Azmain <span className="text-white/60">BD</span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
                            Authorised retailer of premium electronics and home appliances, serving
                            customers across Bangladesh since 2019.
                        </p>

                        <div className="mt-6 flex gap-2">
                            {SOCIALS.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="flex size-9 items-center justify-center border border-white/25 text-xs transition-colors hover:border-white hover:bg-base-100 hover:text-base-content"
                                    >
                                        <Icon />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {FOOTER_LINKS.map((group) => (
                        <div key={group.title}>
                            <h3 className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                                {group.title}
                            </h3>
                            <ul className="space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.path}
                                            className="text-sm text-white/70 transition-colors hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                            Get in touch
                        </h3>

                        <ul className="space-y-4 text-sm text-white/70">
                            <li className="flex gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center border border-white/20">
                                    <FaEnvelope className="text-[11px]" aria-hidden="true" />
                                </span>
                                <a
                                    href="mailto:support@azmainbd.com"
                                    className="pt-1.5 transition-colors hover:text-white"
                                >
                                    support@azmainbd.com
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center border border-white/20">
                                    <FaPhone className="text-[11px]" aria-hidden="true" />
                                </span>
                                <a
                                    href="tel:+8801000000000"
                                    className="pt-1.5 transition-colors hover:text-white"
                                >
                                    +880 1000-000000
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center border border-white/20">
                                    <FaLocationDot className="text-[11px]" aria-hidden="true" />
                                </span>
                                <span className="pt-1.5">Gulshan Avenue, Dhaka 1212</span>
                            </li>
                        </ul>

                        <form onSubmit={handleSubscribe} className="mt-6 flex items-stretch">
                            <input
                                type="email"
                                required
                                placeholder="Email address"
                                aria-label="Email address"
                                className="w-full border border-white/25 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/45 focus:border-white"
                            />
                            <button
                                type="submit"
                                className="shrink-0 bg-base-100 px-4 text-[11px] font-semibold tracking-[0.12em] text-base-content uppercase transition-opacity hover:opacity-90"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-2 border-t border-white/15 pt-6 sm:flex-row">
                    <p className="text-xs text-white/55">
                        © {year} {SITE_NAME}. All rights reserved.
                    </p>
                    <p className="text-xs text-white/55">Secure payments powered by SSLCommerz</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
