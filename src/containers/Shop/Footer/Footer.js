import React from "react";
import CNBCT from "../../../assets/images/catalog/cnbct.png";
import tc1 from "../../../assets/images/catalog/tc1.png";
import tc2 from "../../../assets/images/catalog/tc2.png";
import tc3 from "../../../assets/images/catalog/tc3.png";
import tc4 from "../../../assets/images/catalog/tc4.png";
import tc5 from "../../../assets/images/catalog/tc5.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { endPoints } from "../../../services/config";
import classes from "./Footer.scss";
class Footer extends React.Component {
  // state = {
  //   HTMLSocialModel: []
  // };

  // componentWillMount() {
  //   axios
  //     .get(endPoints.HTML_CONTENT)
  //     .then(res => {
  //       this.setState({ HTMLSocialModel: res.social });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  render() {
    // let listSocial;
    // listSocial = (
    //   <>
    //     {this.state.HTMLSocialModel.map(social => {
    //       if (social.visible) {
    //         return (
    //           <li key={social._id} className={social._id}>
    //             <a href={social.link} rel="noopener noreferrer" target="_blank">
    //               <i className={social.iconName} />
    //             </a>
    //           </li>
    //         );
    //       }
    //       return null;
    //     })}
    //   </>
    // );

    return (
      <footer className={classes.footer}>
        <section className={classes.foot_1}>
          <div className="container">
            <ul>
              <li>
                <img src={tc1} alt="" />
              </li>
              <li>
                <img src={tc2} alt="" />
              </li>
              <li>
                <img src={tc3} alt="" />
              </li>
              <li>
                <img src={tc4} alt="" />
              </li>
              <li>
                <img src={tc5} alt="" />
              </li>
            </ul>
          </div>
        </section>
        <section className={classes.foot_2}>
          <div className="container">
            <div className="col-md-6">
              <div className="col-md-4">
                <ol className={classes.ol1_foot_1}>
                  <li>
                    <div className={classes.t_foot_1}>Hỗ Trợ KH</div>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>
                      Hướng Dẫn Mua Hàng{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>
                      Hướng Dẫn Thanh Toán{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>
                      Chính Sách Đổi Trả{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>
                      Câu Hỏi Thường Gặp
                    </Link>
                  </li>
                </ol>
              </div>
              <div className="col-md-4">
                <ol className={classes.ol1_foot_2}>
                  <li>
                    <div className={classes.t_foot_2}>Về Shop</div>
                  </li>
                  <li>
                    <Link to={{ pathname: "introduction" }}>
                      Giới Thiệu Shop{" "}
                    </Link>
                  </li>
                  <li>
                    <a href="chinh-sach-bao-mat.htm">Chính Sách Bảo Mật </a>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>
                      Chính Sách Giải Quyết Khiếu Nại{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>
                      Điều Khoản Sử Dụng{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>Tin Tức</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>Tuyển Dụng</Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>Liên hệ</Link>
                  </li>
                </ol>
              </div>
              <div className="col-md-4">
                <ol className={classes.ol1_foot_3}>
                  <li>
                    <div className={classes.t_foot_3}>Liên Hệ Hợp Tác</div>
                  </li>

                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>
                      Quy Định Bán Hàng{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>
                      Chính Sách Bán Hàng{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: "pageNotFound" }}>
                      Chính Sách Kiểm Duyệt{" "}
                    </Link>
                  </li>
                </ol>
              </div>
            </div>

            <div className="col-md-6">
              <div className="col-md-6">
                <ol className={classes.ol1_foot_4}>
                  <li style={{ width: "100%" }}>
                    <div className={classes.t_foot_4}>
                      Phương Thức Thanh Toán
                    </div>
                  </li>
                  <li>
                    <i className={`${classes.icon_vs} ${classes.icon_web}`}></i>
                  </li>
                  <li>
                    <i className={`${classes.icon_ms} ${classes.icon_web}`}></i>
                  </li>
                  <li>
                    <i
                      className={`${classes.icon_jcb} ${classes.icon_web}`}
                    ></i>
                  </li>
                  <li>
                    <i className={`${classes.icon_tm} ${classes.icon_web}`}></i>
                  </li>
                  <li>
                    <i className={`${classes.icon_it} ${classes.icon_web}`}></i>
                  </li>
                  <li>
                    <i className={`${classes.icon_tg} ${classes.icon_web}`}></i>
                  </li>
                </ol>
              </div>
              <div className="col-md-6">
                <div className={classes.t_foot_5}>Liên Hệ Với Chúng Tôi</div>
                <ol className={classes.ol1_foot_5}>
                  <li>
                    <a
                      href="https://www.facebook.com/gianhanghanquoc.kr/?eid=ARAbB6drDr_BUnMuV70BITK9Pyx8ENXq2z_tzKGGb88W6DumLgZFdpZxar3fKESNpo1uGfjmeqGtqU_Z"
                      rel="nofollow"
                      target="_blank"
                    >
                      <i
                        className={`${classes.icon_fb} ${classes.icon_web}`}
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.m.me/gianhanghanquoc.kr"
                      rel="nofollow"
                      target="_blank"
                    >
                      <i
                        className={`${classes.icon_ms} ${classes.icon_web}`}
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a href="skype:live:7841490b682b0175?chat">
                      <i className={`${classes.icon_skype}`}></i>
                    </a>
                  </li>
                  <li>
                    <Link to={{ pathname: "aboutUs" }}>
                      <i className={`${classes.icon_kakao}`}></i>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="http://zalo.me/0354955106
"
                      rel="nofollow"
                      target="_blank"
                    >
                      <i
                        className={`${classes.icon_zl} ${classes.icon_web}`}
                      ></i>
                    </a>
                  </li>
                </ol>
                <div className={classes.t_foot_5}>Chứng nhận</div>
                <a href="#" rel="nofollow" target="_blank">
                  <img src={CNBCT} alt="Chứng nhận" width="160" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className={classes.foot_3}>
          <div className="container">
            {/* <div className="col-md-4">
              <strong>Trụ sở Hà Nội:</strong> Số 182 Đường X - P. Y - Q.Z - TP
              Hà Nội <br />
              Hotline: 0934.553.386
            </div> */}
            <div className="col-md-8">
              {/* <i class="fal fa-map-marker-alt"></i> */}
              <strong>Địa chỉ:</strong> Chung cư Petroland – 2 đường 62, phường
              Bình Trưng Đông, Quận 2, TP. Hồ Chí Minh <br />
              <strong>Hotline:</strong> 0354 955 106 <br />
              <strong>Email:</strong> gianhanghanquocvn@gmail.com <br />
              <strong>Website:</strong> www.gianhanghanquoc.com
            </div>
            <div className="col-md-6"></div>
            {/* <div className="col-md-4">
              <strong>Trụ sở Korea:</strong> 경기도 시흥시 정왕동 1740-1, 3층
              303호 <br />
              Hotline: (+82)313.xxx.xxx{" "}
            </div> */}
          </div>
        </section>
        <section className={classes.foot_4}>
          <div className="container">
            <div className="col-md-12">
              © 2019 - Bản quyền của Shop Gian Hàng Hàn Quốc -
              gianhanghanquoc.com
              <br />
              {/* MSDN: 0108048007 do Sở kế hoạch và đầu tư TP HCM cấp */}
              <p></p>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default Footer;
