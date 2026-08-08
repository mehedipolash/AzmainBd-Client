import React from 'react';
import PolicyPage from '../../components/PolicyPage';

const SECTIONS = [
    {
        heading: '7-day return window',
        body: [
            'You may return most products within 7 days of delivery for a refund or exchange. The window starts the day the courier marks your order delivered.',
        ],
        list: [
            'The item must be in its original packaging with all accessories and manuals.',
            'Serial number stickers and warranty seals must be intact.',
            'Proof of purchase — your order number or invoice — is required.',
        ],
    },
    {
        heading: 'What cannot be returned',
        body: [
            'A small number of categories are excluded, either for hygiene reasons or because the item is activated to your account on first use.',
        ],
        list: [
            'In-ear headphones and earbuds once the hygiene seal is broken.',
            'Software, digital licences and activated warranty extensions.',
            'Products with physical damage, liquid ingress or unauthorised repair.',
            'Made-to-order or specially imported items, flagged as such at checkout.',
        ],
    },
    {
        heading: 'Faulty on arrival',
        body: [
            'If a product is dead on arrival or develops a fault within 7 days, we replace it rather than repair it. Contact us within 48 hours of noticing the fault and we arrange collection at our cost.',
            'Beyond 7 days, the manufacturer warranty applies and we will route the unit to the brand service centre on your behalf.',
        ],
    },
    {
        heading: 'How refunds are issued',
        body: [
            'Approved refunds are returned to the original payment method. Card and mobile banking refunds typically clear within 5 to 7 working days once we receive the returned item and complete inspection.',
            'Delivery charges are refunded only where the return is due to our error — a wrong item shipped, or a fault on arrival.',
        ],
    },
    {
        heading: 'Starting a return',
        body: [
            'Call the hotline or email support with your order number and a short description of the issue. We will confirm eligibility and arrange courier pickup in Dhaka, or provide a return address for other districts.',
        ],
    },
];

const ReturnPolicy = () => (
    <PolicyPage
        eyebrow="Policy"
        title="Returns & exchanges"
        subtitle="Straightforward terms, written so you can check them before you buy."
        image="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1600&q=80"
        crumbLabel="Return Policy"
        updated="1 August 2026"
        sections={SECTIONS}
    />
);

export default ReturnPolicy;
