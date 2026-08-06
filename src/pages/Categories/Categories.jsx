import React from 'react';
import { Link } from 'react-router';
import SectionTitle from '../../components/SectionTitle';
import { categories, products } from '../../data/products';

const Categories = () => {
    const countFor = (categoryId) =>
        products.filter((product) => product.category === categoryId).length;

    return (
        <div className="container-px py-8 sm:py-10 lg:py-12">
            <SectionTitle
                eyebrow="Browse"
                title="All Categories"
                subtitle="Find exactly what you need across our full catalogue."
            />

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={`/shop?category=${category.id}`}
                        className="card-surface group flex items-center justify-between p-6"
                    >
                        <div>
                            <h2 className="font-semibold transition-colors group-hover:text-primary">
                                {category.name}
                            </h2>
                            <p className="mt-1 text-sm text-base-content/50">
                                {countFor(category.id)} products
                            </p>
                        </div>
                        <span className="text-primary">→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
