import React from 'react';
import EmptyState from '../../components/EmptyState';
import SectionTitle from '../../components/SectionTitle';

const Cart = () => {
    // Reads from CartContext once that is built; empty until then.
    const items = [];

    return (
        <div className="container-px py-8 sm:py-10 lg:py-12">
            <SectionTitle eyebrow="Checkout" title="Your Cart" />

            {items.length === 0 ? (
                <EmptyState
                    title="Your cart is empty"
                    message="Browse the catalogue and add something you like."
                    actionLabel="Start shopping"
                    actionPath="/shop"
                />
            ) : null}
        </div>
    );
};

export default Cart;
