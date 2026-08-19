import { useContext } from 'react';
import { CatalogueContext } from '../Contexts/CatalogueProvider';

// Throws rather than returning null when used outside the provider — a
// component silently rendering an empty catalogue is far harder to diagnose
// than a message naming the missing provider.
const UseCatalogue = () => {
    const context = useContext(CatalogueContext);

    if (!context) {
        throw new Error('UseCatalogue must be used inside <CatalogueProvider>');
    }

    return context;
};

export default UseCatalogue;
