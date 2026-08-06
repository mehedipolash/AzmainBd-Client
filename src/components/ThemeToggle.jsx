import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import UseTheme from '../Hooks/UseTheme';

const ThemeToggle = ({ className = '' }) => {
    const { isDark, toggleTheme } = UseTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`btn btn-ghost btn-circle btn-sm ${className}`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
            {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
        </button>
    );
};

export default ThemeToggle;
