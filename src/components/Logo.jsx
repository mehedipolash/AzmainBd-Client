import React from 'react';
import { Link } from 'react-router';
import logoStacked from '../assets/logo.png';
import logoWide from '../assets/logo-wide.png';
import logoStackedDark from '../assets/logo-dark.png';
import logoWideDark from '../assets/logo-wide-dark.png';
import UseTheme from '../Hooks/UseTheme';
import { SITE_NAME } from '../utils/constants';


const SIZES = {
    stacked: { sm: 'h-12', md: 'h-16 sm:h-18', lg: 'h-24 sm:h-28' },
    wide: { sm: 'h-9', md: 'h-11 sm:h-13', lg: 'h-14 sm:h-16' },
};

const SOURCES = {
    stacked: { light: logoStacked, dark: logoStackedDark },
    wide: { light: logoWide, dark: logoWideDark },
};

const Logo = ({ size = 'md', to = '/', className = '', variant = 'stacked' }) => {
    const { isDark } = UseTheme();

    const key = SOURCES[variant] ? variant : 'stacked';
    const scale = SIZES[key];

    const source = SOURCES[key][isDark ? 'dark' : 'light'];

    const image = (
        <img
            src={source}
            alt={SITE_NAME}
            
            loading="eager"
            fetchPriority="high"
            className={`${scale[size] ?? scale.md} w-auto object-contain`}
        />
    );

    if (!to) {
        return <span className={`inline-flex items-center ${className}`}>{image}</span>;
    }

    return (
        <Link
            to={to}
            aria-label={`${SITE_NAME} — home`}
            className={`inline-flex items-center transition-opacity hover:opacity-85 ${className}`}
        >
            {image}
        </Link>
    );
};

export default Logo;
