import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { VND } from "../../../utils/convertVND";
import { changeStatusOrderApi } from "../../../redux/slices/orderSlice";

export default function PendingOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { listOrder } = useSelector((state) => state.orderSlice);
  const listOrderPending = listOrder.filter((order) => {
    return order.status_order === 0;
  });

  const columns = [
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "id",
      headerName: "ID",
      width: 130,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "fullName",
      headerName: "Customer",
      width: 150,
      sortable: false,
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "total_order",
      headerName: "Total price",
      width: 130,
      type: "number",
      sortable: false,
      filterable: false,
      valueFormatter: (params) => {
        return VND.format(params.value);
      },
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "createdAt",
      headerName: "Created at",
      width: 130,
      sortable: false,
      filterable: false,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("en-US");
      },
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "action",
      headerName: "Action",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const order = params.row;
        const {id} = order;

        return (
          <>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(changeStatusOrderApi(id,1));
              }}
            >
              Deliveried
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ marginLeft: "5px" }}
              onClick={() => {
                navigate(`/admin/orders/view_detail/${order.id}`, {
                  state: order,
                });
              }}
            >
              View Detail
            </Button>
          </>
        );
      },
    },
  ];

  const rows = listOrderPending.length > 0 ? listOrderPending : [];

  return (
    <>
      <div style={{ height: "78vh", width: "100%", padding: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
