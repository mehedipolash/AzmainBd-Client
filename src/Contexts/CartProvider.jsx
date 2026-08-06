import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './CartContext';

const STORAGE_KEY = 'azmainbd-cart';

// Cart lives in localStorage for now. When the backend lands this provider is
// the only file that changes — it starts syncing to the server instead, and no
// component that calls useCart() needs touching.
const readStoredCart = () => {
    if (typeof window === 'undefined') return [];

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        // Corrupt or unreadable storage should never break the store.
        return [];
    }
};

const CartProvider = ({ children }) => {
    const [items, setItems] = useState(readStoredCart);

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // Private browsing can reject writes; the cart still works in memory.
        }
    }, [items]);

    // Quantity is always clamped to the stock we actually hold, so the cart can
    // never ask for more units than exist.
    const addItem = useCallback((product, quantity = 1) => {
        setItems((current) => {
            const existing = current.find((item) => item._id === product._id);
            const cap = product.stock ?? 0;

            if (existing) {
                return current.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: Math.min(cap, item.quantity + quantity) }
                        : item,
                );
            }

            return [
                ...current,
                {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    stock: cap,
                    quantity: Math.min(cap, quantity),
                },
            ];
        });
    }, []);

    const removeItem = useCallback((id) => {
        setItems((current) => current.filter((item) => item._id !== id));
    }, []);

    const updateQuantity = useCallback((id, quantity) => {
        setItems((current) =>
            current.map((item) =>
                item._id === id
                    ? { ...item, quantity: Math.max(1, Math.min(item.stock, quantity)) }
                    : item,
            ),
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const { count, subtotal } = useMemo(
        () =>
            items.reduce(
                (totals, item) => ({
                    count: totals.count + item.quantity,
                    subtotal: totals.subtotal + item.price * item.quantity,
                }),
                { count: 0, subtotal: 0 },
            ),
        [items],
    );

    const value = { items, addItem, removeItem, updateQuantity, clearCart, count, subtotal };

    return <CartContext value={value}>{children}</CartContext>;
};

export default CartProvider;
