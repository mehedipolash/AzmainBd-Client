import React from 'react';

const Loader = ({ fullScreen = false }) => {
    return (
        <div
            className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-20'}`}
            role="status"
            aria-live="polite"
        >
            <span className="size-8 animate-spin rounded-full border-2 border-base-300 border-t-base-content" />
            <span className="sr-only">Loading</span>
        </div>
    );
};

export default Loader;
