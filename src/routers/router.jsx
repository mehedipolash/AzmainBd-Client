import { createBrowserRouter } from "react-router";
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
import AdminLayout from "../Layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import AdminProducts from "../pages/Admin/AdminProducts";
import ProductForm from "../pages/Admin/ProductForm";
import AdminCategories from "../pages/Admin/AdminCategories";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
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
    path: "/",
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "verify-email",
        element: <VerifyEmail></VerifyEmail>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout></AdminLayout>
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
]);

export default router;
