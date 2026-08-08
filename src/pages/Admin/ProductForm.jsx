import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa6';
import {
    createProduct,
    updateProduct,
    fetchProduct,
    fetchCategories,
} from '../../api/products.api';
import Loader from '../../components/Loader';
import UseToast from '../../Hooks/UseToast';
import { alertError } from '../../utils/alerts';

// Defined at module scope — a component created inside render is a new type on
// every pass, which remounts it and loses focus.
const FieldError = ({ error }) =>
    error ? (
        <p role="alert" className="mt-2 text-[12px] text-error">
            {error.message}
        </p>
    ) : null;

const ProductForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { notify } = UseToast();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formError, setFormError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            name: '',
            brand: '',
            category: '',
            price: '',
            oldPrice: '',
            stock: '',
            image: '',
            description: '',
            specs: '',
        },
    });

    // Live preview of whatever URL is currently typed.
    const imageUrl = watch('image');

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const list = await fetchCategories();
                if (!cancelled) setCategories(list);

                if (isEdit) {
                    const product = await fetchProduct(id);
                    if (cancelled) return;

                    // reset() populates the whole form at once, which also
                    // clears any dirty state from a previous edit.
                    reset({
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
            } catch (error) {
                if (!cancelled) setFormError(error.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [id, isEdit, reset]);

    const onSubmit = async (values) => {
        setFormError('');

        // The server validates all of this again — this is only for faster
        // feedback, never the authority.
        const payload = {
            name: values.name.trim(),
            brand: values.brand.trim(),
            category: values.category,
            description: values.description.trim(),
            image: values.image.trim(),
            price: Number(values.price),
            oldPrice: values.oldPrice === '' ? null : Number(values.oldPrice),
            stock: Number(values.stock),
            specs: values.specs
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
        } catch (error) {
            // The API names the offending field, so attach the message to that
            // input rather than only showing a banner.
            if (error.field) {
                setError(error.field, { type: 'server', message: error.message });
            } else {
                alertError('Could not save', error.message);
            }
            setFormError(error.message);
        }
    };

    if (loading) return <Loader fullScreen />;

    const fieldClass = (invalid) =>
        `w-full border bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary ${
            invalid ? 'border-error' : 'border-base-300'
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
                    {isEdit ? 'Edit product' : 'Add a product'}
                </h1>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="eyebrow mb-2 block">
                            Product name
                        </label>
                        <input
                            id="name"
                            placeholder="UltraThin OLED 65&quot;"
                            aria-invalid={Boolean(errors.name)}
                            className={fieldClass(errors.name)}
                            {...register('name', {
                                required: 'Enter a product name.',
                                maxLength: { value: 400, message: 'That name is too long.' },
                            })}
                        />
                        <FieldError error={errors.name} />
                    </div>

                    <div>
                        <label htmlFor="brand" className="eyebrow mb-2 block">
                            Brand
                        </label>
                        <input
                            id="brand"
                            placeholder="Samsung"
                            aria-invalid={Boolean(errors.brand)}
                            className={fieldClass(errors.brand)}
                            {...register('brand', { required: 'Enter a brand.' })}
                        />
                        <FieldError error={errors.brand} />
                    </div>
                </div>

                <div>
                    <label htmlFor="category" className="eyebrow mb-2 block">
                        Category
                    </label>
                    <select
                        id="category"
                        aria-invalid={Boolean(errors.category)}
                        className={fieldClass(errors.category)}
                        {...register('category', { required: 'Choose a category.' })}
                    >
                        <option value="">Choose a category…</option>
                        {categories.map((category) => (
                            <option key={category.slug} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <FieldError error={errors.category} />
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
                            placeholder="89999"
                            aria-invalid={Boolean(errors.price)}
                            className={fieldClass(errors.price)}
                            {...register('price', {
                                required: 'Enter a price.',
                                min: { value: 1, message: 'Price must be at least ৳1.' },
                            })}
                        />
                        <FieldError error={errors.price} />
                    </div>

                    <div>
                        <label htmlFor="oldPrice" className="eyebrow mb-2 block">
                            Was (optional)
                        </label>
                        <input
                            id="oldPrice"
                            type="number"
                            min="1"
                            placeholder="95000"
                            aria-invalid={Boolean(errors.oldPrice)}
                            className={fieldClass(errors.oldPrice)}
                            {...register('oldPrice', {
                                // Cross-field rule: a strike-through price that
                                // is not higher would show a negative discount.
                                validate: (value, values) =>
                                    value === '' ||
                                    Number(value) > Number(values.price) ||
                                    'Must be higher than the price.',
                            })}
                        />
                        <FieldError error={errors.oldPrice} />
                    </div>

                    <div>
                        <label htmlFor="stock" className="eyebrow mb-2 block">
                            Stock
                        </label>
                        <input
                            id="stock"
                            type="number"
                            min="0"
                            placeholder="12"
                            aria-invalid={Boolean(errors.stock)}
                            className={fieldClass(errors.stock)}
                            {...register('stock', {
                                required: 'Enter a stock count.',
                                min: { value: 0, message: 'Stock cannot be negative.' },
                            })}
                        />
                        <FieldError error={errors.stock} />
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className="eyebrow mb-2 block">
                        Image URL
                    </label>
                    <input
                        id="image"
                        type="url"
                        placeholder="https://…"
                        aria-invalid={Boolean(errors.image)}
                        className={fieldClass(errors.image)}
                        {...register('image', {
                            required: 'Enter an image URL.',
                            pattern: {
                                value: /^https?:\/\/.+/i,
                                message: 'Must start with http:// or https://',
                            },
                        })}
                    />
                    <FieldError error={errors.image} />
                    {imageUrl && !errors.image && (
                        <img
                            src={imageUrl}
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
                        placeholder="5G, 256GB, 120Hz"
                        className={fieldClass(false)}
                        {...register('specs')}
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
                        placeholder="What makes this product worth buying?"
                        aria-invalid={Boolean(errors.description)}
                        className={`${fieldClass(errors.description)} resize-y`}
                        {...register('description', {
                            required: 'Write a short description.',
                            minLength: { value: 10, message: 'Add a little more detail.' },
                        })}
                    />
                    <FieldError error={errors.description} />
                </div>

                {formError && (
                    <p
                        role="alert"
                        className="border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-error"
                    >
                        {formError}
                    </p>
                )}

                <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={isSubmitting} className="btn-shop">
                        {isSubmitting ? 'Saving…' : isEdit ? 'Save changes' : 'Add product'}
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
