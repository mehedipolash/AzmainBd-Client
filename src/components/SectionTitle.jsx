import React from 'react';
import { Link } from 'react-router';
import { FiArrowRight } from 'react-icons/fi';

// The section heading used across every page. `align="center"` is used by the
// full-bleed tinted sections; the default left variant carries an optional
// action link on the right.
const SectionTitle = ({ eyebrow, title, subtitle, actionLabel, actionPath, align = 'left' }) => {
    const centered = align === 'center';

    return (
        <div
            className={`mb-8 gap-4 sm:mb-10 ${
                centered ? 'text-center' : 'flex flex-wrap items-end justify-between'
            }`}
        >
            <div className={centered ? 'mx-auto max-w-2xl' : ''}>
                {eyebrow && (
                    <p className="mb-2 text-xs font-bold tracking-[0.18em] text-primary uppercase">
                        {eyebrow}
                    </p>
                )}

                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                    {title}
                </h2>

                <span
                    className={`brand-gradient mt-3 block h-1 w-16 rounded-full ${
                        centered ? 'mx-auto' : ''
                    }`}
                />

                {subtitle && (
                    <p className="mt-4 text-sm text-base-content/60 sm:text-base">{subtitle}</p>
                )}
            </div>

            {!centered && actionLabel && actionPath && (
                <Link
                    to={actionPath}
                    className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-primary"
                >
                    {actionLabel}
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
            )}
        </div>
    );
};

export default SectionTitle;
