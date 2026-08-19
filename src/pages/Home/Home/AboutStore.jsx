import React from 'react';
import { Link } from 'react-router';

const AboutStore = () => {
    return (
        <section className="container-px section-y">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="overflow-hidden bg-base-200" data-aos="fade-right">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80"
                        alt="Our showroom"
                        loading="lazy"
                        className="aspect-4/3 w-full object-cover"
                    />
                </div>

                <div>
                    <p className="eyebrow mb-3">Our story</p>

                    <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                        Crafting confidence in every purchase
                    </h2>

                    <p className="mt-6 text-[15px] leading-relaxed text-base-content/65">
                        We import the brands we carry and buy the rest through their distributors. Each item
                        arrives sealed, passes a 500-point inspection before dispatch and ships with
                        arrives sealed, genuine and in date.
                    </p>

                    <p className="mt-4 text-[15px] leading-relaxed text-base-content/65">
                        No counterfeits, no refills sold as new, and a real person on WhatsApp
                        by people who can actually answer a technical question.
                    </p>

                    <Link to="/about" className="btn-shop-outline mt-8">
                        Read our story
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutStore;
