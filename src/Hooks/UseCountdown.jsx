import { useEffect, useState } from 'react';

const getRemaining = (target) => {
    const diff = Math.max(0, target - Date.now());

    return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: diff === 0,
    };
};

const ZERO = { hours: 0, minutes: 0, seconds: 0, expired: false };

// Ticks once a second toward `targetTime` (a ms timestamp) and clears its own
// interval on unmount so no timer leaks between route changes.
// Starts at zero and fills in on mount — reading the clock during render would
// make the component impure.
const UseCountdown = (targetTime) => {
    const [remaining, setRemaining] = useState(ZERO);

    useEffect(() => {
        if (!targetTime) return undefined;

        const tick = () => {
            const next = getRemaining(targetTime);
            setRemaining(next);
            return next.expired;
        };

        const timer = setInterval(() => {
            if (tick()) clearInterval(timer);
        }, 1000);

        // Paint the correct value immediately instead of waiting a full second,
        // without setting state synchronously during the effect body.
        const initial = requestAnimationFrame(tick);

        return () => {
            clearInterval(timer);
            cancelAnimationFrame(initial);
        };
    }, [targetTime]);

    return remaining;
};

export default UseCountdown;
