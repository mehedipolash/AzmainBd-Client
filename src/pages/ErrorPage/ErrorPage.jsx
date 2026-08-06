import React from 'react';
import { Link, useRouteError } from 'react-router';

const ErrorPage = () => {
    const error = useRouteError();
    const status = error?.status ?? 404;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <p className="text-6xl font-bold text-primary">{status}</p>
            <h1 className="mt-4 text-2xl font-bold">
                {status === 404 ? 'Page not found' : 'Something went wrong'}
            </h1>
            <p className="mt-3 max-w-sm text-sm text-base-content/60">
                {status === 404
                    ? 'The page you are looking for does not exist or has been moved.'
                    : 'An unexpected error occurred. Please try again.'}
            </p>
            <Link to="/" className="btn btn-primary mt-8">
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;
