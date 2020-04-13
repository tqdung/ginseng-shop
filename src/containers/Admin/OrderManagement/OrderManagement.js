import React from "react";
import { Table, Popconfirm, Select, Menu, Tag, Button, Divider } from "antd";
import { createDataOrderListColumns } from "../../../models/tableModel";
import Actions from "../../../redux/rootActions";
import { connect } from "react-redux";
import { cloneData, showNotification } from "../../../utilities/fnUtil";
import "./OrderManagement.css";
class OrderManagement extends React.Component {
  state = {
    searchText: ""
  };

  constructor(props) {
    super(props);
    props.getOrderList();
  }

  // search on table
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  // reset search field on table
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  updateOrderStatus = (id, statusName) => {
    const clonedOrder = cloneData(
      this.props.orderStore.orderList.find(item => item._id === id)
    );
    if (clonedOrder.order.status === statusName) {
      return showNotification({
        type: "warning",
        message: "Trạng Thái Đang Tồn Tại! Không Cần Cập Nhật"
      });
    }
    clonedOrder.order.status = statusName;
    this.props.updateOrderById(id, clonedOrder);
  };

  handleChange = value => {
    let status = "";
    console.log(`selected ${value}`);
    this.props.orderStore.orderList.forEach(element => {
      if (value === element._id) {
        console.log(element.order.status);
      }
    });
    // console.log(status);
  };

  render() {
    const dataColumns = createDataOrderListColumns(
      this.handleSearch,
      this.handleReset,
      this.state.searchText,
      this.searchInput
    ).slice();
    dataColumns.push({
      title: "Cập Nhật Trạng Thái",
      key: "action",
      render: record => (
        <>
          {/* <Menu
            defaultValue="lucy"
            style={{ width: 150 }}
            onClick={() => this.handleChange(record.status)}
          >
            <Menu.Item
              value="PENDING"
              className={
                record.status === "PENDING" ? "selected_menu_item" : ""
              }
            >
              <Popconfirm
                title="Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng?"
                onConfirm={() => this.updateOrderStatus(record._id, "PENDING")}
                okText="Đồng Ý"
                cancelText="Hủy"
              >
                <Tag color="#87d068" onClick={e => e.stopPropagation()}>
                  Đang Xử Lý
                </Tag>
              </Popconfirm>
            </Menu.Item>
            <Menu.Item
              value="DELIVERING"
              className={
                record.status === "DELIVERING" ? "selected_menu_item" : ""
              }
            >
              <Popconfirm
                title="Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng?"
                onConfirm={() =>
                  this.updateOrderStatus(record._id, "DELIVERING")
                }
                okText="Đồng Ý"
                cancelText="Hủy"
              >
                <Tag color="#108ee9" onClick={e => e.stopPropagation()}>
                  Đang Giao Hàng
                </Tag>
              </Popconfirm>
            </Menu.Item>
            <Menu.Item
              value="COMPLETED"
              className={
                record.status === "COMPLETED" ? "selected_menu_item" : ""
              }
            >
              <Popconfirm
                title="Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng?"
                onConfirm={() =>
                  this.updateOrderStatus(record._id, "COMPLETED")
                }
                okText="Đồng Ý"
                cancelText="Hủy"
              >
                <Tag color="#9e0b0b" onClick={e => e.stopPropagation()}>
                  Hoàn Thành
                </Tag>
              </Popconfirm>
            </Menu.Item>
          </Menu> */}
          <Popconfirm
            title="Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng?"
            onConfirm={() => this.updateOrderStatus(record._id, "PENDING")}
            okText="Đồng Ý"
            cancelText="Hủy"
          >
            <Button type="default">Đang Xử Lý</Button>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm
            title="Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng?"
            onConfirm={() => this.updateOrderStatus(record._id, "DELIVERING")}
            okText="Đồng Ý"
            cancelText="Hủy"
          >
            <Button type="default">Đang Giao Hàng</Button>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm
            title="Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng?"
            onConfirm={() => this.updateOrderStatus(record._id, "COMPLETED")}
            okText="Đồng Ý"
            cancelText="Hủy"
          >
            <Button type="default">Hoàn Thành</Button>
          </Popconfirm>
        </>
      )
    });

    const columns = dataColumns;
    let data = !this.props.orderStore.orderList.length
      ? []
      : this.props.orderStore.orderList.map(item => {
          return {
            key: item._id,
            _id: item._id,
            customerInfo: item.customerInfo ? item.customerInfo : "",
            receiverInfo: item.receiverInfo ? item.receiverInfo : "",
            deliveryDate: item.order ? item.order.deliveryDate : "",
            note: item.order ? item.order.note : "",
            payment: item.order ? item.order.payment : "",
            finalPrice: item.order ? item.order.finalPrice : "",
            status: item.order ? item.order.status : "",
            productOrder: item.order ? item.order.productOrder : "",
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          };
        });

    return (
      <>
        <div style={{ marginTop: "80px" }}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: true }}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    orderStore: state.orderList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderList: () => dispatch(Actions.orderActions.getOrderListFromSV()),
    updateOrderById: (id, data) =>
      dispatch(Actions.orderActions.updateOrderToSV(id, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagement);
