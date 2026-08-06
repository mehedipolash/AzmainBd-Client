import React from 'react';
import { Link } from 'react-router';
import { FiCreditCard, FiAward, FiHeadphones, FiTruck, FiArrowRight } from 'react-icons/fi';
import SectionTitle from '../../../components/SectionTitle';

const WhyChooseUs = () => {
    return (
        <section className="tint-3 border-y border-base-300">
            <div className="container-px section-y">
                <SectionTitle
                    eyebrow="Why us"
                    title="Engineered for Performance"
                    subtitle="Every product passes 500+ quality checks before it reaches your door."
                    align="center"
                />

                {/* Bento layout — the wide tile anchors the grid, the four
                    feature cards each take one stop on the brand ramp. */}
                <div className="grid gap-4 lg:grid-cols-3">
                    <article className="relative min-h-72 overflow-hidden rounded-box border border-base-300 lg:col-span-2 lg:min-h-full">
                        <img
                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
                            alt="Circuit board close-up"
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-neutral via-neutral/70 to-neutral/10" />

                        <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
                            <h3 className="text-2xl font-extrabold text-neutral-content sm:text-3xl">
                                Built on trust, backed by warranty
                            </h3>
                            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-content/80">
                                We are an authorised retail partner for every brand we carry, so
                                each unit ships sealed with full manufacturer coverage.
                            </p>
                            <Link
                                to="/about"
                                className="btn btn-sm mt-6 w-fit rounded-full border-0 bg-base-100 text-base-content hover:bg-base-200"
                            >
                                Read Our Story
                                <FiArrowRight />
                            </Link>
                        </div>
                    </article>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        <article className="tint-1 flex items-start gap-4 rounded-box border border-base-300 p-6">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-base-100/80">
                                <FiCreditCard className="text-xl text-brand-1" aria-hidden="true" />
                            </span>
                            <div>
                                <h3 className="font-bold">EMI Facilities</h3>
                                <p className="mt-1 text-sm text-base-content/65">
                                    All major banks, starting from 0% interest.
                                </p>
                            </div>
                        </article>

                        <article className="tint-2 flex items-start gap-4 rounded-box border border-base-300 p-6">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-base-100/80">
                                <FiAward className="text-xl text-brand-1" aria-hidden="true" />
                            </span>
                            <div>
                                <h3 className="font-bold">Official Warranty</h3>
                                <p className="mt-1 text-sm text-base-content/65">
                                    Genuine products with full brand coverage.
                                </p>
                            </div>
                        </article>

                        <article className="tint-4 flex items-start gap-4 rounded-box border border-base-300 p-6">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-base-100/80">
                                <FiHeadphones className="text-xl text-brand-1" aria-hidden="true" />
                            </span>
                            <div>
                                <h3 className="font-bold">24/7 Support</h3>
                                <p className="mt-1 text-sm text-base-content/65">
                                    Real humans, any time you need them.
                                </p>
                            </div>
                        </article>

                        <article className="flex items-start gap-4 rounded-box border border-base-300 bg-base-100 p-6">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-base-200">
                                <FiTruck className="text-xl text-brand-1" aria-hidden="true" />
                            </span>
                            <div>
                                <h3 className="font-bold">Free Delivery</h3>
                                <p className="mt-1 text-sm text-base-content/65">
                                    Nationwide shipping on every order.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
