import React from 'react';
import { Link } from 'react-router';
import SectionTitle from '../../components/SectionTitle';
import PageHeader from '../../components/PageHeader';
import { categories, products, isInStock } from '../../data/products';

const Categories = () => {
    // Show what is actually buyable, not the raw catalogue count.
    const availableIn = (categoryId) =>
        products.filter((product) => product.category === categoryId && isInStock(product)).length;

    return (
        <div>
            <PageHeader
                eyebrow="Departments"
                title="Shop by category"
                subtitle="Every department is stocked with authorised products and full warranty coverage."
                image="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&q=80"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'Categories' }]}
            />

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

                                <span className="mt-3 inline-block border-b border-primary/40 pb-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase transition-colors group-hover:border-primary">
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
