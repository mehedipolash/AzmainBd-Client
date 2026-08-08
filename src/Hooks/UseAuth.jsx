import { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const UseAuth = () => {
    const context = use(AuthContext);

    if (!context) {
        throw new Error('UseAuth must be used inside an AuthProvider');
    }

    return context;
};

export default UseAuth;
