import React from 'react';
import { FiSend } from 'react-icons/fi';

const NewsletterCta = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        // Wired to the newsletter endpoint once the backend exists.
    };

    return (
        <section className="container-px pb-14 sm:pb-16 lg:pb-24">
            <div className="brand-gradient relative overflow-hidden rounded-box px-6 py-12 text-center sm:px-10 sm:py-16">
                {/* Dark scrim keeps the copy readable on the light end of the
                    gradient in both themes. */}
                <div aria-hidden="true" className="absolute inset-0 bg-neutral/45" />

                <div className="relative mx-auto max-w-xl">
                    <h2 className="text-2xl font-extrabold text-neutral-content sm:text-3xl lg:text-4xl">
                        Never miss a deal
                    </h2>
                    <p className="mt-3 text-sm text-neutral-content/85 sm:text-base">
                        Get early access to launches, price drops and exclusive EMI offers.
                    </p>

                    <form
                        onSubmit={handleSubscribe}
                        className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            aria-label="Email address"
                            className="input h-12 w-full rounded-full border-0 bg-base-100 text-base-content"
                        />
                        <button
                            type="submit"
                            className="btn h-12 shrink-0 rounded-full border-0 bg-neutral px-7 text-neutral-content hover:bg-neutral/85"
                        >
                            <FiSend />
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewsletterCta;
