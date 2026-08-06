import React from 'react';

// Centred editorial heading — small-caps eyebrow, serif title, optional lede.
// Sections are separated by type and whitespace rather than coloured bands.
const SectionTitle = ({ eyebrow, title, subtitle }) => {
    return (
        <div className="mx-auto mb-10 max-w-xl text-center sm:mb-12">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}

            <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
                {title}
            </h2>

            {subtitle && (
                <p className="mt-4 text-sm leading-relaxed text-base-content/60">{subtitle}</p>
            )}
        </div>
    );
};

export default SectionTitle;
