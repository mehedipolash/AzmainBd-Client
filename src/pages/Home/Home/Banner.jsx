import React from 'react';
import { Link } from 'react-router';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import { heroTags } from '../../../data/products';

const STATS = [
    { value: '12K+', label: 'Happy customers' },
    { value: '500+', label: 'Quality checks' },
    { value: '24/7', label: 'Live support' },
];

const Banner = () => {
    return (
        <section className="relative overflow-hidden">
            {/* Layered brand wash — two soft blobs from opposite ends of the
                ramp, so the hero reads vibrant without a background photo. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-32 -left-24 size-112 rounded-full bg-brand-1/25 blur-3xl" />
                <div className="absolute top-10 -right-24 size-104 rounded-full bg-brand-3/30 blur-3xl" />
                <div className="absolute -bottom-40 left-1/3 size-96 rounded-full bg-brand-4/25 blur-3xl" />
            </div>

            <div className="container-px section-y">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="text-center lg:text-left">
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
                            <FiZap aria-hidden="true" />
                            New arrival
                        </span>

                        <h1 className="mt-6 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                            Future of Tech.
                            <br />
                            <span className="brand-text-gradient">Right Now.</span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-base-content/70 lg:mx-0 lg:text-lg">
                            Experience the zenith of engineering with our latest flagship lineup.
                            Powered by advanced AI and a revolutionary obsidian display.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                            <Link
                                to="/shop"
                                className="btn btn-primary rounded-full px-7 shadow-lg shadow-primary/25"
                            >
                                Shop Now
                                <FiArrowRight />
                            </Link>
                            <Link to="/deals" className="btn btn-outline rounded-full px-7">
                                View Deals
                            </Link>
                        </div>

                        <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-base-300 pt-8">
                            {STATS.map((stat) => (
                                <div key={stat.label}>
                                    <dt className="sr-only">{stat.label}</dt>
                                    <dd>
                                        <span className="block text-2xl font-extrabold text-primary sm:text-3xl">
                                            {stat.value}
                                        </span>
                                        <span className="mt-1 block text-xs text-base-content/55 sm:text-sm">
                                            {stat.label}
                                        </span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Product showcase — tilted card with a gradient frame and a
                        floating price chip. */}
                    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                        <div className="brand-gradient rounded-4xl p-1.5 shadow-2xl shadow-primary/20 transition-transform duration-500 lg:rotate-2 lg:hover:rotate-0">
                            <div className="overflow-hidden rounded-[1.65rem] bg-base-100">
                                <img
                                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&q=80"
                                    alt="Flagship smartphone"
                                    className="aspect-4/3 w-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="absolute -bottom-5 -left-2 rounded-2xl border border-base-300 bg-base-100 px-5 py-3 shadow-xl sm:left-4">
                            <p className="text-[11px] font-medium text-base-content/50">Starting at</p>
                            <p className="text-lg font-extrabold text-primary">৳ 89,999</p>
                        </div>
                    </div>
                </div>

                <ul className="mt-16 flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:justify-start">
                    {heroTags.map((tag, index) => {
                        // Cycle the ramp so the chip row shows all four colors.
                        const tints = ['tint-1', 'tint-2', 'tint-3', 'tint-4'];

                        return (
                            <li
                                key={tag}
                                className={`${tints[index % tints.length]} rounded-full border border-base-300 px-4 py-2 text-xs font-medium sm:text-sm`}
                            >
                                {tag}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Banner;
