import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaLocationDot, FaClock, FaWhatsapp } from 'react-icons/fa6';
import PageHeader from '../../components/PageHeader';
import UseToast from '../../Hooks/UseToast';

const CHANNELS = [
    {
        icon: FaPhone,
        label: 'Sales hotline',
        value: '+880 1000-000000',
        href: 'tel:+8801000000000',
        note: 'Daily, 9am – 9pm',
    },
    {
        icon: FaWhatsapp,
        label: 'WhatsApp',
        value: '+880 1000-000000',
        href: 'https://wa.me/8801000000000',
        note: 'Fastest for order updates',
    },
    {
        icon: FaEnvelope,
        label: 'Email',
        value: 'support@azmainbd.com',
        href: 'mailto:support@azmainbd.com',
        note: 'Replies within one working day',
    },
];

const Contact = () => {
    const { notify } = UseToast();
    const [sending, setSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);

        // Posts to the backend once it exists; the form already collects and
        // validates everything that endpoint will need.
        setTimeout(() => {
            setSending(false);
            e.target.reset();
            notify('Thanks — we will reply within one working day');
        }, 600);
    };

    const fieldClass =
        'w-full border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition-colors placeholder:text-base-content/30 focus:border-primary';

    return (
        <div>
            <PageHeader
                eyebrow="Contact"
                title="Talk to a human"
                subtitle="Questions about a product, an order, or a warranty claim — we answer all three."
                image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
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
                                    <span>
                                        Showroom: Level 4, Gulshan Avenue
                                        <br />
                                        Dhaka 1212, Bangladesh
                                    </span>
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

                        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="eyebrow mb-2 block">
                                        Your name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                        className={fieldClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="eyebrow mb-2 block">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        autoComplete="tel"
                                        placeholder="+880"
                                        className={fieldClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="eyebrow mb-2 block">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className={fieldClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="topic" className="eyebrow mb-2 block">
                                    Topic
                                </label>
                                <select id="topic" name="topic" className={fieldClass}>
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
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="How can we help?"
                                    className={`${fieldClass} resize-y`}
                                />
                            </div>

                            <button type="submit" disabled={sending} className="btn-shop w-full">
                                {sending ? 'Sending…' : 'Send message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
