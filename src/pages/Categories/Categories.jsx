import React from 'react';
import { Link } from 'react-router';
import SectionTitle from '../../components/SectionTitle';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import UseCatalogue from '../../Hooks/UseCatalogue';
import { resolveImageUrl } from '../../utils/imageUrl';

const Categories = () => {
    const { categories, loading, error } = UseCatalogue();

    return (
        <div>
            <PageHeader
                eyebrow="Departments"
                title="Shop by category"
                subtitle="Genuine branded personal care, sourced direct and stocked in Gulshan."
                image="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1600&q=80"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'Categories' }]}
            />

            <div className="container-px section-y">
                <SectionTitle
                    eyebrow="Browse"
                    title="All categories"
                    subtitle="Every department carries genuine branded stock. Order any item on WhatsApp."
                />

                {loading ? (
                    <Loader />
                ) : error ? (
                    <EmptyState
                        title="Could not load categories"
                        message={error}
                        actionLabel="Back to home"
                        actionPath="/"
                    />
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                to={`/shop?category=${category.slug}`}
                                className="group text-center"
                            >
                                <div className="overflow-hidden bg-base-200">
                                    <img
                                        src={resolveImageUrl(category.image)}
                                        alt={category.name}
                                        loading="lazy"
                                        className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <h2 className="mt-5 font-display text-xl font-semibold">
                                    {category.name}
                                </h2>

                                {/* Count comes from the API, which only counts
                                    products with stock — so this never promises
                                    something the shop cannot supply. */}
                                <p className="mt-1 text-[13px] text-base-content/50">
                                    {category.inStockCount > 0
                                        ? `${category.inStockCount} in stock`
                                        : 'Restocking soon'}
                                </p>

                                <span className="mt-3 inline-block border-b border-primary/40 pb-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase transition-colors group-hover:border-primary">
                                    Explore
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
