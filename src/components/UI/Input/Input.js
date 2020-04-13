import React from "react";
import classes from "./Input.scss";
import { initGalleryZoom, showNotification } from "../../../utilities/fnUtil";
import { Select, Switch, DatePicker } from "antd";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import { ImgurAxios } from "../../../services/interceptors";
import loadingScreen from "../../../utilities/loadingScreen";
import Editor from "../Editor";

const dateFormat = "DD/MM/YYYY";

const input = props => {
  let inputElement = null;
  let classname = null;
  const inputClasses = [classes.InputElement, "form-control"];
  let validationError = null;
  const upload = e => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    ImgurAxios({ data: formData })
      .then(res => {
        console.log(res);
        let fileUpload = document.getElementById(
          `file-${props.formKey}-${props.formId}-${props.itemIndex}`
        );
        fileUpload.value = "";
        let imgUpload = document.getElementById(
          `imageUpload-${props.formKey}-${props.formId}-${props.itemIndex}`
        );
        imgUpload.value =
          imgUpload.value +
          `${imgUpload.value ? "," : ""}${res.data.data.link}`;
        showNotification({
          message: "Tải hình ảnh thành công!"
        });
        let event = {
          target: {
            value: imgUpload.value
          }
        };
        props.changed(event);
      })
      .catch(err => {
        console.log(err);
        showNotification({
          type: "error",
          message:
            "Có lỗi trong quá trình xử lý! Vui lòng thực hiện lại hoặc liên hệ quản trị trang!"
        });
      });
  };

  if (props.invalid) {
    inputClasses.push(classes.Invalid);
    validationError = props.errorMessage ? (
      <p className={classes.ValidationError}>{props.errorMessage}</p>
    ) : null;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          onChange={props.changed}
          required={props.mandatory}
          type={props.elementConfig.type}
          className={inputClasses.join(" ")}
          value={props.value}
          disabled={
            (props.notUpdate && props.elementConfig.unique) || props.noEdit
          }
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          onChange={props.changed}
          required={props.mandatory}
          type={props.elementConfig.type}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );
      break;
    case "editor":
      inputElement = (
        <Editor
          style={{ height: "auto" }}
          {...props.elementConfig}
          onChange={props.changed}
          changed={props.changed}
          required={props.mandatory}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );
      break;

    case "password":
      inputElement = (
        <input
          {...props}
          type={props.elementConfig.type}
          className={inputClasses.join(" ")}
          required={props.mandatory}
          value={props.value.join(",")}
          disabled={props.noEdit}
        />
      );
      break;

    case "image":
      classname =
        "gallery_create_product" +
        (props.elementConfig.id ? props.elementConfig.id : "");
      inputElement = (
        <>
          <input
            onChange={props.changed}
            placeholder={props.elementConfig.placeholder}
            type="text"
            className={inputClasses.join(" ")}
            required={props.mandatory}
            value={props.value}
          />
          {props.value ? (
            <div
              className={classname}
              onLoad={initGalleryZoom(
                ".gallery_create_product" + props.elementConfig.id
                  ? props.elementConfig.id
                  : ""
              )}
              style={{ marginTop: "5px" }}
            >
              <a
                href={props.value}
                style={{
                  width: "50px",
                  height: "50px",
                  display: "inline-block",
                  marginRight: "5px"
                }}
              >
                <img
                  src={props.value}
                  alt="Error"
                  width="50"
                  height="50"
                  style={{ pointerEvents: "none" }}
                />
              </a>
            </div>
          ) : null}
        </>
      );
      break;

    case "images":
      classname =
        "gallery_create_product" +
        (props.elementConfig.id ? props.elementConfig.id : "");
      inputElement = (
        <>
          <input
            type="file"
            onChange={upload}
            id={`file-${props.formKey}-${props.formId}-${props.itemIndex}`}
          />
          <input
            id={`imageUpload-${props.formKey}-${props.formId}-${props.itemIndex}`}
            onChange={props.changed}
            placeholder={props.elementConfig.placeholder}
            type="text"
            className={inputClasses.join(" ")}
            required={props.mandatory}
            value={props.value.join(",")}
          />
          {props.value.length ? (
            <div
              className={classname}
              onLoad={initGalleryZoom(
                ".gallery_create_product" + props.elementConfig.id
                  ? props.elementConfig.id
                  : ""
              )}
              style={{ marginTop: "5px" }}
            >
              {props.value.map((img, index) => (
                <a
                  href={img}
                  key={index}
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "inline-block",
                    marginRight: "5px"
                  }}
                >
                  <img
                    src={img}
                    alt="Error"
                    width="50"
                    height="50"
                    style={{ pointerEvents: "none" }}
                  />
                </a>
              ))}
            </div>
          ) : null}
        </>
      );
      break;

    case "multiSelect":
      let children = [];
      children = props.elementConfig.data.map(item => (
        <Select.Option key={item.id}>{item.subName}</Select.Option>
      ));
      inputElement = (
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          onChange={props.changed}
          required={props.mandatory}
          value={props.value}
        >
          {children}
        </Select>
      );
      break;
    case "select":
      let childrens = [];
      childrens = props.elementConfig.data.map(item => (
        <Select.Option key={item.id}>{item.subName}</Select.Option>
      ));
      inputElement = (
        <Select
          style={{ width: "100%" }}
          onChange={props.changed}
          required={props.mandatory}
          value={props.value}
        >
          {childrens}
        </Select>
      );
      break;
    case "switch":
      inputElement = (
        <Switch
          onChange={props.changed}
          required={props.mandatory}
          style={{ marginLeft: "20px" }}
          checked={props.value}
        />
      );
      break;

    case "radioPayment":
      inputElement = (
        <div
          value={props.value}
          required={props.mandatory}
          style={{ marginLeft: "10px" }}
        >
          <input
            className="payment"
            type="radio"
            name="payment"
            value="COD"
            onChange={props.changed}
            defaultChecked
          />{" "}
          COD (Giao Hàng Nhận Tiền)
          <br />
          <input
            className="payment"
            type="radio"
            name="payment"
            value="CK"
            checked={props.value === "CK" ? true : false}
            onChange={props.changed}
          />{" "}
          Chuyển Khoản
          {props.value === "CK" ? (
            <div style={{ marginLeft: "25px", marginTop: "10px" }}>
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
          ) : null}
          <br />
        </div>
      );
      break;

    case "radioGender":
      inputElement = (
        <div
          value={props.value}
          required={props.mandatory}
          style={{ marginLeft: "10px" }}
        >
          <input
            className="gender"
            type="radio"
            name="gender"
            value="male"
            checked={props.value === "male" ? true : false}
            onChange={props.changed}
            disabled={
              (props.notUpdate && props.elementConfig.unique) || props.noEdit
            }
          />{" "}
          Nam
          <input
            className="gender"
            type="radio"
            name="gender"
            value="female"
            checked={props.value === "female" ? true : false}
            onChange={props.changed}
            disabled={
              (props.notUpdate && props.elementConfig.unique) || props.noEdit
            }
          />{" "}
          Nữ
          <br />
        </div>
      );
      break;

    case "date":
      inputElement = (
        <div>
          <br />
          <DatePicker
            name="date"
            value={moment(props.value, dateFormat)}
            format={dateFormat}
            onChange={props.changed}
            disabled={
              (props.notUpdate && props.elementConfig.unique) || props.noEdit
            }
          />
        </div>
      );
      break;

    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          required={props.mandatory}
          className={inputClasses.join(" ")}
        />
      );
      break;
  }

  return (
    <>
      <div className="form-group required">
        <label
          className={props.mandatory ? "control-label" : ""}
          style={{ fontWeight: "bold", width: "auto" }}
        >
          {props.label}
        </label>
        {inputElement}
        {validationError}
      </div>
    </>
  );
};

export default input;
