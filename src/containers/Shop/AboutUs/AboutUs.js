import React from "react";
import loadingScreen from "../../../utilities/loadingScreen";
import "./AboutUs.css";
class AboutUs extends React.Component {
  componentWillMount() {
    loadingScreen.showLoading();
  }

  componentDidMount() {
    loadingScreen.hideLoading();
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="main-content">
        <div id="breadcrumb">
          <div className="container">
            <div className="row">
              <ul className="breadcrumb">
                <h2 className="page-title">Liên Hệ </h2>
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
                    Liên Hệ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="content" style={{ margin: "auto", width: "60%" }}>
          <h3>Giới Thiệu Gian Hàng Hàn Quốc</h3>
          <p>
            Gian Hàng Hàn Quốc tự hào mang đến các sản phẩm bảo vệ và nâng cao
            sức khỏe cho người tiêu dùng Việt Nam. Chúng tôi cam kết các sản
            phẩm của Gian hàng Hàn Quốc là các sản phẩm được nhập khẩu chính
            ngạch, nói không và hàng giả hàng nhái! Sức khỏe là tài sản vô giá
            hơn mọi thứ trên đời này, hãy bỏa vệ sức khỏe ngay hôm nay cho chính
            bạn và những người thân yêu của mình.
          </p>
          <div className="resp-container">
            <iframe
              className="resp-iframe"
              title="address"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.255507321843!2d106.77468361511751!3d10.791732361861158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175268421fcc55f%3A0x7f4a3ae859bc710d!2sPetroland!5e0!3m2!1sen!2s!4v1575447503089!5m2!1sen!2s"
              width="750"
              height="450"
              frameBorder="0"
              style={{ border: "0" }}
              allowFullScreen
            />
          </div>
          <div className>
            <h3 style={{ marginTop: "50px" }}>Thông Tin Chuyển Khoản</h3>
            <p>Tên Ngân Hàng: TECHCOMBANK</p>
            <p>Tên tài khoản: LY THANH TUNG</p>
            <p>Số tài khoản: 19032466996017</p>
            <p>Ngân hàng Techcombank Chi nhánh Bạch Đằng</p>
            <hr />
            <p>Tên Ngân Hàng: VIETINBANK</p>
            <p>Tên tài khoản: LY THANH TUNG</p>
            <p>Số tài khoản: 102005654018</p>
            <p>Ngân hàng Vietinbak Chi nhánh Thủ Đức</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
