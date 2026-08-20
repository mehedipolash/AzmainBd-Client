import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaPen, FaTrash, FaMagnifyingGlass, FaCheck } from 'react-icons/fa6';
import { fetchProducts, deleteProduct, updateProduct } from '../../api/products.api';
import Loader from '../../components/Loader';
import AdminBanner from '../../components/AdminBanner';
import UseToast from '../../Hooks/UseToast';
import UseCatalogue from '../../Hooks/UseCatalogue';
import { confirmAction, alertError } from '../../utils/alerts';
import { formatCurrency } from '../../utils/formatCurrency';
import { resolveImageUrl } from '../../utils/imageUrl';

const AdminProducts = () => {
    const { notify } = UseToast();
    const { reload: reloadCatalogue } = UseCatalogue();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    // Which row's stock is being edited, and the value being typed. Held as a
    // string so the field can be empty mid-edit without becoming NaN.
    const [editingStock, setEditingStock] = useState(null);
    const [stockDraft, setStockDraft] = useState('');
    const [savingStock, setSavingStock] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchProducts({
                limit: 60,
                search: search.trim() || undefined,
            });
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
        const confirmed = await confirmAction({
            title: 'Delete product?',
            text: `"${product.name}" will be removed permanently. This cannot be undone.`,
            confirmLabel: 'Delete',
            danger: true,
        });

        if (!confirmed) return;

        try {
            await deleteProduct(product._id);
            notify(`${product.name} deleted`);
            load();
            // The storefront holds a cached catalogue; refresh it so the
            // deleted product disappears there too rather than lingering
            // until the next full page load.
            reloadCatalogue();
        } catch (err) {
            alertError('Could not delete', err.message);
        }
    };

    const stockPill = (stock) => {
        if (stock === 0) return <span className="pill-urgent">Sold out</span>;
        if (stock <= 6) return <span className="pill-urgent">{stock} left</span>;
        return <span className="pill-stock">{stock} in stock</span>;
    };

    const beginStockEdit = (product) => {
        setEditingStock(product._id);
        setStockDraft(String(product.stock ?? 0));
    };

    const cancelStockEdit = () => {
        setEditingStock(null);
        setStockDraft('');
    };

    // Saves a corrected stock count. This is a CORRECTION — a delivery, a
    // recount — not a sale. Sales go through Record a sale on the dashboard,
    // which also writes the revenue record; routing a sale through here would
    // move the stock without ever recording that the money came in.
    const saveStock = async (product) => {
        const next = Number(stockDraft);

        if (stockDraft === '' || !Number.isInteger(next) || next < 0) {
            alertError('Invalid stock', 'Enter a whole number of units, 0 or more.');
            return;
        }

        if (next === product.stock) {
            cancelStockEdit();
            return;
        }

        setSavingStock(true);

        try {
            await updateProduct(product._id, { stock: next });

            // Patch the row in place rather than refetching the whole list —
            // a full reload would scroll the owner back to the top after every
            // single count they correct.
            setItems((current) =>
                current.map((item) => (item._id === product._id ? { ...item, stock: next } : item)),
            );

            notify(`${product.name} — stock set to ${next}`);
            reloadCatalogue();
            cancelStockEdit();
        } catch (err) {
            alertError('Could not update stock', err.message);
        } finally {
            setSavingStock(false);
        }
    };

    return (
        <div>
            <AdminBanner
                eyebrow="Catalogue"
                title="Products"
                subtitle="Add, edit or remove anything in the shop. Click a stock badge to correct the count without opening the product."
                action={{ to: '/admin/products/new', label: 'Add product' }}
            />

            <div className="p-5 sm:p-8 lg:p-10">
                <div className="mb-5 flex items-center gap-3 border border-base-300 bg-base-100 px-4 py-2.5">
                    <FaMagnifyingGlass
                        className="text-xs text-base-content/40"
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            // Searching reloads the list, which can replace or
                            // remove the row being edited. Dropping the edit here —
                            // in the event that causes it — is both simpler than
                            // reacting to it in an effect and safer: keeping the
                            // input open over a different product would save a
                            // count against the wrong item.
                            cancelStockEdit();
                        }}
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
                                    {['Product', 'Category', 'Price', 'Stock', ''].map(
                                        (heading) => (
                                            <th
                                                key={heading}
                                                className="px-4 py-3 text-[11px] tracking-[0.14em] whitespace-nowrap text-base-content/50 uppercase"
                                            >
                                                {heading}
                                            </th>
                                        ),
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="border-b border-base-300 last:border-0"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={resolveImageUrl(product.image)}
                                                    alt=""
                                                    loading="lazy"
                                                    className="size-10 shrink-0 border border-base-300 bg-white object-contain"
                                                />
                                                <div className="min-w-0">
                                                    <p className="truncate font-medium">
                                                        {product.name}
                                                    </p>
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
                                        {/* Click the pill to correct the count in
                                        place. Restocking touches many products
                                        at once, and opening the full form for
                                        each one is the slowest possible path. */}
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {editingStock === product._id ? (
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="1"
                                                        autoFocus
                                                        value={stockDraft}
                                                        disabled={savingStock}
                                                        onChange={(e) =>
                                                            setStockDraft(e.target.value)
                                                        }
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                saveStock(product);
                                                            }
                                                            if (e.key === 'Escape')
                                                                cancelStockEdit();
                                                        }}
                                                        aria-label={`Stock for ${product.name}`}
                                                        className="w-20 border border-primary bg-base-100 px-2 py-1.5 text-sm tabular-nums outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => saveStock(product)}
                                                        disabled={savingStock}
                                                        aria-label="Save stock"
                                                        className="p-2 text-xs text-primary transition-opacity hover:opacity-70 disabled:opacity-40"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => beginStockEdit(product)}
                                                    title="Click to correct the stock count"
                                                    className="transition-opacity hover:opacity-70"
                                                >
                                                    {stockPill(product.stock)}
                                                </button>
                                            )}
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
                                                    onClick={() => handleDelete(product)}
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
            </div>
        </div>
    );
};

export default AdminProducts;
