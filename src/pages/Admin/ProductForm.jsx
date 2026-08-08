import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa6';
import {
    createProduct,
    updateProduct,
    fetchProduct,
    fetchCategories,
} from '../../api/products.api';
import Loader from '../../components/Loader';
import UseToast from '../../Hooks/UseToast';

const EMPTY = {
    name: '',
    brand: '',
    category: '',
    price: '',
    oldPrice: '',
    stock: '',
    image: '',
    description: '',
    specs: '',
};

const ProductForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { notify } = UseToast();

    const [form, setForm] = useState(EMPTY);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [fieldError, setFieldError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const list = await fetchCategories();
                if (!cancelled) setCategories(list);

                if (isEdit) {
                    const product = await fetchProduct(id);
                    if (cancelled) return;

                    setForm({
                        name: product.name ?? '',
                        brand: product.brand ?? '',
                        category: product.category ?? '',
                        price: String(product.price ?? ''),
                        oldPrice: product.oldPrice ? String(product.oldPrice) : '',
                        stock: String(product.stock ?? ''),
                        image: product.image ?? '',
                        description: product.description ?? '',
                        specs: (product.specs ?? []).join(', '),
                    });
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [id, isEdit]);

    const setField = (field) => (e) => setForm((current) => ({ ...current, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldError('');
        setSaving(true);

        // The server validates all of this again — this is only to give faster
        // feedback, never the authority.
        const payload = {
            name: form.name.trim(),
            brand: form.brand.trim(),
            category: form.category,
            description: form.description.trim(),
            image: form.image.trim(),
            price: Number(form.price),
            oldPrice: form.oldPrice === '' ? null : Number(form.oldPrice),
            stock: Number(form.stock),
            specs: form.specs
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean),
        };

        try {
            if (isEdit) {
                await updateProduct(id, payload);
                notify(`${payload.name} updated`);
            } else {
                await createProduct(payload);
                notify(`${payload.name} added to the catalogue`);
            }
            navigate('/admin/products');
        } catch (err) {
            setError(err.message);
            if (err.field) setFieldError(err.field);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader fullScreen />;

    const fieldClass = (field) =>
        `w-full border bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary ${
            fieldError === field ? 'border-error' : 'border-base-300'
        }`;

    return (
        <div className="p-5 sm:p-8 lg:p-10">
            <Link
                to="/admin/products"
                className="mb-6 inline-flex items-center gap-2 text-[12px] tracking-wide text-base-content/50 uppercase transition-colors hover:text-base-content"
            >
                <FaArrowLeft className="text-[10px]" />
                Back to products
            </Link>

            <header className="mb-8">
                <p className="eyebrow mb-2">{isEdit ? 'Edit' : 'New'}</p>
                <h1 className="font-display text-3xl font-semibold">
                    {isEdit ? form.name || 'Edit product' : 'Add a product'}
                </h1>
            </header>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="eyebrow mb-2 block">
                            Product name
                        </label>
                        <input
                            id="name"
                            value={form.name}
                            onChange={setField('name')}
                            required
                            placeholder="UltraThin OLED 65&quot;"
                            className={fieldClass('name')}
                        />
                    </div>

                    <div>
                        <label htmlFor="brand" className="eyebrow mb-2 block">
                            Brand
                        </label>
                        <input
                            id="brand"
                            value={form.brand}
                            onChange={setField('brand')}
                            required
                            placeholder="Samsung"
                            className={fieldClass('brand')}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="category" className="eyebrow mb-2 block">
                        Category
                    </label>
                    <select
                        id="category"
                        value={form.category}
                        onChange={setField('category')}
                        required
                        className={fieldClass('category')}
                    >
                        <option value="">Choose a category…</option>
                        {categories.map((category) => (
                            <option key={category.slug} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                        <label htmlFor="price" className="eyebrow mb-2 block">
                            Price (৳)
                        </label>
                        <input
                            id="price"
                            type="number"
                            min="1"
                            value={form.price}
                            onChange={setField('price')}
                            required
                            placeholder="89999"
                            className={fieldClass('price')}
                        />
                    </div>

                    <div>
                        <label htmlFor="oldPrice" className="eyebrow mb-2 block">
                            Was (optional)
                        </label>
                        <input
                            id="oldPrice"
                            type="number"
                            min="1"
                            value={form.oldPrice}
                            onChange={setField('oldPrice')}
                            placeholder="95000"
                            className={fieldClass('oldPrice')}
                        />
                    </div>

                    <div>
                        <label htmlFor="stock" className="eyebrow mb-2 block">
                            Stock
                        </label>
                        <input
                            id="stock"
                            type="number"
                            min="0"
                            value={form.stock}
                            onChange={setField('stock')}
                            required
                            placeholder="12"
                            className={fieldClass('stock')}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className="eyebrow mb-2 block">
                        Image URL
                    </label>
                    <input
                        id="image"
                        type="url"
                        value={form.image}
                        onChange={setField('image')}
                        required
                        placeholder="https://…"
                        className={fieldClass('image')}
                    />
                    {form.image && (
                        <img
                            src={form.image}
                            alt=""
                            className="mt-3 size-28 border border-base-300 object-cover"
                        />
                    )}
                </div>

                <div>
                    <label htmlFor="specs" className="eyebrow mb-2 block">
                        Specs
                    </label>
                    <input
                        id="specs"
                        value={form.specs}
                        onChange={setField('specs')}
                        placeholder="5G, 256GB, 120Hz"
                        className={fieldClass('specs')}
                    />
                    <p className="mt-2 text-[12px] text-base-content/45">Separate with commas.</p>
                </div>

                <div>
                    <label htmlFor="description" className="eyebrow mb-2 block">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        value={form.description}
                        onChange={setField('description')}
                        required
                        placeholder="What makes this product worth buying?"
                        className={`${fieldClass('description')} resize-y`}
                    />
                </div>

                {error && (
                    <p
                        role="alert"
                        className="border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error"
                    >
                        {error}
                    </p>
                )}

                <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={saving} className="btn-shop">
                        {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add product'}
                    </button>
                    <Link to="/admin/products" className="btn-shop-outline">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
