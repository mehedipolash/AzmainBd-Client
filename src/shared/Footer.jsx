import React from 'react';
import { Link } from 'react-router';
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
    FaLocationDot,
    FaPhone,
    FaEnvelope,
    FaArrowRight,
} from 'react-icons/fa6';
import Logo from '../components/Logo';
import OrderButton from '../components/OrderButton';
import { FOOTER_LINKS, SITE_NAME, SITE_TAGLINE } from '../utils/constants';
import {
    ADDRESS_LINES,
    EMAIL,
    EMAIL_HREF,
    MAP_URL,
    PHONE_DISPLAY,
    PHONE_HREF,
    SOCIAL_LINKS,
    buildWhatsAppLink,
} from '../utils/business';

// Only the accounts the client actually runs. An icon linking to a profile
// that does not exist is worse than no icon at all.
const SOCIALS = [
    { icon: FaFacebookF, label: 'Facebook', href: SOCIAL_LINKS.facebook },
    { icon: FaInstagram, label: 'Instagram', href: SOCIAL_LINKS.instagram },
    { icon: FaWhatsapp, label: 'WhatsApp', href: buildWhatsAppLink() },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-20 bg-linear-to-b from-footer-from to-footer-to text-footer-content">
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
                        className="text-footer-from"
                    />
                </svg>
            </div>

            <div className="container-px relative pt-14 pb-10 lg:pt-16">
                {/* Closing call to action. */}
                <div className="flex flex-col gap-6 border-b border-footer-rule pb-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                    <div>
                        <h2 className="font-display text-2xl leading-tight font-semibold sm:text-3xl lg:text-[34px]">
                            Ready to upgrade your setup?
                        </h2>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-footer-content/85">
                            Genuine global brands, free delivery over ৳ 5,000, and a real person
                            on WhatsApp who answers.
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
                        <a
                            href={buildWhatsAppLink('Hello Azmain BD, I have a question.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 border border-footer-rule px-7 py-3 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:border-primary hover:bg-primary/10"
                        >
                            <FaWhatsapp className="text-sm" aria-hidden="true" />
                            WhatsApp us
                        </a>
                    </div>
                </div>

                <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Logo variant="wide" size="lg" />

                        <p className="mt-2 text-[11px] font-medium tracking-[0.18em] text-footer-muted uppercase">
                            {SITE_TAGLINE}
                        </p>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-footer-content/85">
                            Importer and retailer of genuine global personal-care brands, serving
                            customers across Bangladesh from our Gulshan showroom.
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
                                        className="flex size-9 items-center justify-center border border-footer-rule text-xs transition-colors hover:border-primary hover:bg-primary hover:text-primary-content"
                                    >
                                        <Icon />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {FOOTER_LINKS.map((group) => (
                        <div key={group.title}>
                            <h3 className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-footer-muted uppercase">
                                {group.title}
                            </h3>
                            <ul className="space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.path}
                                            className="text-sm text-footer-content/85 transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="mb-5 text-[11px] font-semibold tracking-[0.18em] text-footer-muted uppercase">
                            Get in touch
                        </h3>

                        <ul className="space-y-4 text-sm text-footer-content/85">
                            <li className="flex gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center border border-footer-rule">
                                    <FaEnvelope className="text-[11px]" aria-hidden="true" />
                                </span>
                                <a
                                    href={EMAIL_HREF}
                                    className="pt-1.5 break-all transition-colors hover:text-primary"
                                >
                                    {EMAIL}
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center border border-footer-rule">
                                    <FaPhone className="text-[11px]" aria-hidden="true" />
                                </span>
                                <a href={PHONE_HREF} className="pt-1.5 transition-colors hover:text-primary">
                                    {PHONE_DISPLAY}
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center border border-footer-rule">
                                    <FaLocationDot className="text-[11px]" aria-hidden="true" />
                                </span>
                                <a
                                    href={MAP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pt-1.5 transition-colors hover:text-primary"
                                >
                                    {ADDRESS_LINES.map((line) => (
                                        <span key={line} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </a>
                            </li>
                        </ul>

                        <OrderButton
                            href={buildWhatsAppLink('Hello Azmain BD, I would like to order.')}
                            signedOutLabel="Sign in to order"
                            className="mt-6 flex w-full items-center justify-center gap-2 bg-[#25D366] px-5 py-3.5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase transition-opacity hover:opacity-90"
                        >
                            <FaWhatsapp className="text-sm" aria-hidden="true" />
                            Order on WhatsApp
                        </OrderButton>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-2 border-t border-footer-rule pt-6 sm:flex-row">
                    <p className="text-xs text-footer-muted">
                        © {year} {SITE_NAME}. All rights reserved.
                    </p>
                    <p className="text-xs text-footer-muted">
                        Orders and payment confirmed on WhatsApp
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
