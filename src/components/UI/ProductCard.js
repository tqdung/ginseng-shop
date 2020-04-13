import React from "react";
import Iimg from "../../components/UI/LoadingImage/Limg";
import { formatCurrency, cloneData } from "../../utilities/fnUtil";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Actions from "../../redux/rootActions";
import cartService from "../../services/cartService";

function addProductToCart(authUser, product, cart, fn) {
  cartService.saveCartItemLSGuest(product);
}

const productCard = props => {
  let styleImage_ratio_2_3;
  styleImage_ratio_2_3 = {
    width: "200px",
    height: "200px"
  };

  return (
    <div className="slider-item ">
      <div className="product-block product-thumb transition">
        <div className="product-block-inner">
          <div className="image">
            <Link to={{ pathname: "/productDetail/" + props.cardContent._id }}>
              <Iimg
                style={styleImage_ratio_2_3}
                src={props.cardContent.images[0]}
                title={props.cardContent.productName}
                alt={props.cardContent.productName}
                className=" reg-image"
              />

              <Iimg
                style={styleImage_ratio_2_3}
                className="hover-image"
                src={
                  props.cardContent.images[1]
                    ? props.cardContent.images[1]
                    : props.cardContent.images[0]
                }
                title={props.cardContent.productName}
                alt={props.cardContent.productName}
              />
            </Link>
            <div className="extra-info">
              {props.cardContent.discount > 0 ? (
                <span className="percentsaving">
                  Giảm - {`${props.cardContent.discount}%`}
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
                  style={{ color: "inherit" }}
                  to={{ pathname: "/productDetail/" + props.cardContent._id }}
                >
                  {props.cardContent.productName}
                </Link>
              </p>
              <strong>
                <span className="price-new">
                  {formatCurrency(
                    props.cardContent.price -
                      (props.cardContent.discount * props.cardContent.price) /
                        100
                  )}{" "}
                  đ
                </span>
              </strong>
              {props.cardContent.discount > 0 ? (
                <span className="price-old">
                  {formatCurrency(props.cardContent.price)}
                </span>
              ) : (
                <span className="price-old" />
              )}
              <div className="saleback">
                {props.cardContent.hot === true ? (
                  <span className="saleicon hot">Hot</span>
                ) : null}
                {props.cardContent.new === true ? (
                  <span className="saleicon new">New</span>
                ) : null}
                {props.cardContent.sale === true ? (
                  <span className="saleicon sale">Sale</span>
                ) : null}
              </div>

              <div className="button-group">
                <button
                  type="button"
                  className="btn btn-primary addtocart"
                  onClick={() =>
                    addProductToCart(
                      props.authUser,
                      props.cardContent,
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
          <span
            className="related_default_width"
            style={{ display: "none", visibility: "hidden" }}
          />
        </div>
      </div>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(productCard);
