import { use } from 'react';
import { CartContext } from '../Contexts/CartContext';

const UseCart = () => {
    const context = use(CartContext);

    if (!context) {
        throw new Error('UseCart must be used inside a CartProvider');
    }

    return context;
};

export default UseCart;
