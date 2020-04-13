import React from "react";
import Header from "../../containers/Shop/Header/Header";
// import Footer from '../../components/Shop/Footer/Footer';
import Footer from "../../containers/Shop/Footer/Footer";
import Home from "../../containers/Shop/Home/Home";
import { Route, Redirect, Switch } from "react-router";
import Category from "../Shop/Category/Category";
import notFoundPage from "../../components/Shop/404/404";
import ProductDetail from "../Shop/ProductDetail/ProductDetail";
import Search from "../Shop/Search/Search";
import Cart from "../Shop/Cart/Cart";
import Checkout from "../Shop/Checkout/Checkout";
import Login from "../../containers/Shop/Login/Login";
import Blogs from "../Shop/Blogs/Blogs";
import Account from "../../containers/Account/Account";
import BlogDetail from "../Shop/BlogDetail/BlogDetail";
import Register from "../../containers/Shop/Register/Register";
import CheckoutSuccess from "../../containers/Shop/CheckoutSuccess/CheckoutSuccess";
import { connect } from "react-redux";
import ResetPassword from "./ResetPassword/ResetPassword";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import AboutUs from "./AboutUs/AboutUs";
import CategoryParent from "./CategoryParent/CategoryParent";
import Introduction from "./Introduction/Introduction";

class Shop extends React.Component {
  render() {
    // if (this.props.authUser.auth) {
    //   return (
    //     <>
    //       <Header />
    //       <Switch>
    //         <Route path="/home" exact component={Home} />
    //         <Route path="/category/:first/:second" exact component={Category} />
    //         <Route
    //           path="/productDetail/:product_id"
    //           exact
    //           component={ProductDetail}
    //         />
    //         <Route path="/checkoutSuccess" exact component={CheckoutSuccess} />
    //         <Route path="/search" exact component={Search} />
    //         <Route path="/cart" exact component={Cart} />
    //         <Route path="/aboutUs" exact component={AboutUs} />
    //         <Route path="/checkout" exact component={Checkout} />
    //         <Route path="/blogs" exact component={Blogs} />
    //         <Route path="/blogDetail/:blog_id" exact component={BlogDetail} />
    //         <Route path="/account" component={Account} />
    //         <Redirect from="/login" to="/account" />
    //         <Redirect from="/register" to="/account" />
    //         <Redirect path="/forgotpassword" to="/account" />
    //         <Route path="/resetPWD/:userPhone/:token" to="/account" />
    //         <Redirect from="/" to="/home" exact />
    //         <Route path="/pageNotFound" exact component={notFoundPage} />
    //         <Redirect to="/pageNotFound" />
    //       </Switch>
    //       <Footer />
    //       <div id="spinner" />
    //     </>
    //   );
    // } else {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/category/:first/:second" exact component={Category} />
          <Route path="/category/:first" exact component={CategoryParent} />
          <Route
            path="/productDetail/:product_id"
            exact
            component={ProductDetail}
          />
          <Route path="/checkoutSuccess" exact component={CheckoutSuccess} />
          <Route path="/search" exact component={Search} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/aboutUs" exact component={AboutUs} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/blogs" exact component={Blogs} />
          <Route path="/introduction" exact component={Introduction} />
          <Route path="/blogDetail/:blog_id" exact component={BlogDetail} />
          {/* <Route path="/register" exact component={Register} /> */}
          {/* <Route path="/forgotpassword" exact component={ForgotPassword} /> */}
          {/* <Route
              path="/resetPWD/:userPhone/:token"
              exact
              component={ResetPassword}
            /> */}
          {/* <Redirect from="/account" to="/login" />
            <Route path="/login" exact component={Login} /> */}
          <Redirect from="/" to="/home" exact />
          <Route path="/pageNotFound" exact component={notFoundPage} />
          <Redirect to="/pageNotFound" />
        </Switch>
        <Footer />
        <div id="spinner" />
      </>
    );
  }
}
// }

const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};

export default connect(mapStateToProps)(Shop);
