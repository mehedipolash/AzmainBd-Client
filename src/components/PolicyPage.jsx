import React from 'react';
import PageHeader from './PageHeader';

// Shared shell for legal and policy pages. Content is passed as structured
// sections rather than raw HTML, so every policy page stays consistent and
// the client can later edit them from the admin panel.
const PolicyPage = ({ eyebrow, title, subtitle, image, crumbLabel, updated, sections }) => {
    return (
        <div>
            <PageHeader
                eyebrow={eyebrow}
                title={title}
                subtitle={subtitle}
                image={image}
                crumbs={[{ label: 'Home', path: '/' }, { label: crumbLabel }]}
            />

            <div className="container-px section-y">
                <div className="mx-auto max-w-3xl">
                    {updated && (
                        <p className="mb-10 border-b border-base-300 pb-6 text-[13px] text-base-content/50">
                            Last updated {updated}
                        </p>
                    )}

                    <div className="space-y-10">
                        {sections.map((section) => (
                            <section key={section.heading}>
                                <h2 className="font-display text-xl font-semibold sm:text-2xl">
                                    {section.heading}
                                </h2>

                                {section.body?.map((paragraph) => (
                                    <p
                                        key={paragraph.slice(0, 40)}
                                        className="mt-4 text-[15px] leading-relaxed text-base-content/65"
                                    >
                                        {paragraph}
                                    </p>
                                ))}

                                {section.list && (
                                    <ul className="mt-4 space-y-2.5">
                                        {section.list.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-3 text-[15px] leading-relaxed text-base-content/65"
                                            >
                                                <span
                                                    className="mt-2.5 size-1 shrink-0 rounded-full bg-primary"
                                                    aria-hidden="true"
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolicyPage;
