import React from 'react';

const Loader = ({ fullScreen = false }) => {
    return (
        <div
            className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-20'}`}
            role="status"
            aria-live="polite"
        >
            <span className="loading loading-spinner loading-lg text-primary" />
            <span className="sr-only">Loading</span>
        </div>
    );
};

export default Loader;
