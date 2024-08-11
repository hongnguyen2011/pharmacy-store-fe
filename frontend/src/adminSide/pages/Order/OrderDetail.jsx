import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getDetailsOrderService } from "../../../services/orderServices";
import { useLocation } from "react-router-dom";
import "./order.css";
import { VND } from "../../../utils/convertVND";

export default function OrderDetail() {
  const [orderArray, setOrderArray] = useState([]);
  const { state } = useLocation();
  const order = state;

  useEffect(() => {
    const fetchGetAllOrderAnUserApi = async () => {
      const respone = await getDetailsOrderService(state);
      setOrderArray(respone.data);
    };
    fetchGetAllOrderAnUserApi();
  }, []);

  const columns = [
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "img_product",
      headerName: "Image",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <img
            className="img__product--admin"
            src={params.value}
            alt="product"
          />
        );
      },
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "name_product",
      headerName: "Name Product",
      width: 150,
      sortable: false,
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "payment_orderItem",
      headerName: "Total price",
      width: 130,
      type: "number",
      sortable: false,
      filterable: false,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "quantity",
      headerName: "Quantity",
      width: 130,
      type: "number",
      sortable: false,
      filterable: false,
    },
  ];

  const rows = orderArray.map((orderItem) => {
    const product = orderItem.Product;
    return {
      ...orderItem,
      name_product: product.name,
      img_product: product.image,
    };
  });

  const converDate = (value) => {
    const date = new Date(value);
    const day = date.toLocaleDateString("en-US");
    const time = date.toLocaleTimeString();
    return day + " " + time;
  };

  return (
    <div className="container px-5">
      <h3 className="mb-2">OrderDetail</h3>
      <div className="mb-3">
        <p>Order {order.id}</p>
        <p>Create at {converDate(order.createdAt)}</p>
      </div>
      <div style={{ height: "40vh", width: "100%" }}>
        <DataGrid
          rowHeight={80}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </div>
      <div className="container mt-5">
        <div className="row ">
          <div className=" col-6 ">
            <div className="info_user--order">
              <p>{order.fullName}</p>
              <p>{order.receiving_address}</p>
              <p>{order.phone_number}</p>
            </div>
          </div>
          <div className="col-6 ">
            <div className="info_price--order">
              <h4>Totalize</h4>
              <p className="mt-2">
                Tổng Tiền({orderArray.length} Sản phẩm) :{" "}
                {VND.format(order.total_order)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
