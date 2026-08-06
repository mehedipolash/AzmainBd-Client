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
        <footer className="border-t border-base-300 bg-base-100">
            {/* Newsletter band sits above the link columns. */}
            <div className="bg-base-200">
                <div className="container-px flex flex-col items-center gap-6 py-12 text-center lg:flex-row lg:justify-between lg:gap-10 lg:text-left">
                    <div>
                        <h2 className="font-display text-2xl font-semibold">Stay in the loop</h2>
                        <p className="mt-2 text-sm text-base-content/60">
                            Launches, price drops and exclusive EMI offers — no spam.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubscribe}
                        className="flex w-full max-w-md items-stretch gap-0"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Your email address"
                            aria-label="Email address"
                            className="w-full border border-r-0 border-base-content/20 bg-base-100 px-4 py-3 text-sm outline-none placeholder:text-base-content/35 focus:border-base-content/50"
                        />
                        <button
                            type="submit"
                            className="shrink-0 border border-primary bg-primary px-6 text-[11px] font-semibold tracking-[0.14em] text-primary-content uppercase transition-opacity hover:opacity-85"
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>

            <div className="container-px grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
                <div>
                    <Link to="/" className="font-display text-2xl font-semibold">
                        {SITE_NAME}
                    </Link>

                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-base-content/60">
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
                                    className="flex size-9 items-center justify-center border border-base-300 text-xs transition-colors hover:border-primary hover:bg-primary hover:text-primary-content"
                                >
                                    <Icon />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {FOOTER_LINKS.map((group) => (
                    <div key={group.title}>
                        <h3 className="eyebrow mb-5">{group.title}</h3>
                        <ul className="space-y-3">
                            {group.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-base-content/60 transition-colors hover:text-base-content"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div>
                    <h3 className="eyebrow mb-5">Get in touch</h3>
                    <ul className="space-y-3 text-sm text-base-content/60">
                        <li className="flex items-start gap-3">
                            <FaLocationDot className="mt-1 shrink-0 text-xs" aria-hidden="true" />
                            Gulshan Avenue, Dhaka 1212
                        </li>
                        <li className="flex items-start gap-3">
                            <FaPhone className="mt-1 shrink-0 text-xs" aria-hidden="true" />
                            <a href="tel:+8801000000000" className="hover:text-base-content">
                                +880 1000-000000
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaEnvelope className="mt-1 shrink-0 text-xs" aria-hidden="true" />
                            <a
                                href="mailto:support@azmainbd.com"
                                className="hover:text-base-content"
                            >
                                support@azmainbd.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-base-300">
                <div className="container-px flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
                    <p className="text-xs text-base-content/45">
                        © {year} {SITE_NAME}. All rights reserved.
                    </p>
                    <p className="text-xs text-base-content/45">
                        Secure payments powered by SSLCommerz
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
