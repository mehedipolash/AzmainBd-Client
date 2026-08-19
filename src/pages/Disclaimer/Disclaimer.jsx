import React from 'react';
import PolicyPage from '../../components/PolicyPage';

/* Cosmetics and personal care, not electronics: the honest disclosures here
   are about skin reactions, batch variation and expiry — not warranty service
   centres. */
const SECTIONS = [
    {
        heading: 'Product information',
        body: [
            'We describe every product using information supplied by the brand or its distributor. Brands occasionally revise formulations, packaging or bottle sizes without notice, so the item you receive may differ slightly in appearance from the photograph shown.',
            'Product photographs are representative. Colour reproduction varies between screens, and regional variants of the same product may differ in fragrance, size or ingredient listing.',
        ],
    },
    {
        heading: 'Skin and personal sensitivity',
        body: [
            'Cosmetics and personal-care products affect people differently. We are a retailer, not a medical practice, and nothing on this site is medical advice.',
        ],
        list: [
            'Read the ingredient list on the pack before use, especially if you have known allergies.',
            'Patch-test a new product on a small area of skin before applying it fully.',
            'Stop using a product and consult a doctor if you experience irritation or a reaction.',
            'Results described by a brand are what that brand claims, not a promise we can guarantee for you.',
        ],
    },
    {
        heading: 'Authenticity and expiry',
        body: [
            'Every item we sell is genuine and sourced through the brand or an authorised distributor. We check batch codes and expiry dates before dispatch, and we do not sell expired stock.',
            'If you ever doubt the authenticity of something you bought from us, send us the batch code on WhatsApp and we will trace it — or bring it to the Gulshan showroom.',
        ],
    },
    {
        heading: 'Pricing and availability',
        body: [
            'Prices are shown in Bangladeshi Taka and include applicable VAT unless stated otherwise. Some items are listed as “price on request”, which means we quote them on WhatsApp rather than publishing a fixed price.',
            'Prices and stock change frequently. The price and availability confirmed in your WhatsApp conversation are the ones that apply to your order, not the figure cached on a page you loaded earlier.',
            'Where a price has been listed in obvious error, we will tell you before processing the order and you may cancel without penalty.',
        ],
    },
    {
        heading: 'Ordering over WhatsApp',
        body: [
            'Orders are placed and confirmed over WhatsApp. This site does not process card payments and never asks for card details — if you are ever asked for them in our name, it is not us.',
            'Your order is confirmed only when we reply to confirm it. Adding items to the cart on this site does not reserve stock.',
        ],
    },
    {
        heading: 'External links',
        body: [
            'This site may link to brand pages and third-party resources. We do not control that content and are not responsible for its accuracy or availability.',
        ],
    },
    {
        heading: 'Limitation of liability',
        body: [
            'To the extent permitted by law, our liability in connection with any product is limited to the purchase price paid.',
            'Nothing in this notice limits rights you hold under the consumer protection laws of Bangladesh.',
        ],
    },
];

const Disclaimer = () => (
    <PolicyPage
        eyebrow="Legal"
        title="Disclaimer"
        subtitle="What we stand behind, what the brand claims, and where the limits sit."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
        crumbLabel="Disclaimer"
        updated="19 August 2026"
        sections={SECTIONS}
    />
);

export default Disclaimer;
