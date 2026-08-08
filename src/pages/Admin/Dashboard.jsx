import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaBoxOpen, FaTriangleExclamation, FaCircleXmark, FaLayerGroup } from 'react-icons/fa6';
import { fetchProducts, fetchCategories } from '../../api/products.api';
import Loader from '../../components/Loader';
import { formatCurrency } from '../../utils/formatCurrency';

const Dashboard = () => {
    const [state, setState] = useState({ loading: true, error: '', products: [], categories: [] });

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const [productsResponse, categories] = await Promise.all([
                    fetchProducts({ limit: 60 }),
                    fetchCategories(),
                ]);

                if (cancelled) return;
                setState({
                    loading: false,
                    error: '',
                    products: productsResponse.items ?? [],
                    categories,
                });
            } catch (error) {
                if (cancelled) return;
                setState({ loading: false, error: error.message, products: [], categories: [] });
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    if (state.loading) return <Loader fullScreen />;

    if (state.error) {
        return (
            <div className="p-6 lg:p-10">
                <p className="border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error">
                    {state.error}
                </p>
            </div>
        );
    }

    const { products, categories } = state;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 6);
    const soldOut = products.filter((p) => p.stock === 0);
    const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

    const stats = [
        { label: 'Products', value: products.length, icon: FaBoxOpen, tone: 'text-primary' },
        { label: 'Categories', value: categories.length, icon: FaLayerGroup, tone: 'text-primary' },
        { label: 'Low stock', value: lowStock.length, icon: FaTriangleExclamation, tone: 'text-warning' },
        { label: 'Sold out', value: soldOut.length, icon: FaCircleXmark, tone: 'text-error' },
    ];

    return (
        <div className="p-5 sm:p-8 lg:p-10">
            <header className="mb-8">
                <p className="eyebrow mb-2">Overview</p>
                <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div key={stat.label} className="border border-base-300 bg-base-100 p-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[11px] tracking-[0.16em] text-base-content/45 uppercase">
                                        {stat.label}
                                    </p>
                                    <p className="mt-2 font-display text-3xl font-semibold tabular-nums">
                                        {stat.value}
                                    </p>
                                </div>
                                <Icon className={`text-lg ${stat.tone}`} aria-hidden="true" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 border border-base-300 bg-base-100 p-5">
                <p className="text-[11px] tracking-[0.16em] text-base-content/45 uppercase">
                    Inventory value at retail
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-primary">
                    {formatCurrency(inventoryValue)}
                </p>
            </div>

            {lowStock.length > 0 && (
                <section className="mt-8">
                    <h2 className="mb-4 font-display text-xl font-semibold">Needs restocking</h2>

                    <div className="overflow-x-auto border border-base-300 bg-base-100">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-base-300 bg-base-200/60 text-left">
                                    <th className="px-4 py-3 text-[11px] tracking-[0.14em] text-base-content/50 uppercase">
                                        Product
                                    </th>
                                    <th className="px-4 py-3 text-[11px] tracking-[0.14em] text-base-content/50 uppercase">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 text-right text-[11px] tracking-[0.14em] text-base-content/50 uppercase">
                                        Stock
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lowStock.map((product) => (
                                    <tr key={product._id} className="border-b border-base-300 last:border-0">
                                        <td className="px-4 py-3">
                                            <Link
                                                to={`/admin/products/${product._id}`}
                                                className="hover:text-primary"
                                            >
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-base-content/55 capitalize">
                                            {product.category}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="pill-urgent">{product.stock} left</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Dashboard;
