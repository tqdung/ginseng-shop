import React from "react";
import loadingScreen from "../../../utilities/loadingScreen";
import Iimg from "../../../components/UI/LoadingImage/Limg";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from "./Blogs.scss";
import filterUtils from "../../../utilities/filter";
import {
  isNotEmpty,
  formatDate,
  createContentHtmlString
} from "../../../utilities/fnUtil";
import { endPoints } from "../../../services/config";
import { FacebookProvider, Page, Like } from "react-facebook";
class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HTMLBlogModel: [],
      filteredHTMLBlogModel: [],
      visible: 4,
      latestVisible: 3
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore = () => {
    this.setState(prev => {
      return {
        visible: prev.visible + 4
      };
    });
  };

  componentWillMount() {
    loadingScreen.showLoading();
    axios
      .get(endPoints.BLOG_LIST_API)
      .then(res => {
        this.setState(
          {
            HTMLBlogModel: res,
            filteredHTMLBlogModel: res
          },
          loadingScreen.hideLoading
        );
      })
      .catch(err => {
        loadingScreen.hideLoading();
        console.error(err);
      });
  }

  componentDidMount() {
    loadingScreen.hideLoading();
  }

  filterProductFn = params => {
    let filteredHTMLBlogModel = filterUtils.filterArrFn(
      this.state.HTMLBlogModel,
      params
    );
    this.setState({
      filteredHTMLBlogModel
    });
  };

  render() {
    let styleCenter;
    styleCenter = {
      margin: "40px auto 0"
      // width: "70%"
    };

    let listBlogRight = null,
      listBlogLeft = null;
    listBlogLeft = (
      <>
        {isNotEmpty(this.state.filteredHTMLBlogModel)
          ? this.state.filteredHTMLBlogModel
              .slice(0, this.state.latestVisible)
              .map(blog => {
                return (
                  <div
                    className={`${classes.blog_item} blog_item`}
                    key={blog._id}
                  >
                    <div className="summary">
                      <div className="blog-left-content">
                        <div className="blog_stats">
                          <div className="date-time hl">
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
                              className="read-more-link"
                              to={"/blogDetail/" + blog._id}
                            >
                              Đọc tiếp
                            </Link>
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
    listBlogRight = (
      <>
        {isNotEmpty(this.state.filteredHTMLBlogModel)
          ? this.state.filteredHTMLBlogModel
              .slice(0, this.state.visible)
              .map(blog => {
                return (
                  <div
                    className={`${classes.blog_item} blog_item`}
                    key={blog._id}
                  >
                    <div className="summary">
                      <div className="blog-left-content">
                        <div className="blog_stats">
                          <div className="date-time hl">
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
                              className="read-more-link"
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
        <p
          className={classes.productsProgressBar}
          data-auto-id="productsProgressBar"
        >
          Bạn đã xem{" "}
          {this.state.visible > this.state.filteredHTMLBlogModel.length
            ? this.state.filteredHTMLBlogModel.length
            : this.state.visible}{" "}
          / {this.state.filteredHTMLBlogModel.length} bài viết
        </p>

        {this.state.visible < this.state.filteredHTMLBlogModel.length && (
          <button
            onClick={this.loadMore}
            type="button"
            className={classes.loadMoreBtn}
          >
            Load more
          </button>
        )}
      </>
    );
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
                  CẨM NANG SỨC KHỎE
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
                    CẨM NANG SỨC KHỎE
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container information-blogger-blogs">
          <div className="row">
            <div className={classes.align_center}>
              <input
                type="text"
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm bài viết"
                id="input-search"
                className="form-control"
                onChange={event =>
                  this.filterProductFn({ title: event.target.value })
                }
              />
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className={`${classes.title_left}`}>
                  <span>Bài viết mới</span>
                </div>
                <div className={`${classes.content_left}`}>{listBlogLeft}</div>
              </div>
              <div className="col-md-8">
                <div id="content" style={styleCenter}>
                  <div className="blog all-blogs">
                    <div className="blog_grid_holder">{listBlogRight}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blogs;
