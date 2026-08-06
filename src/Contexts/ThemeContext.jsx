import { createContext } from 'react';

// Split from the provider so fast-refresh keeps working: a file that exports
// both a component and a constant gets fully remounted on every edit.
export const ThemeContext = createContext(null);
