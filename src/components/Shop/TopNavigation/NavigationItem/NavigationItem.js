import React from "react";
import { columnDropdownList } from "../../../../services/config";
import { Link } from "react-router-dom";
import $ from "jquery";
let columnArr = [];
let i = 0;
while (i < columnDropdownList) {
  columnArr.push("auto");
  i++;
}
const styleList = {
  display: "grid"
  // gridTemplateColumns: columnArr.join(" ")
};

// hide Search Input when change page
function hideSearchField() {
  // $('.navbar-nav').css("opacity", "0");
  if ($(window).width() <= 979) {
    $(".navbar-nav").css("display", "none");
    $(".expandable").removeClass("active");

    $(".megamenu ").css("display", "none");
    $(".top_level").removeClass("active");
  }

  $("#search").css("display", "none");
  $(".header-search.dropdown-toggle").removeClass("active");
  return false;
}

const navigationItem = props => {
  let zIndexStyle;
  let zIndex = 290000 - props.index;
  zIndexStyle = {
    zIndex: zIndex.toString()
  };

  let subNavList = null,
    subNavListHTML = null;
  subNavList = props.subNavList;

  let li = ["top_level"];
  li.push(props.type);

  if (typeof subNavList !== "undefined") {
    subNavListHTML = (
      <>
        {subNavList.map((subNav, index) => {
          return (
            <li key={index}>
              {subNav.id === "cam-nang-suc-khoe" ? (
                <Link onClick={hideSearchField} to="/blogs">
                  Cẩm Nang Sức Khỏe
                </Link>
              ) : subNav.id === "ve-chung-toi" ? (
                <Link onClick={hideSearchField} to="/aboutUs">
                  Liên Hệ
                </Link>
              ) : (
                <Link
                  onClick={hideSearchField}
                  to={{ pathname: `/category/${props.parentNav}/${subNav.id}` }}
                >
                  {subNav.subName}
                </Link>
              )}
            </li>
          );
        })}
      </>
    );
  }

  if (props.type === "dropdown") {
    return (
      <li className={li.join(" ")} style={zIndexStyle}>
        {/* {props.parentNav === "home" ? (
          <Link to="/home"> {props.children}</Link>
        ) : props.parentNav === "blogs" ? (
          <Link to="/blogs"> {props.children}</Link>
        ) : props.parentNav === "tin-tuc-su-kien" ? (
          <Link to="/tin-tuc-su-kien"> {props.children}</Link>
        ) : props.parentNav === "lien-he" ? (
          <Link to="/about-us"> {props.children}</Link>
        ) : (
          <a href="/" style={{ cursor: "default", pointerEvents: "none" }}>
            {" "}
            {props.children}
          </a>
        )} */}
        {props.parentNav === "home" ? (
          <Link to="/home"> {props.children}</Link>
        ) : (
          <a href="/" style={{ cursor: "default", pointerEvents: "none" }}>
            {" "}
            {props.children}
          </a>
        )}

        <div
          className="dropdown-menu megamenu "
          style={{ zIndex: "999999999!important" }}
        >
          <div className="dropdown-inner">
            <ul style={styleList} className="list-unstyled childs_2">
              {subNavListHTML}
            </ul>
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li className={li.join(" ")}>
        {props.parentNav === "cam-nang-suc-khoe" ? (
          <Link to="/blogs"> Cẩm Nang Sức Khỏe</Link>
        ) : props.parentNav === "tin-tuc-su-kien" ? (
          <Link to="/tin-tuc-su-kien"> {props.children}</Link>
        ) : props.parentNav === "lien-he" ? (
          <Link to="/aboutUs"> Liên Hệ</Link>
        ) : props.parentNav === "home" ? (
          <Link to="/home">Trang Chủ</Link>
        ) : (
          <Link to={{ pathname: `category/${props.parentNav}` }}>
            {props.children}
          </Link>
        )}
      </li>
    );
  }
};

export default navigationItem;
