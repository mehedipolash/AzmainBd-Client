import React from 'react';
import { Link } from 'react-router';

// Every inner page opens with the same banner: a photographic ground, a teal
// wash to tie it to the brand, and optional breadcrumbs. Defined once so the
// pages stay consistent and a restyle is a single edit.
const PageHeader = ({ eyebrow, title, subtitle, image, crumbs = [] }) => {
    return (
        <section className="relative overflow-hidden">
            {image && (
                <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}

            {/* Brand wash over the photograph — dark enough that white text
                clears contrast regardless of the image behind it. */}
            <div className="absolute inset-0 bg-primary/92" />
            <div className="absolute inset-0 bg-linear-to-r from-ink/55 via-transparent to-transparent" />

            <div className="container-px relative py-14 text-center sm:py-18 lg:py-22">
                {eyebrow && (
                    <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-white/70 uppercase">
                        {eyebrow}
                    </p>
                )}

                <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-[44px]">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/75">
                        {subtitle}
                    </p>
                )}

                {crumbs.length > 0 && (
                    <nav aria-label="Breadcrumb" className="mt-6">
                        <ol className="flex flex-wrap items-center justify-center gap-2 text-[13px] text-white/60">
                            {crumbs.map((crumb, index) => (
                                <li key={crumb.label} className="flex items-center gap-2">
                                    {index > 0 && <span aria-hidden="true">/</span>}
                                    {crumb.path ? (
                                        <Link
                                            to={crumb.path}
                                            className="transition-colors hover:text-white"
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-white">{crumb.label}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}
            </div>
        </section>
    );
};

export default PageHeader;
