import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPhone, FaEnvelope, FaLocationDot, FaClock, FaWhatsapp } from 'react-icons/fa6';
import PageHeader from '../../components/PageHeader';
import { alertSuccess } from '../../utils/alerts';
import {
    ADDRESS_LINES,
    EMAIL,
    EMAIL_HREF,
    MAP_URL,
    OPENING_HOURS,
    PHONE_DISPLAY,
    PHONE_HREF,
    buildWhatsAppLink,
} from '../../utils/business';

// WhatsApp leads: it is how the shop actually takes orders, so it is the
// channel a visitor should reach for first.
const CHANNELS = [
    {
        icon: FaWhatsapp,
        label: 'WhatsApp',
        value: PHONE_DISPLAY,
        href: buildWhatsAppLink('Hello Azmain BD, I have a question.'),
        note: 'Fastest way to order — we reply here',
    },
    {
        icon: FaPhone,
        label: 'Call the shop',
        value: PHONE_DISPLAY,
        href: PHONE_HREF,
        note: OPENING_HOURS,
    },
    {
        icon: FaEnvelope,
        label: 'Email',
        value: EMAIL,
        href: EMAIL_HREF,
        note: 'Replies within one working day',
    },
];

// Defined at module scope — a component created inside render is a new type on
// every pass, which remounts it and loses focus.
const FieldError = ({ error }) =>
    error ? (
        <p role="alert" className="mt-2 text-[12px] text-error">
            {error.message}
        </p>
    ) : null;

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'onTouched' });

    /**
     * There is no message endpoint on the server, so rather than pretending a
     * message was sent, the form hands its contents to WhatsApp — the channel
     * the shop actually reads. The fields are still validated here so the
     * message that arrives is complete.
     */
    const onSubmit = async (values) => {
        const message = [
            `Hello Azmain BD,`,
            ``,
            `Name: ${values.name}`,
            `Email: ${values.email}`,
            values.phone ? `Phone: ${values.phone}` : null,
            values.subject ? `Subject: ${values.subject}` : null,
            ``,
            values.message,
        ]
            .filter((line) => line !== null)
            .join('\n');

        window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
        reset();
        alertSuccess('Opening WhatsApp', 'Send the message and we will reply shortly.');
    };

    const fieldClass = (invalid) =>
        `w-full border bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary ${
            invalid ? 'border-error' : 'border-base-300'
        }`;


    return (
        <div>
            <PageHeader
                eyebrow="Contact"
                title="Talk to a human"
                subtitle="Questions about a product, an order, or a warranty claim — we answer all three."
                image="/banners/contact.jpg"
                crumbs={[{ label: 'Home', path: '/' }, { label: 'Contact' }]}
            />

            <section className="container-px section-y">
                <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                    <div>
                        <p className="eyebrow mb-3">Reach us</p>
                        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                            Three ways to get in touch
                        </h2>

                        <ul className="mt-8 space-y-5">
                            {CHANNELS.map((channel) => {
                                const Icon = channel.icon;

                                return (
                                    <li key={channel.label} className="flex gap-4">
                                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary">
                                            <Icon
                                                className="text-base text-primary"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <div>
                                            <p className="text-[11px] tracking-[0.16em] text-base-content/45 uppercase">
                                                {channel.label}
                                            </p>
                                            <a
                                                href={channel.href}
                                                target={
                                                    channel.href.startsWith('http')
                                                        ? '_blank'
                                                        : undefined
                                                }
                                                rel={
                                                    channel.href.startsWith('http')
                                                        ? 'noopener noreferrer'
                                                        : undefined
                                                }
                                                className="mt-1 block font-medium transition-colors hover:text-primary"
                                            >
                                                {channel.value}
                                            </a>
                                            <p className="mt-0.5 text-[12px] text-base-content/50">
                                                {channel.note}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-8 border-t border-base-300 pt-8">
                            <ul className="space-y-4 text-sm text-base-content/65">
                                <li className="flex gap-3">
                                    <FaLocationDot
                                        className="mt-1 shrink-0 text-xs text-primary"
                                        aria-hidden="true"
                                    />
                                    <a
                                        href={MAP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-primary"
                                    >
                                        {ADDRESS_LINES.map((line) => (
                                            <span key={line} className="block">
                                                {line}
                                            </span>
                                        ))}
                                        <span className="block">Bangladesh</span>
                                    </a>
                                </li>
                                <li className="flex gap-3">
                                    <FaClock
                                        className="mt-1 shrink-0 text-xs text-primary"
                                        aria-hidden="true"
                                    />
                                    <span>
                                        Saturday – Thursday, 10am – 8pm
                                        <br />
                                        Friday closed
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border border-base-300 p-6 sm:p-9">
                        <h2 className="font-display text-2xl font-semibold">Send a message</h2>
                        <p className="mt-2 text-sm text-base-content/55">
                            Include your order number if the question is about an existing purchase.
                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-7 space-y-5"
                            noValidate
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="eyebrow mb-2 block">
                                        Your name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Full name"
                                        aria-invalid={Boolean(errors.name)}
                                        className={fieldClass(errors.name)}
                                        {...register('name', { required: 'Enter your name.' })}
                                    />
                                    <FieldError error={errors.name} />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="eyebrow mb-2 block">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="+880"
                                        aria-invalid={Boolean(errors.phone)}
                                        className={fieldClass(errors.phone)}
                                        {...register('phone', {
                                            required: 'Enter a phone number.',
                                            pattern: {
                                                value: /^[+\d][\d\s-]{6,}$/,
                                                message: 'That does not look like a phone number.',
                                            },
                                        })}
                                    />
                                    <FieldError error={errors.phone} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="eyebrow mb-2 block">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    aria-invalid={Boolean(errors.email)}
                                    className={fieldClass(errors.email)}
                                    {...register('email', {
                                        required: 'Enter your email address.',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                            message: 'That does not look like a valid email.',
                                        },
                                    })}
                                />
                                <FieldError error={errors.email} />
                            </div>

                            <div>
                                <label htmlFor="topic" className="eyebrow mb-2 block">
                                    Topic
                                </label>
                                <select
                                    id="topic"
                                    className={fieldClass(false)}
                                    {...register('topic')}
                                >
                                    <option>Product question</option>
                                    <option>Order status</option>
                                    <option>Warranty or repair</option>
                                    <option>Return or exchange</option>
                                    <option>Corporate / bulk order</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="eyebrow mb-2 block">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="How can we help?"
                                    aria-invalid={Boolean(errors.message)}
                                    className={`${fieldClass(errors.message)} resize-y`}
                                    {...register('message', {
                                        required: 'Tell us how we can help.',
                                        minLength: {
                                            value: 10,
                                            message: 'Please add a little more detail.',
                                        },
                                    })}
                                />
                                <FieldError error={errors.message} />
                            </div>

                            <button type="submit" disabled={isSubmitting} className="btn-shop w-full">
                                {isSubmitting ? 'Opening…' : 'Send via WhatsApp'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
