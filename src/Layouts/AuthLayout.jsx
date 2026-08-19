import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import LottieBox from '../components/LottieBox';
import { SITE_NAME } from '../utils/constants';
import loginAnimation from '../assets/lottie-files/login.json';
import registerAnimation from '../assets/lottie-files/register.json';

const AuthLayout = () => {
    const { pathname } = useLocation();

    // Register gets its own animation; every other auth screen shares the
    // login one.
    const animation = pathname.startsWith('/register') ? registerAnimation : loginAnimation;

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

            {/* Decorative panel — hidden on small screens, where the form
                already carries the animation inline. */}
            <div className="relative hidden flex-col justify-center bg-brand-surface px-12 py-16 lg:flex">
                <LottieBox animationData={animation} className="mx-auto w-full max-w-md" />

                <div className="mt-10">
                    <blockquote className="font-display text-3xl leading-snug font-semibold text-white">
                        Genuine global brands, sealed and sourced direct.
                    </blockquote>
                    <p className="mt-4 max-w-sm text-sm text-white/70">
                        Serving customers across Bangladesh from our Gulshan showroom.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
