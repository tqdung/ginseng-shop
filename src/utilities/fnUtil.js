import { message } from "antd";

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};

export const formatDate = (dateString, onlyDate = false) => {
  let date;
  if (!dateString) {
    date = new Date();
  } else {
    let timestamp = Date.parse(dateString);
    date = new Date(timestamp);
  }
  return onlyDate
    ? date.toLocaleDateString("vi-VN")
    : `${date.toLocaleDateString("vi-VN")} ${date.toLocaleTimeString("vi-VN")}`;
};

export const formatCurrency = price => {
  return price ? price.toLocaleString("vi-VN", { currency: "VND" }) : 0;
};

export const initGalleryZoom = name => {
  window.$(name).magnificPopup({
    delegate: "a",
    type: "image",
    mainClass: "mfp-with-zoom",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    }
  });
};

export const getDataForm = form => {
  const data = {};
  for (const key in form) {
    data[key] = form[key].value;
  }
  return data;
};

export const convertToDataForm = (data, form) => {
  for (const key in form) {
    form[key].value = data[key];
  }
  return form;
};

export const cloneData = data => {
  return JSON.parse(JSON.stringify(data));
};

export const isNotEmpty = data => {
  if (window.jQuery.isEmptyObject(data) || !data) {
    return false;
  }
  return true;
};

export const showNotification = notiData => {
  const options = {
    top: 150,
    duration: 2,
    onClose: notiData.fn
  };
  message.config(options);
  switch (notiData.type) {
    case "error":
      message.error(notiData.message);
      break;
    case "warning":
      message.warning(notiData.message);
      break;
    default:
      message.success(notiData.message);
      break;
  }
};

export const clearAuthUser = (path = "/admin", isLogOut = false) => {
  localStorage.removeItem("authUser");
  if (!isLogOut) {
    showNotification({
      type: "error",
      message:
        "Thời Gian Đăng Nhập Hết Hiệu Lực! Vui Lòng Đăng Nhập Lại Để Tiếp Tục Sử Dụng",
      fn: path => window.location.replace(path)
    });
  } else {
    window.location.replace(path);
  }
};

export const getCurrentDate = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = dd + "/" + mm + "/" + yyyy;
  return today;
};

export const getDate = data => {
  var date = new Date(data);
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!
  var yyyy = date.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  date = dd + "/" + mm + "/" + yyyy;
  return date;
};

export const createContentHtmlString = (content, onlyFirst = false) => {
  return onlyFirst
    ? {
        __html: content.length > 200 ? content.slice(0, 200) + "..." : content
      }
    : {
        __html: content
      };
};

export const createOrderId = phone => {
  const date = new Date();
  const orderId =
    date.getDate().toString() +
    (date.getMonth() + 1).toString() +
    date
      .getFullYear()
      .toString()
      .slice(-2) +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getSeconds().toString() +
    phone.toString().slice(-4);
  return orderId;
};

export const change_Unicode = alias => {
  let str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\'|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str;
};

export const convertStatus = status => {
  let res = "";
  switch (status) {
    case "PENDING":
      res = "Đang Xử Lý";
      break;
    case "DELIVERING":
      res = "Đang Giao Hàng";
      break;
    case "COMPLETED":
      res = "Hoàn Thành";
      break;
    default:
      break;
  }
  return res;
};
export const replaceAllDash = str => {
  switch (str) {
    case "cao-linh-chi-han-quoc":
      str = "Cao Linh Chi Hàn Quốc";
      break;
    case "nam-linh-chi-do-han-quoc":
      str = "Nấm Linh Chi Đỏ Hàn Quốc";
      break;

    case "nam-linh-chi-thai-lat-han":
      str = "Nấm Linh Chi Thái Lát Hàn";
      break;
    case "nam-linh-chi-thuong":
      str = "Nấm Linh Chi Thượng";
      break;
    case "nam-linh-chi-vang-han-quoc":
      str = "Nấm Linh Chi Vàng Hàn Quốc";
      break;
    case "tra-linh-chi-han-quoc":
      str = "Trà Linh Chi Hàn Quốc";
      break;
    case "cao-hong-sam-han-quoc":
      str = "Cao Hồng Sâm Hàn Quốc";
      break;
    case "hong-sam-baby-han-quoc":
      str = "Hồng Sâm Baby Hàn Quốc";
      break;
    case "hong-sam-han-quoc":
      str = "Hồng Sâm Hàn Quốc";
      break;
    case "keo-sam-han-quoc":
      str = "Kẹo Sâm Hàn Quốc";
      break;
    case "nham-sam-kho-han-quoc":
      str = "Nhân Sâm Khô Hàn Quốc";
      break;
    case "nhan-sam-tuoi-han-quoc":
      str = "Nhân Sâm Tươi Hàn Quốc";
      break;
    case "nuoc-hong-sam-han-quoc":
      str = "Nước Hồng Sâm Hàn Quốc";
      break;
    case "tra-hong-sam-han-quoc":
      str = "Trà Hồng Sâm Hàn Quốc";
      break;
    case "vien-hong-sam-han-quoc":
      str = "Viên Hồng Sâm Hàn Quốc";
      break;
    case "an-cung-nguu-hoang":
      str = "An Cung Ngưu Hoàng";
      break;
    case "dong-trung-ha-thao":
      str = "Đông Trùng Hạ Thảo";
      break;
    case "thuc-pham-han-quoc":
      str = "Thực Phẩm Hàn Quốc";
      break;
    case "qua-bieu-han-quoc":
      str = "Quà Biếu Hàn Quốc";
      break;
    case "trang-diem-mat":
      str = "Trang Điểm Mặt";
      break;
    case "trang-diem-doi-mat":
      str = "Trang Điểm Mắt";
      break;
    case "trang-diem-mot":
      str = "Trang Điểm Môi";
      break;
    case "trang-diem-moi":
      str = "Trang Điểm Môi";
      break;
    case "dung-cu-trang-diem":
      str = "Dụng Cụ Trang Điểm";
      break;
    case "bo-my-pham":
      str = "Bộ Mỹ Phẩm";
      break;
    case "nuoc-hoa-nam":
      str = "Nước Hoa Nam";
      break;
    case "nuoc-hoa-nu":
      str = "Nước Hoa Nữ";
      break;
    case "xit-toan-than":
      str = "Xịt Toàn Thân";
      break;
    case "kem-duong-da":
      str = "Kem Dưỡng Da & Serum";
      break;
    case "sua-rua-mat-tay-trang":
      str = "Sữa Rửa Mặt & Tẩy Trang";
      break;
    case "mat-na-xit-khoang":
      str = "Mặt Nạ & Xịt Khoáng";
      break;
    case "dau-goi-dau-xa":
      str = "Dầu Gội & Dầu Xả";
      break;
    case "u-toc":
      str = "Ủ Tóc & Serum Dưỡng Tóc";
      break;
    case "tao-kieu-toc":
      str = "Tạo Kiểu Tóc";
      break;
    case "san-pham-han-quoc":
      str = "Sản Phẩm Hàn Quốc";
      break;
    case "san-pham-viet-nam":
      str = "Sản Phẩm Việt Nam";
      break;
    case "my-pham":
      str = "Mỹ Phẩm";
      break;
    case "thuc-pham-chuc-nang":
      str = "Thực Phẩm Chức Năng";
      break;
    default:
      break;
  }
  str = str.replace(/-/g, " ");
  return str;
};
