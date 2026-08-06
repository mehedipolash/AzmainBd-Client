import React, { useCallback, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { THEMES, THEME_STORAGE_KEY } from '../utils/themes';

// Read once at module load so the first paint already has the right theme.
// Falls back to the OS preference, then light.
const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    // daisyUI switches on the data-theme attribute of <html>.
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', THEMES[theme]);
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    // Follow the OS only while the user has not made an explicit choice.
    useEffect(() => {
        const query = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (event) => {
            if (window.localStorage.getItem(THEME_STORAGE_KEY)) return;
            setTheme(event.matches ? 'dark' : 'light');
        };

        query.addEventListener('change', handleChange);
        return () => query.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
    }, []);

    const value = { theme, setTheme, toggleTheme, isDark: theme === 'dark' };

    return <ThemeContext value={value}>{children}</ThemeContext>;
};

export default ThemeProvider;
