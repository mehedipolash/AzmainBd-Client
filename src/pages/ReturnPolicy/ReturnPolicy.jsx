import React from 'react';
import PolicyPage from '../../components/PolicyPage';
import { EMAIL, PHONE_DISPLAY } from '../../utils/business';

/* Written for what this shop actually sells — sealed cosmetics and personal
   care — rather than electronics. Hygiene rules matter here; warranty service
   centres do not. */
const SECTIONS = [
    {
        heading: '3-day return window',
        body: [
            'Tell us within 3 days of delivery if something is wrong with your order and we will exchange it or refund you. The window starts the day the item reaches you.',
        ],
        list: [
            'The product must be unopened, with its factory seal and shrink wrap intact.',
            'Original packaging and any free items included must come back with it.',
            'Your order number, or the WhatsApp chat the order was placed in, is enough proof of purchase.',
        ],
    },
    {
        heading: 'What cannot be returned',
        body: [
            'Cosmetics and personal care are sealed for hygiene. Once a seal is broken we cannot resell the item, so it cannot be taken back unless it is faulty.',
        ],
        list: [
            'Any product whose seal, cap band or shrink wrap has been opened.',
            'Items damaged after delivery, or stored in direct heat or sunlight.',
            'Products bought as part of a clearly marked clearance or short-expiry offer.',
        ],
    },
    {
        heading: 'Wrong, damaged or leaking on arrival',
        body: [
            'If we send the wrong item, or it arrives damaged, leaking or past its expiry date, we replace it at our cost. Send us a photo on WhatsApp within 48 hours of delivery and we will arrange collection and a replacement.',
            'This applies even to opened items — a seal broken to discover a fault is not a reason to refuse a return.',
        ],
    },
    {
        heading: 'Authenticity',
        body: [
            'Every item we sell is genuine and sourced through the brand or its distributor. If you have any doubt about a product you received from us, bring it to the Gulshan showroom or send us the batch code on WhatsApp and we will trace it for you.',
        ],
    },
    {
        heading: 'How refunds are issued',
        body: [
            'Refunds go back the way you paid — bKash, Nagad, bank transfer or cash. Mobile banking refunds usually clear within 2 to 3 working days once we have the item back and have checked it.',
            'Delivery charges are refunded only where the return is our error: a wrong item sent, or a fault on arrival.',
        ],
    },
    {
        heading: 'Starting a return',
        body: [
            `Message us on WhatsApp at ${PHONE_DISPLAY} with your order details and a photo of the problem — that is the fastest route, and it is where your order was placed. You can also email ${EMAIL}, or bring the item to the showroom in person.`,
            'We will confirm whether it qualifies and arrange courier pickup in Dhaka, or give you a return address for other districts.',
        ],
    },
];

const ReturnPolicy = () => (
    <PolicyPage
        eyebrow="Policy"
        title="Returns & refunds"
        subtitle="Sealed products, honest exchanges, and a real person to talk to."
        image="/banners/policy.jpg"
        crumbLabel="Return Policy"
        sections={SECTIONS}
    />
);

export default ReturnPolicy;
