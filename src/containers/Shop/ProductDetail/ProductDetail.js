import React from "react";
import ProductCard from "../../../components/UI/ProductCard";
import axios from "axios";
import { endPoints } from "../../../services/config";
import loadingScreen from "../../../utilities/loadingScreen";
import "react-image-gallery/styles/css/image-gallery.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  formatCurrency,
  isNotEmpty,
  cloneData,
  createContentHtmlString,
  showNotification
} from "../../../utilities/fnUtil";
import "./ProductDetail.css";
import { convertItemToName } from "../../../utilities/categoriesUtil";
import classes from "./ProductDetail.scss";
import { Tag } from "antd";
import cartService from "../../../services/cartService";
import { connect } from "react-redux";
import Actions from "../../../redux/rootActions";
import ImageGallery from "react-image-gallery";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Magnifier from "react-magnifier";
import ReactImageMagnify from "react-image-magnify";
import ReactImageZoom from "react-image-zoom";
import { FacebookProvider, Comments } from "react-facebook";
// function CustomNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style }}
//       onClick={onClick}
//       title="Next"
//     />
//   );
// }

// function CustomPrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style }}
//       onClick={onClick}
//       title="Prev"
//     />
//   );
// }
class ProductDetail extends React.Component {
  state = {
    product: {},
    randomList: []
  };

  constructor(props) {
    super(props);
    this.styleSale = {
      background: "#eb2128",
      padding: "0 5px",
      letterSpacing: "1px",
      textAlign: "center",
      verticalAlign: "middle",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "#fff",
      marginTop: "20px",
      marginLeft: "20px"
    };
    this.styleHot = {
      background: "#ff6e07",
      padding: "0 5px",
      letterSpacing: "1px",
      textAlign: "center",
      verticalAlign: "middle",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "#fff",
      marginLeft: "20px"
    };
    this.styleNew = {
      background: "#07ff31",
      padding: "0 5px",
      letterSpacing: "1px",
      textAlign: "center",
      verticalAlign: "middle",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "#fff",
      marginLeft: "20px"
    };

    this.stylePercentSaving = {
      color: "#ec2229",
      padding: "0",
      textAlign: "center",
      textTransform: "capitalize",
      background: "#fff",
      fontSize: "14px",
      height: "40px",
      width: "40px",
      borderRadius: " 50%",
      lineHeight: "40px",
      fontWeight: "500",
      boxShadow: "0 0 4px 2px rgba(0,0,0,0.15)",
      display: "inline-block",
      marginTop: "10px",
      marginLeft: "10px"
    };

    this.numberInput = React.createRef();
  }
  componentDidMount() {}
  componentWillMount() {
    loadingScreen.showLoading();
    axios
      .get(endPoints.PRODUCT_API + this.props.match.params.product_id)
      .then(res => {
        axios
          .get(endPoints.GET_RANDOM_LIST + res.type[0], {
            params: {
              productId: res._id
            }
          })
          .then(rl => {
            this.setState(
              {
                product: res,
                randomList: rl
              },
              loadingScreen.hideLoading
            );
          });
      })
      .catch(err => {
        loadingScreen.hideLoading();
        this.props.history.replace("/pageNotFound");
      });
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.match.params.product_id !== nextProps.match.params.product_id
    ) {
      loadingScreen.showLoading();
      window.scrollTo(0, 0);
      axios
        .get(endPoints.PRODUCT_API + nextProps.match.params.product_id)
        .then(res => {
          axios
            .get(endPoints.GET_RANDOM_LIST + res.type[0], {
              params: {
                productId: res._id
              }
            })
            .then(rl => {
              this.setState(
                {
                  product: res,
                  randomList: rl
                },
                loadingScreen.hideLoading
              );
            });
        })
        .catch(err => {
          loadingScreen.hideLoading();
          this.props.history.replace("/pageNotFound");
        });
    }
    return true;
  }
  componentDidUpdate = () => {
    // console.log(this.numberInput);
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  addProductToCart() {
    cartService.saveCartItemLSGuest(this.state.product);
  }

  onCheckout() {
    cartService.saveCartItemLSGuest(this.state.product);
    this.props.history.push({ pathname: "/checkout" });
  }

  filterInput() {
    var number = document.getElementById("input-quantity");

    number.onkeydown = function(e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode === 8
        )
      ) {
        return false;
      }
    };
  }
  renderImage = item => {
    // return <p>aaa</p>;
    // this.state.product.images.map(img => {
    //   return <Magnifier src={img} width={500} />;
    // });
    return (
      <ReactImageZoom
        {...{
          width: 400,
          height: 250,
          zoomWidth: 500,
          img: item.original,
          offset: {
            vertical: 0,
            horizontal: 10
          }
        }}
      />
    );
  };
  imageHover(item) {
    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            isFluidWidth: true,
            src: item.thumbnail
          },
          largeImage: {
            width: 640,
            height: 480,
            src: item.original
          },
          enlargedImagePortalId: "myPortal",
          lensStyle: {
            backgroundColor: "rgba(0,0,0,.6)"
          }
        }}
        {
          ...{
            // isHintEnabled: false
            // enlargedImageContainerDimensions: { width: "100%", height: "100%" }
            // shouldHideHintAfterFirstActivation: true,
            // enlargedImagePosition: "over",
            // enlargedImageContainerStyle: { Index: 1000 }
          }
        }
      />
    );
  }
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable: false,
      arrows: true,
      // customPaging: i => <div className="slick-next" />,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    if (isNotEmpty(this.state.product)) {
      const imagesArray = this.state.product.images.map(image => ({
        original: image,
        thumbnail: image
        // renderItem: this.renderImage
      }));

      const properties = {
        showFullscreenButton: false,
        showPlayButton: false,
        renderItem: this.imageHover,
        showNav: false,
        items: imagesArray,
        showThumbnails: true
      };
      return (
        <div className="main-content">
          <div id="breadcrumb">
            <div className="container">
              <div className="row">
                <ul className="breadcrumb">
                  <h2
                    className="page-title"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    {this.state.product.productName}
                  </h2>
                  <li>
                    <a href="/">
                      <i className="fa fa-home" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      style={{ pointerEvents: "none", cursor: "default" }}
                    >
                      {this.state.product.productName}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="productpage productdetailpage">
            <div id="product-product" className="container">
              <div className="row">
                <div id="content" className="col-sm-12 productpage">
                  <div className="row">
                    <div className="col-sm-8 product-left text_center">
                      <div className="product-info">
                        <div className="left product-image thumbnails">
                          <ImageGallery {...properties} />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 product-right">
                      <div id="myPortal" />
                      <h3 className="product-title">
                        {this.state.product.productName}
                      </h3>
                      {this.state.product.hot === true ? (
                        <span className="saleicon hot" style={this.styleHot}>
                          Hot
                        </span>
                      ) : null}
                      {this.state.product.new === true ? (
                        <span className="saleicon new" style={this.styleNew}>
                          New
                        </span>
                      ) : null}
                      {this.state.product.sale === true ? (
                        <span className="saleicon sale" style={this.styleSale}>
                          Sale
                        </span>
                      ) : null}
                      <ul
                        className="list-unstyled"
                        style={{ borderTop: "none" }}
                      >
                        {/* <li className={classes.Category}>
                          <span className="desc">
                            Kiểu Loại:{" "}
                            {convertItemToName(this.state.product.type).map(
                              (item, index) => (
                                <Link key={index} to={`/category/${item.id}`}>
                                  <Tag color="cyan" key={index}>
                                    {item.subName}
                                  </Tag>
                                </Link>
                              )
                            )}
                          </span>
                        </li> */}
                        {/* <li className={classes.Category}>
                          <span className="desc">
                            Hình Thức:{" "}
                            {convertItemToName(
                              this.state.product.form,
                              "form"
                            ).map((item, index) => (
                              <Link
                                key={index}
                                to={`/category/form/${item.id}`}
                              >
                                <Tag color="cyan" key={index}>
                                  {item.subName}
                                </Tag>
                              </Link>
                            ))}
                          </span>
                        </li> */}
                        {/* <li className={classes.Category}>
                          <span className="desc">
                            Màu sắc:{" "}
                            {convertItemToName(
                              this.state.product.color,
                              "color"
                            ).map((item, index) => (
                              <Link
                                key={index}
                                to={`/category/color/${item.id}`}
                              >
                                <Tag color="cyan" key={index}>
                                  {item.subName}
                                </Tag>
                              </Link>
                            ))}
                          </span>{" "}
                        </li> */}
                      </ul>
                      <ul className="list-unstyled price">
                        <li>
                          <h2 style={{ color: "#ec2229" }}>
                            {formatCurrency(
                              this.state.product.price -
                                (this.state.product.discount *
                                  this.state.product.price) /
                                  100
                            )}{" "}
                            đ
                          </h2>
                        </li>
                        {this.state.product.discount > 0 ? (
                          <span style={{ fontSize: "18px" }}>Giảm</span>
                        ) : null}
                        {this.state.product.discount > 0 ? (
                          <span
                            style={this.stylePercentSaving}
                            className="stylePercentSaving"
                          >{`${this.state.product.discount}%`}</span>
                        ) : null}

                        {this.state.product.discount > 0 ? (
                          <span
                            style={{
                              display: "block",
                              color: "#000",
                              textDecoration: "line-through",
                              fontSize: "20px"
                            }}
                          >
                            {formatCurrency(this.state.product.price)} VND
                          </span>
                        ) : (
                          <span />
                        )}
                      </ul>
                      <ul className=" other-info">
                        <li>
                          {" "}
                          Giao tận nơi trên toàn quốc chỉ trong 1 ngày đến 4
                          ngày
                        </li>
                        <li>Sản phẩm nhập chính hãng tại Hàn Quốc</li>
                        <li>
                          Đổi trả trong 7 ngày nếu hàng không đạt yêu cầu{" "}
                        </li>
                        <li>Nhận hàng thu COD</li>
                      </ul>

                      <div id="product">
                        <div className="form-group cart">
                          <label
                            className={`${classes.vertical_center} control-label qty`}
                            htmlFor="input-quantity"
                          >
                            Số Lượng
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            defaultValue="1"
                            size="2"
                            id="input-quantity"
                            className="form-control"
                            min="1"
                            ref={this.numberInput}
                            onKeyDown={() => this.filterInput()}
                          />
                          <label
                            className={`${classes.vertical_center} control-label qty`}
                            htmlFor="input-quantity"
                          >
                            <p style={{ marginLeft: "10px" }}>
                              {" "}
                              {this.state.product.remain} sản phẩm có sẵn
                            </p>
                          </label>

                          <div className="btn-group">
                            <button
                              type="button"
                              id="button-cart"
                              data-loading-text="Loading..."
                              onClick={() => this.addProductToCart()}
                              className="btn btn-primary btn-lg btn-block"
                              style={{ marginLeft: "20px", height: "42px" }}
                            >
                              Thêm vào giỏ hàng
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary wishlist"
                              onClick={() => this.onCheckout()}
                            >
                              Thanh Toán
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- product page tab code start--> */}
                    <div className="col-md-12">
                      <div id="tabs_info" className="product-tab col-sm-12">
                        <ul className="nav nav-tabs">
                          <li className="active">
                            <a href="#tab-description" data-toggle="tab">
                              Mô tả
                            </a>
                          </li>
                          {/* <li className="">
                            <a href="#tab-comment" data-toggle="tab">
                              Đánh Giá
                            </a>
                          </li> */}
                        </ul>
                        <div className="tab-content">
                          <div className="tab-pane active" id="tab-description">
                            <div
                              dangerouslySetInnerHTML={createContentHtmlString(
                                this.state.product.description
                              )}
                            />
                          </div>
                          {/* <div className="tab-pane " id="tab-comment">
                            <FacebookProvider appId="308048456550201">
                              <Comments href="http://www.facebook.com/gianhanghanquoc.kr" />
                            </FacebookProvider>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.randomList.length ? (
                    <div className="box related">
                      <div className="box-heading">
                        <h2 className="products-section-title">
                          Có thể bạn muốn mua
                        </h2>
                      </div>
                    </div>
                  ) : null}
                  <Slider {...settings} className={classes.relate_products}>
                    {this.state.randomList.map((card, index) => {
                      return (
                        <div className="box-product" key={index}>
                          <ProductCard cardContent={card} />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
