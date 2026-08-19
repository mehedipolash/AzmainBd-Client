import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCartPlus } from 'react-icons/fa6';
import { recordSale } from '../../api/products.api';
import UseToast from '../../Hooks/UseToast';
import { alertError } from '../../utils/alerts';
import { formatCurrency, hasPrice } from '../../utils/formatCurrency';

/* ---------------------------------------------------------------------------
   Record a WhatsApp sale.

   Selling happens in chat, so this is how the shop's stock stays truthful.
   Submitting decrements stock on the server in the same atomic operation that
   writes the sale, which is why there is no separate "edit stock" control that
   could drift out of step with the sales history.
--------------------------------------------------------------------------- */

const RecordSale = ({ products, onRecorded }) => {
    const { notify } = UseToast();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onTouched',
        defaultValues: { productId: '', quantity: 1, unitPrice: '', customerName: '', note: '' },
    });

    const selectedId = watch('productId');
    const selected = products.find((product) => product._id === selectedId);

    // Only items with stock can be sold, so the list never offers something
    // that would be rejected by the server anyway.
    const sellable = products.filter((product) => product.stock > 0);

    const onSubmit = async (values) => {
        try {
            const { product } = await recordSale({
                productId: values.productId,
                quantity: Number(values.quantity),
                unitPrice: values.unitPrice === '' ? null : Number(values.unitPrice),
                customerName: values.customerName.trim(),
                note: values.note.trim(),
            });

            notify(`Sale recorded — ${product.name} now has ${product.stock} in stock`);
            reset();
            onRecorded();
        } catch (error) {
            if (error.field) {
                setError(error.field, { type: 'server', message: error.message });
            } else {
                alertError('Could not record that sale', error.message);
            }
        }
    };

    const fieldClass = (invalid) =>
        `w-full border bg-base-100 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary ${
            invalid ? 'border-error' : 'border-base-300'
        }`;

    return (
        <section className="border border-base-300 bg-base-100">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
                <span className="flex items-center gap-3">
                    <FaCartPlus className="text-lg text-primary" aria-hidden="true" />
                    <span>
                        <span className="block font-display text-lg font-semibold">
                            Record a sale
                        </span>
                        <span className="block text-[12px] text-base-content/50">
                            Sold something on WhatsApp? Log it here to keep stock correct.
                        </span>
                    </span>
                </span>
                <span className="text-[11px] tracking-[0.14em] text-base-content/45 uppercase">
                    {open ? 'Close' : 'Open'}
                </span>
            </button>

            {open && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border-t border-base-300 p-5"
                    noValidate
                >
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <label htmlFor="sale-product" className="eyebrow mb-2 block">
                                Product
                            </label>
                            <select
                                id="sale-product"
                                aria-invalid={Boolean(errors.productId)}
                                className={fieldClass(errors.productId)}
                                {...register('productId', { required: 'Choose a product.' })}
                            >
                                <option value="">Choose a product…</option>
                                {sellable.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.name} ({product.stock} in stock)
                                    </option>
                                ))}
                            </select>
                            {errors.productId && (
                                <p role="alert" className="mt-2 text-[12px] text-error">
                                    {errors.productId.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="sale-quantity" className="eyebrow mb-2 block">
                                Quantity
                            </label>
                            <input
                                id="sale-quantity"
                                type="number"
                                min="1"
                                max={selected?.stock ?? undefined}
                                aria-invalid={Boolean(errors.quantity)}
                                className={fieldClass(errors.quantity)}
                                {...register('quantity', {
                                    required: 'How many?',
                                    min: { value: 1, message: 'At least 1.' },
                                    // The server enforces this atomically; this
                                    // is only to catch it before the round trip.
                                    validate: (value) =>
                                        !selected ||
                                        Number(value) <= selected.stock ||
                                        `Only ${selected.stock} in stock.`,
                                })}
                            />
                            {errors.quantity && (
                                <p role="alert" className="mt-2 text-[12px] text-error">
                                    {errors.quantity.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="sale-price" className="eyebrow mb-2 block">
                                Unit price (৳)
                            </label>
                            <input
                                id="sale-price"
                                type="number"
                                min="0"
                                placeholder={
                                    selected && hasPrice(selected)
                                        ? String(selected.price)
                                        : 'Agreed price'
                                }
                                className={fieldClass(errors.unitPrice)}
                                {...register('unitPrice')}
                            />
                            <p className="mt-2 text-[11px] text-base-content/45">
                                {selected && hasPrice(selected)
                                    ? `Blank uses ${formatCurrency(selected.price)}`
                                    : 'This item has no set price — enter what was agreed.'}
                            </p>
                        </div>

                        <div className="lg:col-span-2">
                            <label htmlFor="sale-customer" className="eyebrow mb-2 block">
                                Customer (optional)
                            </label>
                            <input
                                id="sale-customer"
                                placeholder="Name or phone number"
                                className={fieldClass(false)}
                                {...register('customerName')}
                            />
                        </div>

                        <div className="lg:col-span-2">
                            <label htmlFor="sale-note" className="eyebrow mb-2 block">
                                Note (optional)
                            </label>
                            <input
                                id="sale-note"
                                placeholder="Delivery area, variant sold…"
                                className={fieldClass(false)}
                                {...register('note')}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-shop mt-5">
                        {isSubmitting ? 'Recording…' : 'Record sale & update stock'}
                    </button>
                </form>
            )}
        </section>
    );
};

export default RecordSale;
