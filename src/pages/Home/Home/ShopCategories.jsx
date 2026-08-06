import React from 'react';
import { Link } from 'react-router';
import { FiSmartphone, FiMonitor, FiTv, FiHeadphones, FiBox, FiHome } from 'react-icons/fi';
import SectionTitle from '../../../components/SectionTitle';
import { categories } from '../../../data/products';

// Icon lookup lives beside the section that renders it so the data file stays
// free of view concerns.
const ICONS = {
    phone: FiSmartphone,
    laptop: FiMonitor,
    fridge: FiBox,
    tv: FiTv,
    audio: FiHeadphones,
    appliance: FiHome,
};

// Each tile takes the next stop on the brand ramp.
const TILE_TINTS = ['tint-1', 'tint-2', 'tint-3', 'tint-4', 'tint-2', 'tint-3'];

const ShopCategories = () => {
    return (
        <section className="container-px section-y">
            <SectionTitle
                eyebrow="Browse"
                title="Shop Categories"
                actionLabel="View All"
                actionPath="/categories"
            />

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
                {categories.map((category, index) => {
                    const Icon = ICONS[category.icon] ?? FiBox;

                    return (
                        <li key={category.id}>
                            <Link
                                to={`/shop?category=${category.id}`}
                                className={`${TILE_TINTS[index % TILE_TINTS.length]} group flex h-full flex-col items-center gap-3 rounded-box border border-base-300 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 sm:p-6`}
                            >
                                <span className="flex size-12 items-center justify-center rounded-2xl bg-base-100/70 transition-transform duration-300 group-hover:scale-110">
                                    <Icon className="text-xl text-primary" aria-hidden="true" />
                                </span>
                                <span className="text-xs font-semibold sm:text-sm">
                                    {category.name}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default ShopCategories;
