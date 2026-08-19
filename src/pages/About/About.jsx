import React from 'react';
import { Link } from 'react-router';
import { FaShieldHalved, FaBoxOpen, FaHeadset, FaTruckFast } from 'react-icons/fa6';
import PageHeader from '../../components/PageHeader';
import SectionTitle from '../../components/SectionTitle';
import UseCatalogue from '../../Hooks/UseCatalogue';
import { getStoreStats } from '../../utils/catalogue';

const VALUES = [
    {
        icon: FaShieldHalved,
        title: 'Genuine only',
        body: 'We import direct and buy through brand distributors. Every item is genuine, sealed and in date — never a counterfeit or a refill.',
    },
    {
        icon: FaBoxOpen,
        title: '500-point inspection',
        body: 'Every unit is checked and re-sealed before dispatch, with warranty paperwork already in the box.',
    },
    {
        icon: FaTruckFast,
        title: 'Next-day in Dhaka',
        body: 'Orders placed before 6pm ship the same evening, with nationwide courier coverage beyond the city.',
    },
    {
        icon: FaHeadset,
        title: 'Support that answers',
        body: 'A real technical team on the phone, not a script — before you buy and long after.',
    },
];

const About = () => {
    const { products, categories } = UseCatalogue();
    const stats = getStoreStats(products, categories);

    return (
        <div>
            <PageHeader
                eyebrow="Our story"
                title="Built on what the box actually contains"
                subtitle="House of global brands — imported personal care, sold from Gulshan-1, Dhaka."
                image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'About' }]}
            />

            <section className="container-px section-y">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="overflow-hidden bg-base-200">
                        <img
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=80"
                            alt="Our Dhaka showroom"
                            loading="lazy"
                            className="aspect-4/3 w-full object-cover"
                        />
                    </div>

                    <div>
                        <p className="eyebrow mb-3">Why we started</p>
                        <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                            Buying electronics here should not be a gamble
                        </h2>

                        <p className="mt-6 text-[15px] leading-relaxed text-base-content/65">
                            Anyone who has shopped for a phone or a fridge in Dhaka knows the
                            problem: two shops quote wildly different prices for the same model, and
                            only one of them will honour the warranty. Grey imports carry no local
                            service cover. Refurbished units get sold as sealed.
                        </p>

                        <p className="mt-4 text-[15px] leading-relaxed text-base-content/65">
                            We built this store to remove that uncertainty. Every product we list
                            comes through an authorised distributor, arrives sealed, and ships with
                            warranty paperwork that a service centre will actually accept.
                        </p>

                        <Link to="/shop" className="btn-shop mt-8">
                            Browse the catalogue
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-y border-base-300 bg-base-200">
                <div className="container-px py-14 sm:py-16">
                    <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
                        {[
                            { value: `${stats.productCount}`, label: 'Products in stock' },
                            { value: stats.brandCount, label: 'Global brands' },
                            { value: stats.categoryCount, label: 'Categories' },
                            { value: 'Gulshan-1', label: 'Dhaka showroom' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <dt className="sr-only">{stat.label}</dt>
                                <dd>
                                    <span className="block font-display text-3xl font-semibold text-primary sm:text-4xl">
                                        {stat.value}
                                    </span>
                                    <span className="mt-2 block text-[12px] tracking-wide text-base-content/55 uppercase">
                                        {stat.label}
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section className="container-px section-y">
                <SectionTitle
                    eyebrow="How we work"
                    title="Four commitments"
                    subtitle="These are operating rules, not marketing copy — every order is held to them."
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                    {VALUES.map((value) => {
                        const Icon = value.icon;

                        return (
                            <article
                                key={value.title}
                                className="flex gap-5 border border-base-300 p-6 sm:p-8"
                            >
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                                    <Icon className="text-lg text-primary" aria-hidden="true" />
                                </span>
                                <div>
                                    <h3 className="font-display text-lg font-semibold">
                                        {value.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                                        {value.body}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default About;
