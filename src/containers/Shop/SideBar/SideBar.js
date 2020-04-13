// import React, { useState } from "react";
import classes from "./SideBar.scss";
import { headerContent, sidebarContent } from "../../../data/data";
import { Link } from "react-router-dom";

import React, { Component } from "react";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false
    };

    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
  }

  onMouseEnterHandler() {
    this.setState({
      isHover: true
    });
  }

  onMouseLeaveHandler() {
    this.setState({
      isHover: false
    });
  }

  render() {
    let sidebar = sidebarContent.categories.map((parentItem, index) => {
      if (index !== 0 && index !== 5 && index !== 6 && index !== 7) {
        return (
          <div className="card" key={index}>
            <ul
              data-toggle="collapse"
              data-target={`#collapse${index}`}
              aria-expanded="true"
              aria-controls="collapseOne"
              className={classes.ul_dm_hea}
              onMouseEnter={this.onMouseEnterHandler}
              onMouseLeave={this.onMouseLeaveHandler}
            >
              <li>
                <Link to={`/category/${parentItem.id}`}>
                  {parentItem.name}
                  {/* <span>(78)</span> */}
                  {this.state.isHover ? (
                    <div className={classes.sub_dm_hea}>
                      <div className="card-body">
                        {parentItem.subCategories.map((item, index) => {
                          return (
                            <ul key={index} className={classes.ul_sub_dm_hea}>
                              <li>
                                <Link
                                  to={`/category/${parentItem.id}/${item.id}`}
                                >
                                  {item.subName}
                                </Link>
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </Link>
              </li>
            </ul>

            {/* <div
              id={`collapse${index}`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                {parentItem.subCategories.map((item, index) => {
                  return (
                    <ul key={index}>
                      <li>
                        -{" "}
                        <Link to={`/category/${parentItem.id}/${item.id}`}>
                          {" "}
                          {item.subName}
                        </Link>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div> */}
          </div>
        );
      }
    });
    return (
      <div className={classes.side_bar}>
        <h2 className={classes.side_bar_title}>Danh mục sản phẩm</h2>
        <div className="accordion" id="accordionExample">
          {sidebar}
        </div>
      </div>
    );
  }
}

export default SideBar;
