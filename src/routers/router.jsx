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
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
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
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
