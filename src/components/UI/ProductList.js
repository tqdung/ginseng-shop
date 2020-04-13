import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency, cloneData } from "../../utilities/fnUtil";
import Limg from "./LoadingImage/Limg";
import cartService from "../../services/cartService";
import { connect } from "react-redux";
import Actions from "../../redux/rootActions";

function addProductToCart(authUser, product, cart, fn) {
  cartService.saveCartItemLSGuest(product);
}

const productList = props => {
  let styleImage_ratio_2_3;
  styleImage_ratio_2_3 = {
    width: "270px",
    height: "300px"
  };

  let listProductCardHTML = [];

  listProductCardHTML = (
    <>
      {props.lstProduct.map((product, i) => {
        return (
          <div className="product-layout product-list col-xs-12" key={i}>
            <div className="product-block product-thumb transition">
              <div className="product-block-inner">
                <div className="image">
                  <Link to={"/productDetail/" + product._id}>
                    <Limg
                      style={styleImage_ratio_2_3}
                      src={product.images[0]}
                      title={product.productName}
                      alt={product.productName}
                      className=" reg-image"
                    />
                    <Limg
                      style={styleImage_ratio_2_3}
                      className=" hover-image"
                      src={
                        product.images[1]
                          ? product.images[1]
                          : product.images[0]
                      }
                      title={product.productName}
                      alt={product.productName}
                    />
                  </Link>
                  <div className="extra-info">
                    {product.discount > 0 ? (
                      <span className="percentsaving">
                        Giảm - {`${product.discount}%`}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="caption">
                  <div className="product-deacription-wrapper">
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#333",
                        height: "40px",
                        overflow: "hidden"
                      }}
                    >
                      <Link
                        to={"/productDetail/" + product._id}
                        style={{ color: "inherit" }}
                      >
                        {product.productName}{" "}
                      </Link>
                    </p>
                    <span className="price">
                      <span className="price-new">
                        {formatCurrency(
                          product.price -
                            (product.discount * product.price) / 100
                        )}{" "}
                        đ
                      </span>
                      {product.discount > 0 ? (
                        <span className="price-old">
                          {formatCurrency(product.price)}
                        </span>
                      ) : (
                        <span className="price-old" />
                      )}
                      <div className="saleback">
                        {product.hot === true ? (
                          <span className="saleicon hot">Hot</span>
                        ) : null}
                        {product.new === true ? (
                          <span className="saleicon new">New</span>
                        ) : null}
                        {product.sale === true ? (
                          <span className="saleicon sale">Sale</span>
                        ) : null}
                      </div>
                    </span>
                    <div className="button-group">
                      <button
                        className="btn btn-primary addtocart"
                        onClick={() =>
                          addProductToCart(
                            props.authUser,
                            product,
                            props.cart,
                            props.updateCart
                          )
                        }
                      >
                        <i className="fa fa-shopping-basket" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
  return <>{listProductCardHTML}</>;
};

const mapStateToProps = state => {
  return {
    authUser: state.authUser,
    user: state.userList.user,
    cart: state.userList.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCart: (cartId, cartData) =>
      dispatch(Actions.userActions.updateCartFromSV(cartId, cartData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(productList);
