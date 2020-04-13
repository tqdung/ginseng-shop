import React, { Component } from "react";
import loadingScreen from "../../../utilities/loadingScreen";
import "./Introduction.css";
class Introduction extends Component {
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
                <h2 className="page-title">Giới Thiệu Gian Hàng Hàn Quốc</h2>
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
                    Giới Thiệu Gian Hàng Hàn Quốc
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <h1 className="title_f_page">Giới Thiệu Gian Hàng Hàn Quốc</h1>
              <div className="f-detail clearfix">
                <h1>
                  <strong>
                    <span style={{ fontSize: "18px" }}>
                      Giới Thiệu Gian Hàng Hàn Quốc
                    </span>
                  </strong>
                </h1>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    Gian Hàng Hàn Quốc ( Shop Gian Hàng Hàn Quốc ) là Shop liên
                    doanh với nhà đầu tư Hàn Quốc. Tại&nbsp;
                    <a href="https://sieuthikorea.com/">
                      <strong>Gianhanghanquoc.com</strong>
                    </a>
                    &nbsp;chúng tôi&nbsp;cam kết mang chất lượng và trải nghiệm
                    mua sắm trực tuyến chuẩn Hàn Quốc đến cho từng khách hàng
                    Việt. Các sản phẩm&nbsp;được bán tại Gian Hàng Hàn Quốc là
                    hàng nhập khẩu chính thống từ Hàn Quốc 100%.
                  </span>
                </p>
                <p>
                  <strong>
                    <span style={{ fontSize: "16px" }}>
                      Thông điệp từ&nbsp;Gianhanghanquoc.com
                    </span>
                  </strong>
                </p>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    <strong>CHẠM ĐẾN TRÁI TIM</strong> – Chúng tôi đam mê, sáng
                    tạo, tư duy thoát khỏi khuôn mẫu kinh doanh và làm tất cả để
                    cung cấp những trải nghiệm mua sắm trực tuyến độc đáo cũng
                    như truyền cảm hứng yêu thương và kết nối đến với từng khách
                    hàng thuộc mọi lứa tuổi và lĩnh vực khác nhau.
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    Với phương châm bảo mật thông tin khách hàng một cách tốt
                    nhất, các thông tin cá nhân và thanh toán đều được mã hóa và
                    được bảo vệ bằng những công nghệ tiên tiến nhất trên thế
                    giới hiện nay.
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    <strong>SỰ KẾT NỐI GIỮ DOANH NGHIỆP HÀN – VIỆT</strong>
                    &nbsp;:
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    Chúng tôi còn có nhiệm vụ kết nối giữa doanh nghiệp Hàn Quốc
                    và Việt Nam, là nơi quảng bá cho doanh nghiệp Hàn Quốc tại
                    Viêt Nam và doanh nghiệp Việt Nam tại Hàn Quốc.
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    <strong>
                      <a href="https://sieuthikorea.com/">
                        Gianhanghanquoc.com
                      </a>
                    </strong>
                    &nbsp;là địa chỉ tin cậy với nhiều mặt hàng luôn được
                    Kikentech&nbsp;cập nhật thường xuyên về mẫu mã, giá cả, chất
                    lượng…
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    Gian Hàng Hàn Quốc&nbsp;hiện đang là ứng dụng mua bán hàng
                    đầu tại Hàn Quốc và Việt Nam. Đến với Gian Hàng Hàn Quốc,
                    bạn sẽ có những trải nghiệm đầy thú vị và an toàn khi mua và
                    bán hàng trên ứng dụng di động hoặc trên website trực tuyến.
                    Với chính sách Đảm Bảo, bạn sẽ nhận được hàng, hoặc được
                    hoàn lại tiền!
                  </span>
                </p>
                <p>
                  <strong>
                    <span style={{ fontSize: "16px" }}>
                      THỎA THÍCH MUA SẮM VỚI GIAN HÀNG HÀN QUỐC
                    </span>
                  </strong>
                </p>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    Gian Hàng Hàn Quốc, trang mua bán trực tuyến hàng đầu chuyên
                    bán sản phẩm&nbsp;Korea 100% với nhiều tiện lợi và an toàn,
                    dễ dàng tìm thấy mọi thứ bạn cần ở mức giá tốt nhất.
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    Công cụ tìm kiếm thông minh với&nbsp;gợi ý có thể tìm thấy
                    sản phẩm Hàn Quốc&nbsp;ưng ý trong tất cả danh mục như: Mỹ
                    Phẩm Hàn Quốc, Thực Phẩm Hàn Quốc.
                  </span>
                </p>
                <p>
                  <strong>
                    <span style={{ fontSize: "16px" }}>
                      Tại Việt Nam, Gian Hàng Hàn Quốc ( Shop Gian Hàng Hàn Quốc
                      ) là&nbsp;shop được nhiều khách&nbsp;yêu mến với tiêu chí:
                    </span>
                  </strong>
                </p>
                <ul>
                  {" "}
                  <li>
                    {" "}
                    <p>
                      <span style={{ fontSize: "16px" }}>
                        Chỉ cung cấp sản phẩm có nguồn gốc từ Hàn Quốc.
                      </span>
                    </p>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <p>
                      <span style={{ fontSize: "16px" }}>
                        Sự hài lòng của khách hàng là số 1.
                      </span>
                    </p>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <p>
                      <span style={{ fontSize: "16px" }}>
                        Chịu phạt gấp 10 lần nếu hàng kém chất lượng.
                      </span>
                    </p>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <p>
                      <span style={{ fontSize: "16px" }}>
                        Đổi trả sản phẩm trong vòng 7 ngày.
                      </span>
                    </p>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <p>
                      <span style={{ fontSize: "16px" }}>
                        Chất lượng tốt nhất, uy tín cao nhất.
                      </span>
                    </p>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <p>
                      <span style={{ fontSize: "16px" }}>
                        Giá hợp lý nhất cho đại lý và khách mua lẻ.
                      </span>
                    </p>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <p>
                      <span style={{ fontSize: "16px" }}>
                        Đội ngũ nhân viên thân thiện, năng động.
                      </span>
                    </p>{" "}
                  </li>
                </ul>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    <strong>CÔNG TY TNHH SIÊU THỊ KOREA</strong>
                    <br />
                    <strong>Liên hệ:</strong>
                    <br />
                    <strong>Trụ sở TP HCM:</strong>&nbsp;Chung cư Petroland – 2
                    đường 62, phường Bình Trưng Đông, Quận 2, TP. Hồ Chí
                    Minh&nbsp;
                    <br />
                    Hotline: 0354 955 106
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: "16px" }}>
                    <strong>Page Gian Hàng Hàn Quốc:</strong>&nbsp;
                    <a
                      href="https://www.facebook.com/gianhanghanquoc.kr/?eid=ARAbB6drDr_BUnMuV70BITK9Pyx8ENXq2z_tzKGGb88W6DumLgZFdpZxar3fKESNpo1uGfjmeqGtqU_Z"
                      rel="nofollow"
                      target="_blank"
                    >
                      facebook.com/gianhanghanquoc.kr
                    </a>
                    <br />
                    <strong>Liên lạc qua Email:</strong>{" "}
                    gianhanghanquocvn@gmail.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Introduction;
