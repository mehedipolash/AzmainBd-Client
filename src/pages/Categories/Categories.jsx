import React from 'react';
import { Link } from 'react-router';
import SectionTitle from '../../components/SectionTitle';
import { categories, products, isInStock } from '../../data/products';

const Categories = () => {
    // Show what is actually buyable, not the raw catalogue count.
    const availableIn = (categoryId) =>
        products.filter((product) => product.category === categoryId && isInStock(product)).length;

    return (
        <div>
            <div className="border-b border-base-300 bg-base-200">
                <div className="container-px py-12 text-center sm:py-16">
                    <p className="eyebrow mb-3">Departments</p>
                    <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                        Shop by category
                    </h1>
                </div>
            </div>

            <div className="container-px section-y">
                <SectionTitle
                    eyebrow="Browse"
                    title="All categories"
                    subtitle="Every department is stocked with authorised products and full warranty coverage."
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {categories.map((category) => {
                        const count = availableIn(category.id);

                        return (
                            <Link
                                key={category.id}
                                to={`/shop?category=${category.id}`}
                                className="group text-center"
                            >
                                <div className="overflow-hidden bg-base-200">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        loading="lazy"
                                        className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <h2 className="mt-5 font-display text-xl font-semibold">
                                    {category.name}
                                </h2>

                                <p className="mt-1 text-[13px] text-base-content/50">
                                    {count > 0 ? `${count} in stock` : 'Restocking soon'}
                                </p>

                                <span className="mt-3 inline-block border-b border-base-content/30 pb-1 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors group-hover:border-base-content">
                                    Explore
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Categories;
