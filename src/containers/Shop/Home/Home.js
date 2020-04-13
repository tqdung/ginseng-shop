import React from "react";
import { slideShowDelayTime } from "../../../services/config";
import CategorySlider from "../../../components/Shop/Slider/CategoriesSlider/CategorySlider/CategorySlider";
import TabCategories from "../../../components/Shop/TabCategories/TabCategories";
import SideBar from "../SideBar/SideBar";
import classes from "./Home.scss";
import { connect } from "react-redux";
import {
  isNotEmpty,
  replaceAllDash,
  formatDate,
  createContentHtmlString
} from "../../../utilities/fnUtil";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Iimg from "../../../components/UI/LoadingImage/Limg";
import "./Home.css";
import loadingScreen from "../../../utilities/loadingScreen";
import axios from "axios";
import { endPoints } from "../../../services/config";
import ProductCard from "../../../components/UI/ProductCard";
import { headerContent } from "../../../data/data";
import { FacebookProvider, Page, Like } from "react-facebook";
class Body extends React.Component {
  state = {
    // typeProduct: {},
    // typeList: [],
    type: [],
    filteredHTMLBlogModel: [],
    visible: 3,
    productVisible: 10
  };

  componentWillReceiveProps() {}
  componentWillMount() {
    loadingScreen.showLoading();
    // let length = headerContent.categories;
    var foundIn = [0, 5, 6, 7];
    let parentCategory = headerContent.categories.map((parentItem, index) => {
      return parentItem.id;
    });
    parentCategory = parentCategory.filter(function(eachElem, index) {
      return foundIn.indexOf(index) == -1;
    });

    parentCategory.forEach((item, index) => {
      axios
        .get(endPoints.PRODUCT_CATEGORY_API, {
          params: {
            page: "category",
            of: item,
            category: item
          }
        })
        .then(res => {
          this.setState({
            type: [
              ...this.state.type,
              {
                tenloai: item,
                mangSP: res,
                stt:
                  item === "san-pham-han-quoc"
                    ? 1
                    : item === "thuc-pham-chuc-nang"
                    ? 2
                    : item === "my-pham"
                    ? 3
                    : 4
              }
            ]
          });
        });
    });
    axios
      .get(endPoints.BLOG_LIST_API)
      .then(res => {
        this.setState(
          {
            filteredHTMLBlogModel: res
          },
          loadingScreen.hideLoading
        );
      })
      .catch(err => {
        loadingScreen.hideLoading();
        console.error(err);
      });
    // axios
    //   .get(endPoints.PRODUCT_LIST_API, {})
    //   .then(res => {
    //     let result = res.map(a => a.type[0]);
    //     const uniqueSet = new Set(result);
    //     const typeArr = [...uniqueSet];
    //     console.log(typeArr);
    //     typeArr.forEach((item, index) => {
    //       axios.get(endPoints.GET_RANDOM_LIST + item).then(res => {
    //         this.setState({
    //           type: [...this.state.type, { tenloai: item, mangSP: res }]
    //         });
    //       });
    //     });
    //   })
    //   .catch(err => {
    //     loadingScreen.hideLoading();
    //     console.error(err);
    //   });
  }

  componentDidMount() {
    loadingScreen.hideLoading();
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: slideShowDelayTime,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      arrows: true
      // customPaging: i => <div className="slick-next" />
    };

    const settings_tab = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: slideShowDelayTime,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      draggable: false,
      arrows: true
      // customPaging: i => <div className="slick-next" />
    };
    const settings_blog = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      arrows: true
    };
    const settingsProduct = {
      dots: false,
      infinite: false,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      draggable: true,
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

    let catSliderList = [];

    for (const i in this.props.htmlContentModel.eventSlide) {
      catSliderList.push(
        <div key={i}>
          <CategorySlider
            sliderItem={this.props.htmlContentModel.eventSlide[i]}
          />
        </div>
      );
    }
    let listBlogRight = (
      <>
        {isNotEmpty(this.state.filteredHTMLBlogModel)
          ? this.state.filteredHTMLBlogModel
              .slice(0, this.state.visible)
              .map((blog, index) => {
                return (
                  <div className={`${classes.blog_item} blog_item`} key={index}>
                    <div className="summary">
                      <div className="blog-left-content">
                        <div className="blog_stats">
                          <div className={`${classes.date_time} date-time hl`}>
                            {formatDate(blog.createdAt, true)}
                          </div>
                        </div>
                        <h2 className={`${classes.blog_title} `}>
                          <Link to={"/blogDetail/" + blog._id}>
                            {blog.title}
                          </Link>
                        </h2>
                        <div className={classes.content_blog}>
                          <div className={`${classes.image} image`}>
                            <Iimg
                              style={{
                                width: "160px",
                                height: "120px",
                                border: "1px solid rgba(128,128,128,0.57) "
                              }}
                              src={blog.image}
                              alt="Blogs"
                              title="Blogs"
                              className="img-thumbnail"
                            />
                          </div>
                          <div
                            className={`${classes.blog_right_content} blog-right-content`}
                            id="blog-short-content"
                          >
                            <p
                              dangerouslySetInnerHTML={createContentHtmlString(
                                blog.content,
                                true
                              )}
                            />
                            <Link
                              className={`${classes.read_more_link} read-more-link`}
                              to={"/blogDetail/" + blog._id}
                            >
                              Đọc tiếp
                            </Link>
                            {/* <FacebookProvider appId="308048456550201">
                              <Like
                                href="http://www.facebook.com/gianhanghanquoc.kr"
                                colorScheme="dark"
                                showFaces
                                share
                              />
                            </FacebookProvider> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          : null}
      </>
    );
    return (
      <>
        <div
          id="common-home"
          className="container-fluid"
          style={{ paddingLeft: 0, paddingRight: 0, margin: 0 }}
        >
          <div className="content-top banner">
            {/* <div className={classes.GlobalBanner}>
              <strong>
                Gian hàng Hàn Quốc tự hào mang đến các sản phẩm bảo vệ và nâng
                cao sức khỏe cho người tiêu dùng Việt Nam. Chúng tôi cam kết các
                sản phẩm của Gian hàng Hàn Quốc là các sản phẩm được nhập khẩu
                chính ngạch, nói không và hàng giả hàng nhái! Sức khỏe là tài
                sản vô giá hơn mọi thứ trên đời này, hãy bỏa vệ sức khỏe ngay
                hôm nay cho chính bạn và những người thân yêu của mình.
              </strong>
            </div> */}
            <div id="content">
              {/**Slider */}
              {this.props.htmlContentModel.bannerSlide ? (
                <Slider {...settings} className="banner-slide">
                  {this.props.htmlContentModel.bannerSlide.map(
                    (banner, index) => {
                      return (
                        <div key={index}>
                          <Link to={banner.eventLink}>
                            <Iimg
                              src={banner.image}
                              alt={`Main-banner-${index + 1}`}
                              className="img-responsive background_img"
                            />
                          </Link>
                        </div>
                      );
                    }
                  )}
                </Slider>
              ) : null}

              <div className="container">
                <div className="row">
                  <div
                    className={`${classes.side_bar} "col-md-12 col-lg-3 side_bar`}
                  >
                    <SideBar></SideBar>
                    <div className={`${classes.adv_prod_h} adv_prod_h`}>
                      <a
                        target="_blank"
                        href="category/gian-hang-han-quoc/nham-sam-kho-han-quoc"
                      >
                        <img
                          src="https://sieuthikorea.com/uploads/danhmuc/thuc-pham-chuc-nang-1571190181-hpuk0.jpg"
                          alt="Thực Phẩm Chức Năng"
                        />
                      </a>
                    </div>
                    {/* <FacebookProvider appId="308048456550201">
                      <Page
                        href="https://www.facebook.com/gianhanghanquoc.kr"
                        tabs="timeline"
                      />
                    </FacebookProvider> */}

                    {/* <div
                      class="fb-page"
                      data-href="https://www.facebook.com/gianhanghanquoc.kr"
                      data-tabs="timeline"
                      data-width="222"
                      data-height="500"
                      data-small-header="false"
                      data-adapt-container-width="true"
                      data-hide-cover="false"
                      data-show-facepile="true"
                    >
                      <blockquote
                        cite="https://www.facebook.com/gianhanghanquoc.kr"
                        class="fb-xfbml-parse-ignore"
                      >
                        <a href="https://www.facebook.com/gianhanghanquoc.kr">
                          Gian hàng Hàn Quốc
                        </a>
                      </blockquote>
                    </div> */}
                    {/* <div className={`${classes.adv_prod_h} adv_prod_h`}>
                      <a
                        target="_blank"
                        href="category/trang-diem/dung-cu-trang-diem"
                      >
                        <img
                          src="https://sieuthikorea.com/uploads/danhmuc/my-pham-han-quoc-1565429845-i0ob0.jpg"
                          alt="Mỹ Phẩm Hàn Quốc"
                        />
                      </a>
                    </div> */}

                    {/* <div className={`${classes.adv_prod_h} adv_prod_h`}>
                      <a
                        target="_blank"
                        href="category/gian-hang-han-quoc/vien-hong-sam-han-quoc"
                      >
                        <img
                          src="https://sieuthikorea.com/uploads/danhmuc/van-phong-qua-tang-1566359671-iubfb.jpg"
                          alt="Quà Tặng"
                        />
                      </a>
                    </div> */}
                    <div className={`${classes.adv_prod_h} adv_prod_h`}>
                      <a
                        target="_blank"
                        href="category/nam-linh-chi-han-quoc/nam-linh-chi-do-han-quoc"
                      >
                        <img
                          src="https://sieuthikorea.com/uploads/danhmuc/thuc-pham-tieu-dung-1571210229-deq8u.jpg"
                          alt="Thực Phẩm Tiêu Dùng"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-md-12 col-lg-9"
                    style={{ marginTop: "45px" }}
                  >
                    {this.state.type
                      .sort((a, b) => {
                        if (a.stt < b.stt) {
                          return -1;
                        }
                        if (a.stt > b.stt) {
                          return 1;
                        }
                        return 0;
                      })

                      .map((element, index) => (
                        <div className={classes.category} key={index}>
                          <div className={classes.category_title_container}>
                            <p className={classes.category_title}>
                              {replaceAllDash(element.tenloai)}
                            </p>
                            <Link
                              className={classes.link_ct}
                              to={{ pathname: `category/${element.tenloai}` }}
                            >
                              Xem tất cả &#8250;
                            </Link>
                            <Link
                              className={classes.link_ct}
                              to={{ pathname: `category/${element.tenloai}` }}
                            ></Link>
                          </div>

                          <Slider {...settingsProduct}>
                            {element.mangSP
                              .slice(0, this.state.productVisible)
                              .map((card, index) => {
                                return (
                                  <div
                                    className={`${classes.box_product} box-product`}
                                    key={index}
                                  >
                                    <ProductCard cardContent={card} />
                                  </div>
                                );
                              })}
                          </Slider>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="row camnang-video">
                  <div className="col-md-6">
                    <div className="title_main">
                      <span>Cẩm Nang Sức Khỏe</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Link
                      className={classes.link_ct_blog}
                      to={{ pathname: `blogs` }}
                    >
                      Xem tất cả &#8250;
                    </Link>
                  </div>
                  <div className="col-md-12">
                    {/* <Slider {...settings_blog}>{listBlogRight}</Slider> */}
                    {listBlogRight}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    htmlContentModel: state.htmlContent.htmlContent
  };
};

export default connect(mapStateToProps)(Body);
