import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaCheck, FaCircleInfo, FaTriangleExclamation } from 'react-icons/fa6';
import { ToastContext } from './ToastContext';

const ICONS = {
    success: FaCheck,
    info: FaCircleInfo,
    warning: FaTriangleExclamation,
};

const TONE_CLASSES = {
    success: 'border-l-success',
    info: 'border-l-info',
    warning: 'border-l-warning',
};

const DURATION = 3200;

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    // Timers are tracked so they can all be cleared on unmount — otherwise a
    // navigation mid-toast leaves a setTimeout writing to a dead component.
    const timers = useRef(new Map());

    const dismiss = useCallback((id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));

        const timer = timers.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }
    }, []);

    const notify = useCallback(
        (message, tone = 'success') => {
            const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
            setToasts((current) => [...current, { id, message, tone }]);

            timers.current.set(
                id,
                setTimeout(() => dismiss(id), DURATION),
            );
        },
        [dismiss],
    );

    useEffect(() => {
        const pending = timers.current;
        return () => {
            pending.forEach(clearTimeout);
            pending.clear();
        };
    }, []);

    return (
        <ToastContext value={{ notify, dismiss }}>
            {children}

            {/* Live region so screen readers announce the same confirmation
                sighted users see. */}
            <div
                className="pointer-events-none fixed inset-x-0 bottom-0 z-100 flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
                role="status"
                aria-live="polite"
            >
                {toasts.map((toast) => {
                    const Icon = ICONS[toast.tone] ?? FaCheck;

                    return (
                        <button
                            key={toast.id}
                            type="button"
                            onClick={() => dismiss(toast.id)}
                            className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 border border-base-300 border-l-2 bg-base-100 px-4 py-3 text-left text-sm shadow-lg motion-safe:animate-[toast-in_220ms_ease-out] ${
                                TONE_CLASSES[toast.tone] ?? TONE_CLASSES.success
                            }`}
                        >
                            <Icon className="shrink-0 text-xs opacity-70" aria-hidden="true" />
                            <span className="flex-1">{toast.message}</span>
                            <span className="text-[11px] tracking-wide text-base-content/35 uppercase">
                                Close
                            </span>
                        </button>
                    );
                })}
            </div>
        </ToastContext>
    );
};

export default ToastProvider;
