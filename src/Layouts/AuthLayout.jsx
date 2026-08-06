import React from 'react';
import { Link, Outlet } from 'react-router';
import { SITE_NAME } from '../utils/constants';

const AuthLayout = () => {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="flex flex-col justify-center px-5 py-10 sm:px-12 sm:py-12">
                <div className="mx-auto w-full max-w-sm">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="brand-gradient flex size-9 items-center justify-center rounded-xl text-sm font-black text-white">
                            A
                        </span>
                        <span className="brand-text-gradient text-lg font-extrabold">
                            {SITE_NAME}
                        </span>
                    </Link>
                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Decorative panel — hidden on small screens where it adds nothing. */}
            <div className="brand-gradient relative hidden lg:block">
                <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral/70 via-neutral/25 to-transparent" />
                <div className="absolute right-10 bottom-12 left-10">
                    <h2 className="text-3xl font-extrabold text-neutral-content xl:text-4xl">
                        Premium tech, delivered.
                    </h2>
                    <p className="mt-3 max-w-sm text-sm text-neutral-content/80">
                        Official warranty, EMI facilities and 24/7 support on every order.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
