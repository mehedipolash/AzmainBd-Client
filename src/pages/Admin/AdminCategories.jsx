import React, { useCallback, useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { fetchCategories, createCategory, deleteCategory } from '../../api/products.api';
import Loader from '../../components/Loader';
import UseToast from '../../Hooks/UseToast';
import { confirmAction, alertError } from '../../utils/alerts';
import ImageUploader from '../../components/ImageUploader';
import { resolveImageUrl } from '../../utils/imageUrl';

const AdminCategories = () => {
    const { notify } = UseToast();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ name: '', image: '' });

    const load = useCallback(async () => {
        try {
            setItems(await fetchCategories());
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Deferred so the first state update lands after the effect body
        // rather than synchronously inside it.
        const timer = setTimeout(load, 0);
        return () => clearTimeout(timer);
    }, [load]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            await createCategory({ name: form.name.trim(), image: form.image.trim() });
            notify(`${form.name} added`);
            setForm({ name: '', image: '' });
            load();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (category) => {
        const confirmed = await confirmAction({
            title: 'Delete category?',
            text: `"${category.name}" will be removed. Products using it must be moved first.`,
            confirmLabel: 'Delete',
            danger: true,
        });

        if (!confirmed) return;

        try {
            await deleteCategory(category._id);
            notify(`${category.name} deleted`);
            load();
        } catch (err) {
            // The server refuses while products still reference the category —
            // surface that reason rather than a generic failure.
            alertError('Could not delete', err.message);
        }
    };

    const fieldClass =
        'w-full border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary';

    return (
        <div className="p-5 sm:p-8 lg:p-10">
            <header className="mb-8">
                <p className="eyebrow mb-2">Catalogue</p>
                <h1 className="font-display text-3xl font-semibold">Categories</h1>
            </header>

            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="overflow-x-auto border border-base-300 bg-base-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-base-300 bg-base-200/60 text-left">
                                        {['Category', 'Slug', 'In stock', ''].map((heading) => (
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
                                    {items.map((category) => (
                                        <tr
                                            key={category._id}
                                            className="border-b border-base-300 last:border-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={resolveImageUrl(category.image)}
                                                        alt=""
                                                        loading="lazy"
                                                        className="size-10 shrink-0 border border-base-300 bg-white object-contain"
                                                    />
                                                    <span className="font-medium">
                                                        {category.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-mono text-[12px] text-base-content/50">
                                                {category.slug}
                                            </td>
                                            <td className="px-4 py-3 tabular-nums">
                                                {category.inStockCount}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(category)}
                                                    className="p-2 text-xs text-base-content/50 transition-colors hover:text-error"
                                                    aria-label={`Delete ${category.name}`}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <aside>
                    <form
                        onSubmit={handleCreate}
                        className="space-y-4 border border-base-300 bg-base-100 p-5"
                    >
                        <h2 className="font-display text-lg font-semibold">Add a category</h2>

                        <div>
                            <label htmlFor="cat-name" className="eyebrow mb-2 block">
                                Name
                            </label>
                            <input
                                id="cat-name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                placeholder="Wearables"
                                className={fieldClass}
                            />
                        </div>

                        <div>
                            <span className="eyebrow mb-2 block">Category image</span>
                            <ImageUploader
                                value={form.image}
                                onChange={(image) => setForm({ ...form, image })}
                            />
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="border-l-2 border-error bg-error/8 px-3 py-2 text-[13px] text-error"
                            >
                                {error}
                            </p>
                        )}

                        <button type="submit" disabled={saving} className="btn-shop w-full">
                            <FaPlus className="text-[11px]" />
                            {saving ? 'Adding…' : 'Add category'}
                        </button>
                    </form>
                </aside>
            </div>
        </div>
    );
};

export default AdminCategories;
