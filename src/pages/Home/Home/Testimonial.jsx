import React from 'react';
import { FaWhatsapp, FaComments, FaBoxOpen, FaTruckFast } from 'react-icons/fa6';
import { buildWhatsAppLink } from '../../../utils/business';
import OrderButton from '../../../components/OrderButton';

/* ---------------------------------------------------------------------------
   This slot used to hold a five-star testimonial from "Kevin Smith, verified
   buyer" praising a laptop he had bought. Every part of that was invented: the
   customer, the rating, the purchase, and the product category. A fabricated
   review attributed to a named "verified buyer" is not decoration — it is a
   false statement about a real business, and this shop has no review system
   that could ever make it true.

   What replaces it is something the shop can stand behind: how ordering here
   actually works. Orders come in over WhatsApp, so the useful thing to tell a
   first-time visitor is what happens after they send that message.
--------------------------------------------------------------------------- */

const STEPS = [
    {
        icon: FaWhatsapp,
        title: 'Send us a message',
        body: 'Tap any product to open WhatsApp with its name and price already written.',
    },
    {
        icon: FaComments,
        title: 'We confirm it',
        body: 'We check the stock, confirm the total with delivery, and answer anything you ask.',
    },
    {
        icon: FaBoxOpen,
        title: 'We pack it sealed',
        body: 'Your order is packed the same day from our Gulshan-1 showroom.',
    },
    {
        icon: FaTruckFast,
        title: 'It reaches you',
        body: 'Next day inside Dhaka, two to four days anywhere else in Bangladesh.',
    },
];

const Testimonial = () => (
    <section className="bg-base-200">
        <div className="container-px section-y">
            <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
                <p className="eyebrow mb-3">How it works</p>
                <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                    Ordering takes one message
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-base-content/60">
                    There is no checkout to fill in. You message us, we confirm, and it ships —
                    the same way you would order from a shop you already know.
                </p>
            </div>

            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {STEPS.map((step, index) => {
                    const Icon = step.icon;

                    return (
                        <li
                            key={step.title}
                            className="relative border border-base-300 bg-base-100 p-6"
                            data-aos="fade-up"
                            data-aos-delay={index * 90}
                        >
                            {/* The number carries the sequence; the icon only
                                makes each step recognisable at a glance. */}
                            <span
                                aria-hidden="true"
                                className="font-display absolute top-4 right-5 text-3xl font-semibold text-base-content/8"
                            >
                                {index + 1}
                            </span>

                            <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                                <Icon className="text-base text-primary" aria-hidden="true" />
                            </span>

                            <h3 className="font-display mt-5 text-lg font-semibold">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                                {step.body}
                            </p>
                        </li>
                    );
                })}
            </ol>

            <div className="mt-10 text-center">
                {/* Gated like every other order route on the site — signed-out
                    visitors are sent to sign in rather than to WhatsApp. */}
                <OrderButton
                    href={buildWhatsAppLink('Hello Azmain BD, I would like to place an order.')}
                    signedOutLabel="Sign in to order"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-8 py-3.5 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90"
                >
                    <FaWhatsapp className="text-base" aria-hidden="true" />
                    Start an order on WhatsApp
                </OrderButton>
            </div>
        </div>
    </section>
);

export default Testimonial;
