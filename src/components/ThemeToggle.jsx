import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa6';
import UseTheme from '../Hooks/UseTheme';

const ThemeToggle = ({ className = '' }) => {
    const { isDark, toggleTheme } = UseTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 text-base transition-opacity hover:opacity-60 ${className}`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
            {isDark ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default ThemeToggle;
