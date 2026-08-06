import React from 'react';
import { Link } from 'react-router';
import { FaBoxOpen } from 'react-icons/fa6';

const EmptyState = ({ title, message, actionLabel, actionPath }) => {
    return (
        <div className="flex flex-col items-center justify-center border border-base-300 py-20 text-center">
            <FaBoxOpen className="mb-5 text-3xl text-base-content/20" aria-hidden="true" />
            <h3 className="font-display text-xl font-semibold">{title}</h3>
            {message && (
                <p className="mt-2 max-w-sm text-sm text-base-content/55">{message}</p>
            )}
            {actionLabel && actionPath && (
                <Link to={actionPath} className="btn-shop-outline mt-7">
                    {actionLabel}
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
