import { use } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';

const UseTheme = () => {
    const context = use(ThemeContext);

    if (!context) {
        throw new Error('UseTheme must be used inside a ThemeProvider');
    }

    return context;
};

export default UseTheme;
