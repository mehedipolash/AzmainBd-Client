import React from 'react';
import PolicyPage from '../../components/PolicyPage';

const SECTIONS = [
    {
        heading: 'Product information',
        body: [
            'We take care to describe every product accurately, using specifications supplied by the manufacturer or their authorised distributor. Manufacturers occasionally revise specifications, packaging or bundled accessories without notice.',
            'Product photographs are representative. Colour reproduction varies between screens, and regional variants of the same model may differ in bundled accessories or plug type.',
        ],
    },
    {
        heading: 'Pricing and availability',
        body: [
            'Prices are shown in Bangladeshi Taka and include applicable VAT unless stated otherwise. Prices and stock levels change frequently and are confirmed at the moment your order is placed, not when the page was loaded.',
            'Where a price has been listed in obvious error, we will contact you before processing the order and you may cancel without penalty.',
        ],
    },
    {
        heading: 'Warranty coverage',
        body: [
            'Warranty is provided by the manufacturer or their appointed service partner in Bangladesh, under their terms. We facilitate claims but do not extend or replace the manufacturer warranty.',
        ],
        list: [
            'Warranty does not cover physical damage, liquid ingress or unauthorised repair.',
            'Consumables and accessories may carry a shorter period than the main unit.',
            'Keep your invoice — service centres require proof of purchase date.',
        ],
    },
    {
        heading: 'External links',
        body: [
            'This site may link to manufacturer pages and third-party resources. We do not control that content and are not responsible for its accuracy or availability.',
        ],
    },
    {
        heading: 'Limitation of liability',
        body: [
            'To the extent permitted by law, our liability in connection with any product is limited to the purchase price paid. We are not liable for indirect losses, including data loss or loss of business arising from product failure.',
            'Nothing in this notice limits rights you hold under the consumer protection laws of Bangladesh.',
        ],
    },
];

const Disclaimer = () => (
    <PolicyPage
        eyebrow="Legal"
        title="Disclaimer"
        subtitle="What we guarantee, what the manufacturer covers, and where the limits sit."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
        crumbLabel="Disclaimer"
        updated="1 August 2026"
        sections={SECTIONS}
    />
);

export default Disclaimer;
