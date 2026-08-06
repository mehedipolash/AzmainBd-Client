import { use } from 'react';
import { ToastContext } from '../Contexts/ToastContext';

const UseToast = () => {
    const context = use(ToastContext);

    if (!context) {
        throw new Error('UseToast must be used inside a ToastProvider');
    }

    return context;
};

export default UseToast;
