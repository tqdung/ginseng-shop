import React from "react";
// import Logo from '../../assets/images/catalog/logo.png';
import Logo from "../../../assets/images/catalog/logo_shopnhansam.png";
import NavigationItem from "../TopNavigation/NavigationItem/NavigationItem";
import "./TopNavigation.css";
import { Link } from "react-router-dom";
import {
  formatCurrency,
  isNotEmpty,
  clearAuthUser
} from "../../../utilities/fnUtil";
import cartService from "../../../services/cartService";
import { connect } from "react-redux";
let tempTotalPrice = 0;
function focusSelected() {
  document.body.style.overflow = "hidden";

  const UnDark = document.querySelector(".UnDark");
  UnDark.style.pointerEvents = "all";
  UnDark.style.opacity = "1";
  // if (UnDark.classList.contains("UnDark")) {
  //   UnDark.classList.remove("UnDark");
  //   UnDark.classList.add("Dark");
  // }
}

function blurSelected() {
  document.body.style.overflow = "visible";

  const UnDark = document.querySelector(".UnDark");
  UnDark.style.pointerEvents = "none";
  UnDark.style.opacity = "0";
  // if (Dark.classList.contains("Dark")) {
  //   Dark.classList.remove("Dark");
  //   Dark.classList.add("UnDark");
  // }
}

// const closeMenu = () => {
//   window.$(".myaccount a.dropdown-toggle").click();
// };

// const closeCartMenu = () => {
//   window.$("#cart .dropdown-toggle").onMouseOver();
// };

// function onLogout() {
//   localStorage.removeItem("authUser");
// }

let cartList = [];
function loadCart(authUser, productOrder = [], fn, cartLS) {
  let arrayProductOrder = [];

  let temp = cartService.getCartFromLS();
  if (!Object.is(JSON.stringify(temp), JSON.stringify(cartLS))) {
    fn(cartService.getCartFromLS());
  }
  arrayProductOrder = cartLS.slice();

  tempTotalPrice = 0;
  cartList = (
    <>
      {arrayProductOrder.length ? (
        arrayProductOrder.map((order, index) => {
          tempTotalPrice +=
            (order.price - (order.price * order.discount) / 100) *
            order.quantity;
          return (
            <li key={index}>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td className="text-left">
                      <Link to={`/productDetail/${order._id}`}>
                        <img
                          src={order.images[0]}
                          alt={order.productName}
                          title={order.productName}
                          className="img-thumbnail imageSmall"
                        />
                      </Link>
                    </td>
                    <td className="text-left">
                      <Link to={`/productDetail/${order._id}`}>
                        {order.productName}
                      </Link>
                      <p>Số Lượng: {order.quantity}</p>
                      <p>
                        Giá:{" "}
                        {formatCurrency(
                          (order.price - (order.price * order.discount) / 100) *
                            order.quantity
                        )}{" "}
                        VND{" "}
                      </p>
                    </td>

                    {/* <td className="text-center">
                      <button
                        type="button"
                        title="Remove"
                        className="btn btn-danger btn-xs"
                      >
                        <i className="fa fa-times" />
                      </button>
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </li>
          );
        })
      ) : (
        <p>Giỏ hàng của bạn rỗng</p>
      )}
    </>
  );
}
const topNavigation = props => {
  let zIndexStyle;
  zIndexStyle = {
    zIndex: "300000"
  };

  let styleInput;
  styleInput = {
    width: "60%",
    margin: "0 auto",
    fontFamily: "auto",
    zIndex: "200000"
    // marginTop: "15px"
  };

  let navList = [];

  navList = (
    <>
      {props.listCategoriesName.map((category, index) => {
        return (
          <NavigationItem
            key={index}
            index={index}
            type={category.type}
            subNavList={category.subCategories}
            parentNav={category.id}
          >
            {category.name}
          </NavigationItem>
        );
      })}
    </>
  );

  return (
    <header>
      <div className="header">
        <div className="top-bar hide-for-sticky">
          <div className="flex-row container">
            <div className="flex-col hide-for-medium flex-left">
              <ul className="nav nav-left medium-nav-center nav-small  nav-divided">
                <li className="html custom html_topbar_left">
                  <strong className="uppercase white-color">
                    Hotline Tư Vấn : 0354 955 106{" "}
                  </strong>
                </li>{" "}
              </ul>
            </div>

            <div className="flex-right">
              <ol className="ol1_foot_5">
                <li>
                  <a
                    href="https://www.facebook.com/gianhanghanquoc.kr/?eid=ARAbB6drDr_BUnMuV70BITK9Pyx8ENXq2z_tzKGGb88W6DumLgZFdpZxar3fKESNpo1uGfjmeqGtqU_Z"
                    rel="nofollow"
                    target="_blank"
                  >
                    <i className="icon_fb icon_web"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.m.me/gianhanghanquoc.kr"
                    rel="nofollow"
                    target="_blank"
                  >
                    <i className="icon_ms icon_web"></i>
                  </a>
                </li>
                <li>
                  <a href="skype:live:7841490b682b0175?chat">
                    <i className="icon_skype"></i>
                  </a>
                </li>
                <li>
                  <Link to={{ pathname: "aboutUs" }}>
                    <i className="icon_kakao"></i>
                  </Link>
                </li>
                <li>
                  <a
                    href="http://zalo.me/0354955106
"
                    rel="nofollow"
                    target="_blank"
                  >
                    <i className="icon_zl icon_web"></i>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="header-middle yellow-bg">
          <div className="header-middle-wrapper">
            <div className="header-left">
              <div className="header-logo">
                <div id="logo">
                  <Link to="/home">
                    <img
                      src={Logo}
                      title="Shop Nhân Sâm"
                      width="150"
                      height="150"
                      alt="Style-Light"
                      className="img-responsive"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="header-center">
              <div className="main-menu-wrapper">
                <nav className="nav-container" role="navigation">
                  <div className="nav-inner">
                    <div id="menu" className="main-menu">
                      <div className="nav-responsive">
                        <span>Menu</span>
                        <div className="expandable" />
                      </div>
                      <ul className="nav navbar-nav grid-display text-left">
                        {navList}
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
            <div className="header-right">
              <div className="header-cart-wrapper">
                <div
                  className="header-cart"
                  onLoad={loadCart(
                    props.authUser,
                    props.cart.productOrder,
                    props.setCartLSState,
                    props.cartLS
                  )}
                >
                  <div id="cart" className="btn-group btn-block">
                    <button
                      type="button"
                      data-toggle="dropdown"
                      data-loading-text="Loading..."
                      className="btn btn-inverse btn-block btn-lg dropdown-toggle"
                    >
                      <span
                        id="cart-title"
                        onMouseEnter={() =>
                          loadCart(
                            props.authUser,
                            props.cart.productOrder,
                            props.setCartLSState,
                            props.cartLS
                          )
                        }
                      >
                        Giỏ hàng
                      </span>
                      <i className="fa fa-angle-down" />
                      <span id="cart-total">
                        <span className="single-item">0</span>
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu pull-right cart-menu"
                      style={zIndexStyle}
                    >
                      {cartList}
                      <li>
                        <div>
                          <table className="table table-bordered">
                            <tbody>
                              <tr>
                                <td className="text-right">
                                  <strong>Tổng Tiền</strong>
                                </td>
                                <td className="text-right">
                                  {formatCurrency(tempTotalPrice)} VND
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="text-right button-container">
                            <Link className="addtocart" to="/cart">
                              <strong>Giỏ Hàng</strong>
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="/checkout" className="checkout">
                              <strong>Thanh Toán</strong>
                            </Link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="search">
                <div className="UnDark" />
              </div>
              {/* <div className="myaccount-wrapper">
                <div className="dropdown myaccount">
                  <a
                    href="/"
                    title={
                      props.authUser.auth
                        ? isNotEmpty(props.user)
                          ? props.user.userInfo.name
                          : "My Account"
                        : "My Account"
                    }
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="fa fa-angle-down" />
                  </a>
                  {!props.authUser.auth ? (
                    <ul
                      className="dropdown-menu dropdown-menu-right myaccount-menu"
                      style={zIndexStyle}
                      // onClick={() => closeMenu()}
                    >
                      <li>
                        <Link to="/register">Đăng Ký</Link>
                      </li>
                      <li>
                        <Link to="/login">Đăng Nhập</Link>
                      </li>
                      <nav id="top">
                        <div id="top-links" className="nav">
                          <ul className="list-inline">
                            <li>
                              <Link to="/checkout" title="Checkout">
                                <span className="checkout">Thanh Toán</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </nav>
                    </ul>
                  ) : (
                    <ul
                      className="dropdown-menu dropdown-menu-right myaccount-menu"
                      style={zIndexStyle}
                      // onClick={() => closeMenu()}
                    >
                      <nav id="top">
                        <div id="top-links" className="nav">
                          <ul className="list-inline">
                            <li>
                              <Link to="/account" title="Checkout">
                                <span className="checkout">Tài Khoản</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/checkout" title="Checkout">
                                <span className="checkout">Thanh Toán</span>
                              </Link>
                            </li>
                            <li>
                              <a
                                href="/"
                                title="Logout"
                                onClick={() => clearAuthUser("/login", true)}
                              >
                                <span className="logout">Thoát</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </nav>
                    </ul>
                  )}
                </div>
              </div> */}
            </div>
            <div style={styleInput} id="flowerInput" className="input-group">
              <input
                id="searchInput"
                type="search"
                name="search"
                placeholder={
                  props.searchPlaceHolder ? props.searchPlaceHolder : ""
                }
                className="form-control input-lg inputField"
                onFocus={focusSelected}
                onBlur={blurSelected}
                onKeyUp={e => {
                  if (e.key === "Enter") {
                    props.history("/search");
                    document.getElementById("searchInput").blur();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    authUser: state.authUser,
    user: state.userList.user,
    cart: state.userList.cart,
    searchPlaceHolder: state.htmlContent
      ? state.htmlContent.htmlContent.searchPlaceHolder
      : ""
  };
};

export default connect(mapStateToProps)(topNavigation);
