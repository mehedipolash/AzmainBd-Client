import React from 'react';
import { FaWhatsapp, FaTruckFast, FaShieldHalved, FaStore } from 'react-icons/fa6';
import UseInView from '../../../Hooks/UseInView';

// Ordered as the customer actually experiences them: message, confirm, receive,
// and the showroom behind it all. The connecting line encodes that sequence, so
// the animation describes something true rather than decorating four tiles.
//
// Every claim here has to be one the shop can keep. There is no checkout and no
// courier tracking integration, so the earlier "SSLCommerz" and "live order
// tracking" tiles described a system that does not exist.
const BENEFITS = [
    { icon: FaWhatsapp, title: 'Order on WhatsApp', body: 'Message us — we reply the same day.' },
    { icon: FaShieldHalved, title: '100% Genuine', body: 'Imported direct, never a copy.' },
    { icon: FaTruckFast, title: 'Nationwide Delivery', body: 'Free on orders over ৳ 5,000.' },
    { icon: FaStore, title: 'Visit the Showroom', body: 'Jabbar Tower, Gulshan-1, Dhaka.' },
];

// One step every 260ms, after a short beat for the line to start drawing.
const STEP_MS = 260;
const LEAD_MS = 180;

const Benefits = () => {
    const [ref, inView] = UseInView({ threshold: 0.3 });

    return (
        <section ref={ref} className="border-t border-base-300 bg-base-200/40">
            <div className="container-px py-14 sm:py-16 lg:py-20">
                <div className="relative">
                    {/* Rail the steps sit on. Drawn only on the desktop row,
                        where the four items form a single horizontal line. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-7 right-0 left-0 hidden lg:block"
                    >
                        {/* Inset by an eighth on each side so the rail starts and
                            ends at the first and last icon, not the grid edge. */}
                        <div className="mx-[12.5%] h-px bg-base-300">
                            <div
                                className="h-px origin-left bg-primary/45 transition-transform duration-1400 ease-out"
                                style={{
                                    transform: `scaleX(${inView ? 1 : 0})`,
                                    transitionDelay: `${LEAD_MS}ms`,
                                }}
                            />
                        </div>

                        {/* A pulse travels the rail once it is drawn, so the
                            section reads as live rather than static. */}
                        {inView && (
                            <div className="mx-[12.5%] -mt-px h-px overflow-hidden motion-reduce:hidden">
                                <span className="block size-full animate-[rail-pulse_3.2s_ease-in-out_1.6s_infinite] bg-linear-to-r from-transparent via-primary to-transparent opacity-70" />
                            </div>
                        )}
                    </div>

                    <ol className="relative grid grid-cols-2 gap-y-12 gap-x-6 lg:grid-cols-4">
                        {BENEFITS.map((benefit, index) => {
                            const Icon = benefit.icon;
                            const delay = LEAD_MS + index * STEP_MS;

                            return (
                                <li
                                    key={benefit.title}
                                    className="group text-center transition-all duration-500 ease-out motion-reduce:transition-none"
                                    style={{
                                        opacity: inView ? 1 : 0,
                                        transform: inView ? 'translateY(0)' : 'translateY(14px)',
                                        transitionDelay: `${delay}ms`,
                                    }}
                                >
                                    <span className="relative mx-auto mb-5 flex size-14 items-center justify-center">
                                        {/* Halo ripples outward as the step lands. */}
                                        {inView && (
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 rounded-full bg-primary/20 motion-safe:animate-[halo_2.4s_ease-out_infinite] motion-reduce:hidden"
                                                style={{ animationDelay: `${delay + 260}ms` }}
                                            />
                                        )}

                                        <span className="relative flex size-14 items-center justify-center rounded-full border border-base-300 bg-base-100 transition-transform duration-300 group-hover:scale-110">
                                            <Icon
                                                className="text-lg text-primary"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </span>

                                    <h3 className="font-display text-base font-semibold">
                                        {benefit.title}
                                    </h3>
                                    <p className="mx-auto mt-1.5 max-w-[22ch] text-[13px] text-base-content/55">
                                        {benefit.body}
                                    </p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
