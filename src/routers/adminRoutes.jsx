import { lazy } from 'react';

// The admin panel is code-split so a shopper never downloads it. These live in
// their own module because a file that mixes lazy component definitions with
// the router object breaks fast refresh.
export const AdminLayout = lazy(() => import('../Layouts/AdminLayout'));
export const Dashboard = lazy(() => import('../pages/Admin/Dashboard'));
export const AdminProducts = lazy(() => import('../pages/Admin/AdminProducts'));
export const ProductForm = lazy(() => import('../pages/Admin/ProductForm'));
export const AdminCategories = lazy(() => import('../pages/Admin/AdminCategories'));
export const AdminUsers = lazy(() => import('../pages/Admin/AdminUsers'));
