import { createContext } from 'react';

// Split from the provider so fast-refresh keeps working.
export const CartContext = createContext(null);
