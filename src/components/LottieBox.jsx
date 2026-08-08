import React from 'react';
import lottieReact from 'lottie-react';

/* ---------------------------------------------------------------------------
   lottie-react is published as CommonJS. Under Vite's interop the module's
   default export is a wrapper object, so the actual React component sits at
   `default.default` — importing it the usual way yields an object and React
   throws "Element type is invalid".

   The unwrapping is done once here rather than repeated at each call site, so
   nothing downstream has to know about the packaging quirk.
--------------------------------------------------------------------------- */
const Lottie = lottieReact?.default ?? lottieReact;

const LottieBox = ({ animationData, className = '', loop = true }) => {
    if (typeof Lottie !== 'function' || !animationData) return null;

    return (
        <div className={className} aria-hidden="true">
            <Lottie animationData={animationData} loop={loop} />
        </div>
    );
};

export default LottieBox;
