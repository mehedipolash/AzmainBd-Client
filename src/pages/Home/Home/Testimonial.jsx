import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa6';

// Replaced by real reviews from the API later; shape kept identical.
const REVIEW = {
    quote: 'I stumbled upon this store while searching for a replacement laptop and ended up buying three things. Delivery was next-day, the warranty paperwork was already in the box, and support actually picked up the phone.',
    author: 'Kevin Smith',
    role: 'Verified buyer',
    rating: 5,
};

const Testimonial = () => {
    return (
        <section className="bg-base-200">
            <div className="container-px section-y">
                <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
                    <FaQuoteLeft
                        className="mx-auto mb-6 text-2xl text-base-content/20"
                        aria-hidden="true"
                    />

                    <blockquote className="font-display text-xl leading-relaxed font-normal italic sm:text-2xl">
                        “{REVIEW.quote}”
                    </blockquote>

                    <div
                        className="mt-7 flex justify-center gap-1"
                        aria-label={`Rated ${REVIEW.rating} out of 5`}
                    >
                        {Array.from({ length: REVIEW.rating }, (_, index) => (
                            <FaStar key={index} className="text-xs text-warning" aria-hidden="true" />
                        ))}
                    </div>

                    <p className="mt-4 text-sm font-medium">{REVIEW.author}</p>
                    <p className="mt-1 text-[11px] tracking-[0.16em] text-base-content/45 uppercase">
                        {REVIEW.role}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
