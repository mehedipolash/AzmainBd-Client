import React from 'react';
import { Link } from 'react-router';
import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ title, message, actionLabel, actionPath }) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-box border border-dashed border-base-300 py-20 text-center">
            <FiInbox className="mb-4 text-4xl text-base-content/30" aria-hidden="true" />
            <h3 className="text-lg font-semibold">{title}</h3>
            {message && <p className="mt-2 max-w-sm text-sm text-base-content/60">{message}</p>}
            {actionLabel && actionPath && (
                <Link to={actionPath} className="btn btn-primary btn-sm mt-6">
                    {actionLabel}
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
