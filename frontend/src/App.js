import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import WebFont from "webfontloader";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        <Header />

        {isAuthenticated && <UserOptions user={user} />}

        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/*" element={<NotFound />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route exact path="/login" element={<LoginSignUp />} />

            {/* Protected && Private Routes */}
            <Route element={<ProtectedRoute />}>
              <Route exact element={<Profile />} path="/account" />
              <Route exact element={<UpdateProfile />} path="/me/update" />
              <Route
                exact
                element={<UpdatePassword />}
                path="/password/update"
              />
              <Route exact element={<Shipping />} path="/login/shipping" />
              <Route exact element={<ConfirmOrder />} path="/order/confirm" />
              {stripeApiKey && (
                <Route exact path="/process/payment" element={<Payment />} />
              )}
              <Route exact element={<OrderSuccess />} path="/success" />
              <Route exact element={<MyOrders />} path="/orders" />
              <Route exact element={<OrderDetails />} path="/order/:id" />

              <Route
                isAdmin={true}
                exact
                element={<Dashboard />}
                path="/admin/dashboard"
              />

              <Route
                isAdmin={true}
                exact
                element={<ProductList />}
                path="/admin/products"
              />
              <Route
                isAdmin={true}
                exact
                element={<NewProduct />}
                path="/admin/product"
              />
              <Route
                isAdmin={true}
                exact
                element={<UpdateProduct />}
                path="/admin/product/:id"
              />

              <Route
                isAdmin={true}
                exact
                element={<OrderList />}
                path="/admin/orders"
              />
              <Route
                isAdmin={true}
                exact
                element={<ProcessOrder />}
                path="/admin/order/:id"
              />

              <Route
                isAdmin={true}
                exact
                element={<UsersList />}
                path="/admin/users"
              />
              <Route
                isAdmin={true}
                exact
                element={<UpdateUser />}
                path="/admin/user/:id"
              />

              <Route
                isAdmin={true}
                exact
                element={<ProductReviews />}
                path="/admin/reviews"
              />
            </Route>

            <Route exact element={<ForgotPassword />} path="/password/forgot" />
            <Route
              exact
              element={<ResetPassword />}
              path="/password/reset/:token"
            />

            <Route
              element={
                window.location.pathname === "/process/payment" ? null : (
                  <NotFound />
                )
              }
            />

            <Route exact element={<Cart />} path="/Cart" />

            <Route exact path="/search" element={<Search />} />
          </Routes>
        </Elements>

        <Footer />
      </Router>
    </>
  );
}

export default App;
