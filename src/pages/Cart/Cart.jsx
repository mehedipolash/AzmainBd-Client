import React from 'react';
import EmptyState from '../../components/EmptyState';

const Cart = () => {
    // Reads from CartContext once that is built; empty until then.
    const items = [];

    return (
        <div>
            <div className="border-b border-base-300 bg-base-200">
                <div className="container-px py-12 text-center sm:py-16">
                    <p className="eyebrow mb-3">Checkout</p>
                    <h1 className="font-display text-3xl font-semibold sm:text-4xl">Your cart</h1>
                </div>
            </div>

            <div className="container-px section-y">
                {items.length === 0 && (
                    <EmptyState
                        title="Your cart is empty"
                        message="Browse the catalogue and add something you like."
                        actionLabel="Start shopping"
                        actionPath="/shop"
                    />
                )}
            </div>
        </div>
    );
};

export default Cart;
