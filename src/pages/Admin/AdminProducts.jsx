import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaPlus, FaPen, FaTrash, FaMagnifyingGlass } from 'react-icons/fa6';
import { fetchProducts, deleteProduct } from '../../api/products.api';
import Loader from '../../components/Loader';
import UseToast from '../../Hooks/UseToast';
import { formatCurrency } from '../../utils/formatCurrency';

const AdminProducts = () => {
    const { notify } = UseToast();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [confirming, setConfirming] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchProducts({ limit: 60, search: search.trim() || undefined });
            setItems(response.items ?? []);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        // Debounce so typing in the search box does not fire a request per key.
        const timer = setTimeout(load, 300);
        return () => clearTimeout(timer);
    }, [load]);

    const handleDelete = async (product) => {
        try {
            await deleteProduct(product._id);
            notify(`${product.name} deleted`);
            setConfirming(null);
            load();
        } catch (err) {
            notify(err.message, 'warning');
        }
    };

    const stockPill = (stock) => {
        if (stock === 0) return <span className="pill-urgent">Sold out</span>;
        if (stock <= 6) return <span className="pill-urgent">{stock} left</span>;
        return <span className="pill-stock">{stock} in stock</span>;
    };

    return (
        <div className="p-5 sm:p-8 lg:p-10">
            <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="eyebrow mb-2">Catalogue</p>
                    <h1 className="font-display text-3xl font-semibold">Products</h1>
                </div>

                <Link to="/admin/products/new" className="btn-shop">
                    <FaPlus className="text-[11px]" />
                    Add product
                </Link>
            </header>

            <div className="mb-5 flex items-center gap-3 border border-base-300 bg-base-100 px-4 py-2.5">
                <FaMagnifyingGlass className="text-xs text-base-content/40" aria-hidden="true" />
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products…"
                    aria-label="Search products"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/35"
                />
            </div>

            {error && (
                <p className="mb-5 border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error">
                    {error}
                </p>
            )}

            {loading ? (
                <Loader />
            ) : items.length === 0 ? (
                <p className="border border-dashed border-base-300 py-16 text-center text-sm text-base-content/55">
                    No products found.
                </p>
            ) : (
                <div className="overflow-x-auto border border-base-300 bg-base-100">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-base-300 bg-base-200/60 text-left">
                                {['Product', 'Category', 'Price', 'Stock', ''].map((heading) => (
                                    <th
                                        key={heading}
                                        className="px-4 py-3 text-[11px] tracking-[0.14em] whitespace-nowrap text-base-content/50 uppercase"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((product) => (
                                <tr key={product._id} className="border-b border-base-300 last:border-0">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.image}
                                                alt=""
                                                loading="lazy"
                                                className="size-10 shrink-0 border border-base-300 object-cover"
                                            />
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">{product.name}</p>
                                                <p className="truncate text-[12px] text-base-content/45">
                                                    {product.brand}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-base-content/55 capitalize">
                                        {product.category}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap tabular-nums">
                                        {formatCurrency(product.price)}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {stockPill(product.stock)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                to={`/admin/products/${product._id}`}
                                                className="p-2 text-xs text-base-content/50 transition-colors hover:text-primary"
                                                aria-label={`Edit ${product.name}`}
                                            >
                                                <FaPen />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => setConfirming(product)}
                                                className="p-2 text-xs text-base-content/50 transition-colors hover:text-error"
                                                aria-label={`Delete ${product.name}`}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Deleting is irreversible, so it always goes through a confirm. */}
            {confirming && (
                <div className="fixed inset-0 z-90 flex items-center justify-center p-4">
                    <button
                        type="button"
                        aria-hidden="true"
                        tabIndex={-1}
                        onClick={() => setConfirming(null)}
                        className="absolute inset-0 cursor-default bg-ink/60"
                    />
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="relative w-full max-w-sm border border-base-300 bg-base-100 p-6"
                    >
                        <h2 className="font-display text-xl font-semibold">Delete product?</h2>
                        <p className="mt-3 text-sm text-base-content/65">
                            <span className="font-medium text-base-content">{confirming.name}</span>{' '}
                            will be removed permanently. This cannot be undone.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => handleDelete(confirming)}
                                className="flex-1 border border-error bg-error px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-error-content uppercase transition-opacity hover:opacity-85"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirming(null)}
                                className="btn-shop-outline flex-1"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
