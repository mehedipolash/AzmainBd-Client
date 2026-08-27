import React from 'react';
import { Link } from 'react-router';
import { FaShieldHalved, FaBoxOpen, FaHeadset, FaTruckFast } from 'react-icons/fa6';
import PageHeader from '../../components/PageHeader';
import SectionTitle from '../../components/SectionTitle';
import ShopMap from '../../components/ShopMap';
import UseCatalogue from '../../Hooks/UseCatalogue';
import UsePageTitle from '../../Hooks/UsePageTitle';
import { getStoreStats } from '../../utils/catalogue';

const VALUES = [
    {
        icon: FaShieldHalved,
        title: 'Genuine only',
        body: 'We import direct and buy through brand distributors. Every item is genuine, sealed and in date — never a counterfeit or a refill.',
    },
    {
        icon: FaBoxOpen,
        title: 'Sealed and in date',
        body: 'Every bottle leaves us factory-sealed, with its batch code and expiry date intact so you can check it yourself.',
    },
    {
        icon: FaTruckFast,
        title: 'Delivered nationwide',
        body: 'Next-day inside Dhaka, two to four days anywhere else in Bangladesh. Free over ৳ 5,000.',
    },
    {
        icon: FaHeadset,
        title: 'A person, not a script',
        body: 'Message us on WhatsApp and the shop answers — before you order and after it arrives.',
    },
];

const About = () => {
    UsePageTitle('About us');
    const { products, categories } = UseCatalogue();
    const stats = getStoreStats(products, categories);

    return (
        <div>
            <PageHeader
                eyebrow="Our story"
                title="Built on what the box actually contains"
                subtitle="House of global brands — imported personal care, sold from Gulshan-1, Dhaka."
                image="/banners/about.jpg"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'About' }]}
            />

            <section className="container-px section-y">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="overflow-hidden bg-base-200">
                        <img
                            src="/products/vica-premium-herbal-soap-natural-gulab-soap.jpg"
                            alt="VICA Premium Herbal Soap, one of the brands we import"
                            loading="lazy"
                            className="aspect-4/3 w-full object-cover"
                        />
                    </div>

                    <div>
                        <p className="eyebrow mb-3">Why we started</p>
                        <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                            Buying skincare here should not be a gamble
                        </h2>

                        <p className="mt-6 text-[15px] leading-relaxed text-base-content/65">
                            Anyone who has bought shampoo or a body lotion in Dhaka knows the
                            problem: the same NIVEA bottle sits on two shelves at two different
                            prices, and only one of them is the real thing. Counterfeit personal
                            care is common, and a fake product does not just disappoint — it goes
                            on your skin.
                        </p>

                        <p className="mt-4 text-[15px] leading-relaxed text-base-content/65">
                            We import directly and sell from our own showroom, so there is one
                            link between the brand and you. Every bottle arrives sealed, with its
                            batch code and expiry intact — and you are welcome to come in and
                            check any of it before you buy.
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

            <section className="container-px pb-16 lg:pb-24">
                <SectionTitle
                    eyebrow="Find us"
                    title="The Gulshan-1 showroom"
                    subtitle="Every product on this site is on the shelf here. Come and see it before you buy."
                />

                <ShopMap />
            </section>
        </div>
    );
};

export default About;
