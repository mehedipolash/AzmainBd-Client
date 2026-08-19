import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
    FaBoxOpen,
    FaTriangleExclamation,
    FaCircleXmark,
    FaLayerGroup,
    FaCartShopping,
    FaTrash,
} from 'react-icons/fa6';
import { fetchProducts, fetchCategories, fetchSales, deleteSale } from '../../api/products.api';
import Loader from '../../components/Loader';
import RecordSale from './RecordSale';
import UseCatalogue from '../../Hooks/UseCatalogue';
import UseToast from '../../Hooks/UseToast';
import { formatCurrency } from '../../utils/formatCurrency';
import { confirmAction, alertError } from '../../utils/alerts';
import { LOW_STOCK_THRESHOLD } from '../../utils/catalogue';

const Dashboard = () => {
    const [state, setState] = useState({
        loading: true,
        error: '',
        products: [],
        categories: [],
        sales: null,
    });

    const { reload: reloadCatalogue } = UseCatalogue();
    const { notify } = UseToast();

    const load = useCallback(async () => {
        try {
            const [productsResponse, categories, sales] = await Promise.all([
                fetchProducts({ limit: 60 }),
                fetchCategories(),
                fetchSales({ limit: 25 }),
            ]);

            setState({
                loading: false,
                error: '',
                products: productsResponse.items ?? [],
                categories,
                sales,
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message,
                products: [],
                categories: [],
                sales: null,
            });
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    // A recorded sale changes stock, so both this page and the storefront need
    // to see the new numbers.
    const handleChanged = () => {
        load();
        reloadCatalogue();
    };

    const handleUndoSale = async (sale) => {
        const confirmed = await confirmAction({
            title: 'Undo this sale?',
            text: `${sale.quantity} × ${sale.productName} will go back into stock.`,
            confirmLabel: 'Undo sale',
        });

        if (!confirmed) return;

        try {
            await deleteSale(sale._id);
            notify('Sale removed and stock restored');
            handleChanged();
        } catch (error) {
            alertError('Could not undo that sale', error.message);
        }
    };

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

    const { products, categories, sales } = state;

    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD);
    const soldOut = products.filter((p) => p.stock === 0);

    // Unpriced items contribute nothing to a retail valuation — counting them
    // as zero is correct, and counting them as anything else would be a guess.
    const inventoryValue = products.reduce((sum, p) => sum + (p.price ?? 0) * p.stock, 0);

    const stats = [
        { label: 'Products', value: products.length, icon: FaBoxOpen, tone: 'text-primary' },
        {
            label: 'Categories',
            value: categories.length,
            icon: FaLayerGroup,
            tone: 'text-primary',
        },
        {
            label: 'Low stock',
            value: lowStock.length,
            icon: FaTriangleExclamation,
            tone: 'text-warning',
        },
        { label: 'Sold out', value: soldOut.length, icon: FaCircleXmark, tone: 'text-error' },
    ];

    const money = [
        { label: 'Sold today', value: formatCurrency(sales?.today.revenue ?? 0), sub: `${sales?.today.units ?? 0} units` },
        {
            label: 'Sold this month',
            value: formatCurrency(sales?.month.revenue ?? 0),
            sub: `${sales?.month.units ?? 0} units`,
        },
        {
            label: 'Inventory value',
            value: formatCurrency(inventoryValue),
            sub: 'at retail price',
        },
    ];

    return (
        <div className="p-5 sm:p-8 lg:p-10">
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="eyebrow mb-2">Overview</p>
                    <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
                </div>
            </header>

            {/* Recording a sale is the action the owner takes most often —
                orders arrive on WhatsApp, so nothing else moves stock. */}
            <RecordSale products={products} onRecorded={handleChanged} />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {money.map((item) => (
                    <div key={item.label} className="border border-base-300 bg-base-100 p-5">
                        <p className="text-[11px] tracking-[0.16em] text-base-content/45 uppercase">
                            {item.label}
                        </p>
                        <p className="mt-2 font-display text-2xl font-semibold text-primary">
                            {item.value}
                        </p>
                        <p className="mt-1 text-[12px] text-base-content/45">{item.sub}</p>
                    </div>
                ))}
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
                                    <tr
                                        key={product._id}
                                        className="border-b border-base-300 last:border-0"
                                    >
                                        <td className="px-4 py-3">
                                            <Link
                                                to={`/admin/products/${product._id}`}
                                                className="hover:text-primary"
                                            >
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-base-content/55">
                                            {categories.find((c) => c.slug === product.category)
                                                ?.name ?? product.category}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="pill-urgent">
                                                {product.stock} left
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            <section className="mt-8">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
                    <FaCartShopping className="text-base text-primary" aria-hidden="true" />
                    Recent sales
                </h2>

                {sales?.items?.length > 0 ? (
                    <div className="overflow-x-auto border border-base-300 bg-base-100">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-base-300 bg-base-200/60 text-left">
                                    <th className="px-4 py-3 text-[11px] tracking-[0.14em] text-base-content/50 uppercase">
                                        Product
                                    </th>
                                    <th className="px-4 py-3 text-[11px] tracking-[0.14em] text-base-content/50 uppercase">
                                        Customer
                                    </th>
                                    <th className="px-4 py-3 text-right text-[11px] tracking-[0.14em] text-base-content/50 uppercase">
                                        Qty
                                    </th>
                                    <th className="px-4 py-3 text-right text-[11px] tracking-[0.14em] text-base-content/50 uppercase">
                                        Total
                                    </th>
                                    <th className="px-4 py-3 text-right text-[11px] tracking-[0.14em] text-base-content/50 uppercase">
                                        When
                                    </th>
                                    <th className="w-10" />
                                </tr>
                            </thead>
                            <tbody>
                                {sales.items.map((sale) => (
                                    <tr
                                        key={sale._id}
                                        className="border-b border-base-300 last:border-0"
                                    >
                                        <td className="px-4 py-3">{sale.productName}</td>
                                        <td className="px-4 py-3 text-base-content/55">
                                            {sale.customerName || '—'}
                                        </td>
                                        <td className="px-4 py-3 text-right tabular-nums">
                                            {sale.quantity}
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium tabular-nums">
                                            {formatCurrency(sale.total)}
                                        </td>
                                        <td className="px-4 py-3 text-right text-[12px] text-base-content/50">
                                            {new Date(sale.soldAt).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                            })}
                                        </td>
                                        <td className="px-2 py-3 text-right">
                                            <button
                                                type="button"
                                                onClick={() => handleUndoSale(sale)}
                                                className="p-2 text-base-content/35 transition-colors hover:text-error"
                                                aria-label={`Undo sale of ${sale.productName}`}
                                            >
                                                <FaTrash className="text-[12px]" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="border border-dashed border-base-300 px-5 py-8 text-center text-sm text-base-content/50">
                        No sales recorded yet. Record one above after an order comes in on
                        WhatsApp.
                    </p>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
