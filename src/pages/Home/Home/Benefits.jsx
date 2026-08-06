import React from 'react';
import { FaLock, FaTruckFast, FaRotateLeft, FaLocationDot } from 'react-icons/fa6';

const BENEFITS = [
    { icon: FaLock, title: 'Secure Payments', body: 'SSLCommerz protected checkout.' },
    { icon: FaTruckFast, title: 'Free Shipping', body: 'On all orders over ৳ 5,000.' },
    { icon: FaRotateLeft, title: 'Easy Returns', body: '7-day no-questions returns.' },
    { icon: FaLocationDot, title: 'Order Tracking', body: 'Live updates until delivery.' },
];

const Benefits = () => {
    return (
        <section className="border-t border-base-300">
            <div className="container-px py-12 sm:py-14">
                <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {BENEFITS.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <li key={benefit.title} className="text-center">
                                <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-secondary">
                                    <Icon className="text-lg text-primary" aria-hidden="true" />
                                </span>
                                <h3 className="font-display text-base font-semibold">
                                    {benefit.title}
                                </h3>
                                <p className="mt-1.5 text-[13px] text-base-content/55">
                                    {benefit.body}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Benefits;
