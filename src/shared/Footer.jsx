import React from 'react';
import { Link } from 'react-router';
import { FiGlobe, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FOOTER_LINKS, SITE_NAME } from '../utils/constants';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-base-300 bg-base-200">
            <div className="container-px grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
                <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="brand-gradient flex size-9 items-center justify-center rounded-xl text-sm font-black text-white">
                            A
                        </span>
                        <span className="brand-text-gradient text-lg font-extrabold">
                            {SITE_NAME}
                        </span>
                    </Link>

                    <p className="max-w-xs text-sm leading-relaxed text-base-content/60">
                        Providing high-performance electronics and premium home appliances for
                        tech-savvy households across the region.
                    </p>

                    <div className="flex gap-2">
                        <a
                            href="https://azmainbd.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-circle btn-sm border-base-300 bg-base-100 hover:border-primary hover:text-primary"
                            aria-label="Website"
                        >
                            <FiGlobe />
                        </a>
                        <a
                            href="mailto:support@azmainbd.com"
                            className="btn btn-circle btn-sm border-base-300 bg-base-100 hover:border-primary hover:text-primary"
                            aria-label="Email support"
                        >
                            <FiMail />
                        </a>
                    </div>
                </div>

                {FOOTER_LINKS.map((group) => (
                    <div key={group.title}>
                        <h3 className="mb-4 text-xs font-bold tracking-[0.15em] text-base-content/45 uppercase">
                            {group.title}
                        </h3>
                        <ul className="space-y-3">
                            {group.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-base-content/70 transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div>
                    <h3 className="mb-4 text-xs font-bold tracking-[0.15em] text-base-content/45 uppercase">
                        Get in touch
                    </h3>
                    <ul className="space-y-3 text-sm text-base-content/70">
                        <li className="flex items-start gap-3">
                            <FiMapPin className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                            Dhaka, Bangladesh
                        </li>
                        <li className="flex items-start gap-3">
                            <FiPhone className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                            <a href="tel:+8801000000000" className="hover:text-primary">
                                +880 1000-000000
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <FiMail className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                            <a href="mailto:support@azmainbd.com" className="hover:text-primary">
                                support@azmainbd.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-base-300">
                <div className="container-px flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
                    <p className="text-xs text-base-content/50">
                        © {year} <span className="font-semibold text-primary">{SITE_NAME}</span>.
                        All rights reserved.
                    </p>
                    <p className="text-xs text-base-content/50">
                        Secure payments powered by SSLCommerz
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
