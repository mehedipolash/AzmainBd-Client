import React, { useCallback, useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaPen, FaXmark } from 'react-icons/fa6';
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../../api/products.api';
import Loader from '../../components/Loader';
import AdminBanner from '../../components/AdminBanner';
import UseToast from '../../Hooks/UseToast';
import UseCatalogue from '../../Hooks/UseCatalogue';
import { confirmAction, alertError } from '../../utils/alerts';
import ImageUploader from '../../components/ImageUploader';
import { resolveImageUrl } from '../../utils/imageUrl';

const EMPTY = { name: '', image: '' };

const AdminCategories = () => {
    const { notify } = UseToast();
    const { reload: reloadCatalogue } = UseCatalogue();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState(EMPTY);

    // When set, the side panel edits this category instead of creating one.
    const [editingId, setEditingId] = useState(null);

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

    // A category change alters the storefront's navigation and filters, so the
    // shared catalogue is refreshed rather than left stale until a reload.
    const refreshEverything = () => {
        load();
        reloadCatalogue();
    };

    const startEdit = (category) => {
        setEditingId(category._id);
        setForm({ name: category.name, image: category.image ?? '' });
        setError('');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm(EMPTY);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        const payload = { name: form.name.trim(), image: form.image.trim() };

        try {
            if (editingId) {
                await updateCategory(editingId, payload);
                notify(`${payload.name} updated`);
            } else {
                await createCategory(payload);
                notify(`${payload.name} added`);
            }
            cancelEdit();
            refreshEverything();
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
            if (editingId === category._id) cancelEdit();
            refreshEverything();
        } catch (err) {
            // The server refuses while products still reference the category —
            // surface that reason rather than a generic failure.
            alertError('Could not delete', err.message);
        }
    };

    const fieldClass =
        'w-full border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary';

    return (
        <div>
            <AdminBanner
                eyebrow="Catalogue"
                title="Categories"
                subtitle="Categories drive the shop filters and the storefront navigation. Changes appear on the site immediately."
                stats={[{ label: 'Categories', value: items.length }]}
            />

            <div className="p-5 sm:p-8 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
                    <div>
                        {loading ? (
                            <Loader />
                        ) : items.length === 0 ? (
                            <p className="border border-dashed border-base-300 px-5 py-10 text-center text-sm text-base-content/50">
                                No categories yet. Add your first one on the right.
                            </p>
                        ) : (
                            <div className="overflow-x-auto border border-base-300 bg-base-100">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-base-300 bg-base-200/60 text-left">
                                            {['Category', 'Slug', 'In stock', ''].map((heading) => (
                                                <th
                                                    key={heading}
                                                    className="admin-th"
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
                                                className={`border-b border-base-300 last:border-0 ${
                                                    editingId === category._id
                                                        ? 'bg-secondary/40'
                                                        : ''
                                                }`}
                                            >
                                                <td className="admin-td">
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
                                                <td className="admin-td font-mono text-[12px] text-base-content/50">
                                                    {category.slug}
                                                </td>
                                                <td className="admin-td tabular-nums">
                                                    {category.inStockCount}
                                                </td>
                                                <td className="admin-td">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => startEdit(category)}
                                                            className="btn-icon btn-icon-edit"
                                                            aria-label={`Edit ${category.name}`}
                                                        >
                                                            <FaPen />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(category)}
                                                            className="btn-icon btn-icon-delete"
                                                            aria-label={`Delete ${category.name}`}
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

                    <aside>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 border border-base-300 bg-base-100 p-5"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="font-display text-lg font-semibold">
                                    {editingId ? 'Edit category' : 'Add a category'}
                                </h2>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="flex items-center gap-1 text-[11px] tracking-wide text-base-content/50 uppercase hover:text-base-content"
                                    >
                                        <FaXmark className="text-[10px]" />
                                        Cancel
                                    </button>
                                )}
                            </div>

                            <div>
                                <label htmlFor="cat-name" className="eyebrow mb-2 block">
                                    Name
                                </label>
                                <input
                                    id="cat-name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    placeholder="Face Care"
                                    className={fieldClass}
                                />
                                {/* The slug is derived server-side from the name, so
                                renaming a category changes its shop URL. */}
                                {editingId && (
                                    <p className="mt-2 text-[11px] leading-relaxed text-base-content/45">
                                        Renaming changes the category's shop link.
                                    </p>
                                )}
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
                                {!editingId && <FaPlus className="text-[11px]" />}
                                {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add category'}
                            </button>
                        </form>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
