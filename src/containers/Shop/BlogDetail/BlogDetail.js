import React from "react";
import loadingScreen from "../../../utilities/loadingScreen";
import Iimg from "../../../components/UI/LoadingImage/Limg";
import axios from "axios";
import { Link } from "react-router-dom";
import { endPoints } from "../../../services/config";
import {
  createContentHtmlString,
  isNotEmpty,
  formatDate
} from "../../../utilities/fnUtil";
import classes from "./BlogDetail.scss";
import { FacebookProvider, Page, Like } from "react-facebook";
class BlogDetail extends React.Component {
  state = {
    blog: {},
    filteredHTMLBlogModel: [],
    latestVisible: 3
  };
  componentDidMount() {
    loadingScreen.hideLoading();
    window.scrollTo(0, 0);
  }

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

    axios
      .get(endPoints.BLOG_API + this.props.match.params.blog_id)
      .then(res => {
        this.setState(
          {
            blog: res
          },
          loadingScreen.hideLoading()
        );
      })
      .catch(err => {
        loadingScreen.hideLoading();
        console.error(err);
      });
  }

  render() {
    let styleCenter;
    styleCenter = {
      margin: "40px auto 0",
      width: "70%"
    };
    let listBlogLeft = (
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
                  Cẩm Nang Sức Khỏe
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
                    Cẩm Nang Sức Khỏe
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={`${classes.title_left}`}>
                <span>Bài viết mới</span>
              </div>
              <div className={`${classes.content_left}`}>{listBlogLeft}</div>
            </div>
            <div className="col-md-8">
              <div id="content" className="single-blog" style={styleCenter}>
                {/* <FacebookProvider appId="308048456550201">
                  <Like
                    href="http://www.facebook.com/gianhanghanquoc.kr"
                    colorScheme="dark"
                    showFaces
                    share
                  />
                </FacebookProvider> */}
                <h2
                  className="page-title"
                  style={{ color: "rgba(236, 34, 41, 0.9)" }}
                >
                  {this.state.blog.title}
                </h2>
                <div className="blog-img" style={{ marginBottom: "10px" }}>
                  <img
                    src={this.state.blog.image}
                    alt={this.state.blog.title}
                    title={this.state.blog.title}
                    className="img-thumbnail"
                  />
                </div>
                <p
                  dangerouslySetInnerHTML={createContentHtmlString(
                    this.state.blog.content
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogDetail;
