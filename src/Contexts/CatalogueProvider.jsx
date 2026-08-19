import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProducts, fetchCategories } from '../api/products.api';

/* ---------------------------------------------------------------------------
   Live catalogue.

   Every storefront page reads products and categories from here rather than
   fetching for itself. One request serves the whole session, so navigating
   Home → Shop → a product page does not re-hit the API, and a product the
   owner adds in the admin panel shows up everywhere at once.

   The mock data this replaces is gone: what the client sees is what is in
   their database.
--------------------------------------------------------------------------- */

export const CatalogueContext = createContext(null);

// One page of the catalogue. The shop is small enough that a single request is
// simpler and faster than paginating, and it is capped server-side anyway.
const PAGE_SIZE = 60;

const CatalogueProvider = ({ children }) => {
    const [state, setState] = useState({
        loading: true,
        error: '',
        products: [],
        categories: [],
    });

    const load = useCallback(async () => {
        setState((current) => ({ ...current, loading: true, error: '' }));

        try {
            // Both land together so the UI never renders products against a
            // category list that has not arrived yet.
            const [productsResponse, categories] = await Promise.all([
                fetchProducts({ limit: PAGE_SIZE }),
                fetchCategories(),
            ]);

            setState({
                loading: false,
                error: '',
                products: productsResponse.items ?? [],
                categories: categories ?? [],
            });
        } catch (error) {
            setState({
                loading: false,
                error: error.message,
                products: [],
                categories: [],
            });
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const value = useMemo(
        () => ({
            ...state,
            // Exposed so the admin panel can force a refresh after a change
            // rather than the storefront showing stale stock until reload.
            reload: load,
            // Category name lookup by slug, so a product row can print
            // "Hair Care" instead of "hair-care" without every component
            // rebuilding the same map.
            categoryName: (slug) =>
                state.categories.find((category) => category.slug === slug)?.name ?? slug,
        }),
        [state, load],
    );

    return <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>;
};

export default CatalogueProvider;
