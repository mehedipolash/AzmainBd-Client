import React from 'react';
import { Link, Outlet } from 'react-router';
import { SITE_NAME } from '../utils/constants';

const AuthLayout = () => {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="flex flex-col justify-center px-5 py-12 sm:px-12">
                <div className="mx-auto w-full max-w-sm">
                    <Link to="/" className="font-display text-2xl font-semibold">
                        {SITE_NAME}
                    </Link>
                    <div className="mt-12">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Decorative panel — hidden on small screens where it adds nothing. */}
            <div className="relative hidden lg:block">
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/50" />

                <div className="absolute right-12 bottom-14 left-12">
                    <blockquote className="font-display text-3xl leading-snug font-semibold text-white">
                        Authorised stock, sealed boxes, real warranties.
                    </blockquote>
                    <p className="mt-4 max-w-sm text-sm text-white/70">
                        Trusted by more than 12,000 customers across Bangladesh.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
