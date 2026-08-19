import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa6';
import {
    createProduct,
    updateProduct,
    fetchProduct,
    fetchCategories,
} from '../../api/products.api';
import Loader from '../../components/Loader';
import ImageUploader from '../../components/ImageUploader';
import UseToast from '../../Hooks/UseToast';
import UseCatalogue from '../../Hooks/UseCatalogue';
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
    const { reload } = UseCatalogue();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formError, setFormError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        control,
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
            variants: '',
            customFields: [],
        },
    });

    // Owner-defined detail rows, added and removed as a group.
    const { fields, append, remove } = useFieldArray({ control, name: 'customFields' });

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
                        // A null price is a real state ("price on request"),
                        // so it maps to an empty field rather than a zero.
                        price: product.price == null ? '' : String(product.price),
                        oldPrice: product.oldPrice ? String(product.oldPrice) : '',
                        stock: String(product.stock ?? ''),
                        image: product.image ?? '',
                        description: product.description ?? '',
                        specs: (product.specs ?? []).join(', '),
                        variants: (product.variants ?? []).join(', '),
                        customFields: product.customFields ?? [],
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

        const toList = (text) =>
            text
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean);

        // The server validates all of this again — this is only for faster
        // feedback, never the authority.
        const payload = {
            name: values.name.trim(),
            brand: values.brand.trim(),
            category: values.category,
            description: values.description.trim(),
            image: values.image.trim(),
            // Empty means "price on request", which the storefront renders as
            // a WhatsApp prompt rather than an amount.
            price: values.price === '' ? null : Number(values.price),
            oldPrice: values.oldPrice === '' ? null : Number(values.oldPrice),
            stock: Number(values.stock),
            specs: toList(values.specs),
            variants: toList(values.variants),
            customFields: (values.customFields ?? []).filter(
                (field) => field.label?.trim() && field.value?.trim(),
            ),
        };

        try {
            if (isEdit) {
                await updateProduct(id, payload);
                notify(`${payload.name} updated`);
            } else {
                await createProduct(payload);
                notify(`${payload.name} added to the catalogue`);
            }

            // Refresh the shared catalogue so the storefront shows the change
            // straight away rather than after a reload.
            reload();
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
                            placeholder="NIVEA Smooth Sensation Body Lotion"
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
                            placeholder="NIVEA"
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
                    {categories.length === 0 && (
                        <p className="mt-2 text-[12px] text-warning">
                            No categories yet —{' '}
                            <Link to="/admin/categories" className="underline">
                                create one first
                            </Link>
                            .
                        </p>
                    )}
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
                            placeholder="950"
                            aria-invalid={Boolean(errors.price)}
                            className={fieldClass(errors.price)}
                            {...register('price', {
                                min: { value: 1, message: 'Price must be at least ৳1.' },
                            })}
                        />
                        <FieldError error={errors.price} />
                        {/* Leaving it blank is a deliberate, supported state. */}
                        <p className="mt-2 text-[11px] leading-relaxed text-base-content/45">
                            Leave blank for “Price on request”.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="oldPrice" className="eyebrow mb-2 block">
                            Was (optional)
                        </label>
                        <input
                            id="oldPrice"
                            type="number"
                            min="1"
                            placeholder="1100"
                            aria-invalid={Boolean(errors.oldPrice)}
                            className={fieldClass(errors.oldPrice)}
                            {...register('oldPrice', {
                                // Cross-field rule: a strike-through price that
                                // is not higher would show a negative discount.
                                validate: (value, values) =>
                                    value === '' ||
                                    values.price === '' ||
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
                    <span className="eyebrow mb-2 block">Product photo</span>
                    {/* Controller because the uploader is not a native input —
                        it reports a URL after the file has been stored. */}
                    <Controller
                        name="image"
                        control={control}
                        rules={{ required: 'Add a product photo.' }}
                        render={({ field }) => (
                            <ImageUploader
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.image?.message}
                            />
                        )}
                    />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="specs" className="eyebrow mb-2 block">
                            Highlights
                        </label>
                        <input
                            id="specs"
                            placeholder="48h Moisture, Non-Greasy"
                            className={fieldClass(false)}
                            {...register('specs')}
                        />
                        <p className="mt-2 text-[12px] text-base-content/45">
                            Separate with commas.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="variants" className="eyebrow mb-2 block">
                            Variants
                        </label>
                        <input
                            id="variants"
                            placeholder="500ml, 300ml"
                            className={fieldClass(false)}
                            {...register('variants')}
                        />
                        <p className="mt-2 text-[12px] text-base-content/45">
                            Sizes or scents. Separate with commas.
                        </p>
                    </div>
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

                {/* Anything the shop wants to state about a product that does
                    not fit a fixed field. */}
                <fieldset className="border-t border-base-300 pt-6">
                    <legend className="eyebrow mb-1">Extra details</legend>
                    <p className="mb-4 text-[12px] text-base-content/45">
                        Add your own rows — origin, weight, expiry, anything customers ask about.
                    </p>

                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <input
                                    placeholder="Label (e.g. Origin)"
                                    className={`${fieldClass(false)} sm:w-48`}
                                    {...register(`customFields.${index}.label`)}
                                />
                                <input
                                    placeholder="Value (e.g. Malaysia)"
                                    className={fieldClass(false)}
                                    {...register(`customFields.${index}.value`)}
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="shrink-0 border border-base-300 px-3 text-sm text-base-content/45 transition-colors hover:border-error hover:text-error"
                                    aria-label={`Remove detail row ${index + 1}`}
                                >
                                    <FaTrash className="text-[12px]" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => append({ label: '', value: '' })}
                        disabled={fields.length >= 20}
                        className="mt-3 inline-flex items-center gap-2 border border-base-300 px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors hover:border-base-content/40 disabled:opacity-40"
                    >
                        <FaPlus className="text-[10px]" aria-hidden="true" />
                        Add a detail
                    </button>
                </fieldset>

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
