import { Suspense } from "react";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../pages/Home/Home/Home";
import Shop from "../pages/Shop/Shop";
import Categories from "../pages/Categories/Categories";
import Deals from "../pages/Deals/Deals";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ReturnPolicy from "../pages/ReturnPolicy/ReturnPolicy";
import Disclaimer from "../pages/Disclaimer/Disclaimer";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Loader from "../components/Loader";
import {
  AdminLayout,
  Dashboard,
  AdminProducts,
  ProductForm,
  AdminCategories,
} from "./adminRoutes";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ChangePassword from "../pages/Auth/ChangePassword";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

// The route table lives apart from createBrowserRouter so tests can import it
// and drive it with createMemoryRouter. Importing the router itself pulls in
// createBrowserRouter, which needs a DOM — that gap is how a duplicate "/"
// path once shipped unnoticed.
export const routes = [
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "shop",
        element: <Shop></Shop>,
      },
      {
        path: "categories",
        element: <Categories></Categories>,
      },
      {
        path: "deals",
        element: <Deals></Deals>,
      },
      {
        path: "product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "return-policy",
        element: <ReturnPolicy></ReturnPolicy>,
      },
      {
        path: "disclaimer",
        element: <Disclaimer></Disclaimer>,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    // Pathless layout route: it wraps its children in AuthLayout without
    // claiming a path of its own. Declaring path:"/" here would collide with
    // the storefront route above — React Router matches the first "/" it
    // finds and never reaches the second, so every auth page 404s.
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        // Signing up needs no verification, but changing a password does —
        // the page asks for the current one before accepting a new one.
        path: "/change-password",
        element: <ChangePassword></ChangePassword>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        {/* Suspense covers the lazily-loaded admin chunks, including the
            nested route elements rendered through the layout's Outlet. */}
        <Suspense fallback={<Loader fullScreen />}>
          <AdminLayout></AdminLayout>
        </Suspense>
      </AdminRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "products",
        element: <AdminProducts></AdminProducts>,
      },
      {
        path: "products/new",
        element: <ProductForm></ProductForm>,
      },
      {
        path: "products/:id",
        element: <ProductForm></ProductForm>,
      },
      {
        path: "categories",
        element: <AdminCategories></AdminCategories>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
];
