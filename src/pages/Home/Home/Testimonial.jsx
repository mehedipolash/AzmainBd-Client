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

            <div className="relative mt-14">
                {/* The line that makes this a sequence rather than four
                    unrelated boxes. Drawn behind the number discs and only
                    from lg up — below that the cards stack, and vertical order
                    already says "one after another". */}
                <span
                    aria-hidden="true"
                    className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-linear-to-r from-primary/25 via-primary/45 to-brand-gold/50 lg:block"
                />

                <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        // The last step is the outcome — the parcel arriving —
                        // so it carries the palette's celebration colour
                        // instead of the working teal.
                        const isLast = index === STEPS.length - 1;

                        return (
                            <li key={step.title} className="flex flex-col items-center text-center">
                                {/* The number is the primary mark, not a ghost
                                    at 8% opacity. It sits on the line, which is
                                    what ties the four cards into one flow. */}
                                <span
                                    aria-hidden="true"
                                    className={`font-display relative z-10 flex size-14 items-center justify-center rounded-full text-xl font-semibold shadow-lg ${
                                        isLast
                                            ? 'bg-linear-to-br from-brand-gold to-brand-cream text-[#2a1c00] shadow-brand-gold/30'
                                            : 'bg-linear-to-br from-brand-teal to-brand-cyan text-white shadow-brand-cyan/30'
                                    }`}
                                >
                                    {index + 1}
                                </span>

                                <div className="mt-5 flex w-full flex-1 flex-col rounded-xl border border-base-300 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)]">
                                    <h3 className="font-display flex items-center justify-center gap-2 text-[19px] font-semibold">
                                        {/* The icon labels the step rather than
                                            carrying it — inline beside the
                                            title, at the size of the text. */}
                                        <Icon
                                            className={isLast ? 'text-accent' : 'text-primary'}
                                            aria-hidden="true"
                                        />
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-[15px] leading-relaxed text-base-content/65">
                                        {step.body}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>

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
