import React from 'react';
import { Link } from 'react-router';
import { FaArrowRight, FaCrown } from 'react-icons/fa6';

/* ---------------------------------------------------------------------------
   The banner at the top of every admin screen.

   It carries a background photograph rather than a flat colour, because the
   admin panel is the screen the owner spends the most time in and a wall of
   grey tables gives no sense of place. The image is one of the shop's own
   product photographs, so the panel looks like this business rather than like
   a generic dashboard template.

   Everything sits over a scrim. The photo is decorative — it must never be the
   reason a heading is hard to read — so the gradient is heavy on the copy side
   and the text colour is fixed white rather than a theme token. That keeps the
   contrast constant in both themes, since the photograph underneath does not
   change with the theme.
--------------------------------------------------------------------------- */

const AdminBanner = ({ eyebrow, title, subtitle, image = '/banners/admin.jpg', action, stats, royal = false }) => (
    <header
        className={`relative overflow-hidden ${
            // The owner's screens get a deep royal ground instead of the product
            // photo — a distinct, unmistakable "this is the owner" vibe that
            // holds in both light and dark mode, since it never depends on a
            // theme token or a background image the way the normal banner does.
            royal
                ? 'bg-[#211546] text-white'
                : 'bg-brand-surface'
        }`}
    >
        {royal ? (
            <>
                {/* A deep royal indigo→plum ground with a warm gold glow in the
                    corner — reads as "premium" far better than a flat brown, and
                    holds identically in both themes since it never touches a
                    theme token. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(130% 150% at 100% 0%, rgba(255,205,110,0.30) 0%, rgba(255,205,110,0) 52%), radial-gradient(110% 130% at 0% 100%, rgba(129,90,255,0.35) 0%, rgba(129,90,255,0) 55%), linear-gradient(120deg, #2a1a5c 0%, #211546 52%, #170f33 100%)',
                    }}
                />
                {/* A faint crown motif in the corner, drawn not photographed. */}
                <FaCrown
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 right-6 text-[190px] text-brand-gold/10 sm:right-16"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-gold/60 to-transparent"
                />
            </>
        ) : (
            <>
                <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-30"
                />

                {/* Directional scrim — heavier where the copy sits, so the
                    headline stays readable without flattening the photograph. */}
                <div className="absolute inset-0 bg-linear-to-r from-brand-surface via-brand-surface/90 to-brand-surface/55" />
            </>
        )}

        <div className="relative px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="flex flex-wrap items-end justify-between gap-5">
                <div className="min-w-0">
                    {eyebrow && (
                        <p
                            className={`mb-2 flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase ${
                                royal ? 'text-brand-gold' : 'text-white/60'
                            }`}
                        >
                            {royal && <FaCrown className="text-[11px]" aria-hidden="true" />}
                            {eyebrow}
                        </p>
                    )}

                    <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/70">
                            {subtitle}
                        </p>
                    )}
                </div>

                {action && (
                    <Link
                        to={action.to}
                        className="inline-flex shrink-0 items-center gap-2 bg-white px-6 py-3 text-xs font-semibold tracking-[0.14em] text-brand-surface uppercase transition-opacity hover:opacity-90"
                    >
                        {action.label}
                        <FaArrowRight className="text-[11px]" aria-hidden="true" />
                    </Link>
                )}
            </div>

            {/* Optional inline figures, so the banner carries information rather
                than only decoration. */}
            {stats?.length > 0 && (
                <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <dt className="text-[11px] tracking-[0.16em] text-white/50 uppercase">
                                {stat.label}
                            </dt>
                            <dd className="font-display mt-1 text-2xl font-semibold text-white">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            )}
        </div>
    </header>
);

export default AdminBanner;
