import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { brands } from '../../../data/products';

const AuthorizedBrands = () => {
    return (
        <section className="container-px section-y">
            <SectionTitle
                eyebrow="Partners"
                title="Authorized Brands"
                subtitle="We are an official retail partner for every brand we carry."
                align="center"
            />

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
                {brands.map((brand) => (
                    <li
                        key={brand}
                        className="flex items-center justify-center rounded-box border border-base-300 bg-base-100 px-4 py-6 text-center text-sm font-bold text-base-content/55 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-md"
                    >
                        {brand}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AuthorizedBrands;
