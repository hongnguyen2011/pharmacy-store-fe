import React, { useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatusProductApi,
  getAllProductsApi,
} from "../../../redux/slices/productSlice";
import "./product.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { VND } from "../../../utils/convertVND";
import { toast } from "react-toastify";

// ['id', 'name', 'price', 'image', 'description', 'status_number', 'createdAt', 'updatedAt', 'category_id', 'Category']
// https://mui.com/x/react-data-grid/column-definition/

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listProduct = useSelector((state) => state.product.products);

  const changeStatusProduct = async (idProduct, status_number) => {
    await toast.success("The status product has been successfully changed!");
    await dispatch(changeStatusProductApi(idProduct, status_number));
  };

  const columns = [
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "image",
      headerName: "Image",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img className="img__product--admin" src={params.value} alt="product" />
      ),
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "name",
      headerName: "Name Product",
      width: 300,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "price",
      headerName: "Price",
      width: 130,
      type: "number",
      valueFormatter: (params) => {
        return VND.format(params.value);
      },
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "status_number",
      headerName: "Status Product",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 140,
      valueFormatter: (params) => {
        const statusProduct = params.value ? "Stocking" : "Out of stock";
        return statusProduct;
      },
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const product = params.row;

        return (
          <>
            {product.status_number ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  changeStatusProduct(product.id, false);
                }}
              >
                Out of stock
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  changeStatusProduct(product.id, true);
                }}
              >
                Stocking
              </Button>
            )}

            <Button
              variant="contained"
              color="warning"
              sx={{ marginLeft: "4px" }}
              onClick={() => {
                navigate(`/admin/edit_product/${product.id}`, {
                  state: product,
                });
              }}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];

  const rows = listProduct.length > 0 ? listProduct : [];

  return (
    <>
      <Button
        sx={{ ml: 2, mb: 2 }}
        variant="contained"
        onClick={() => {
          navigate("/admin/add_product");
        }}
      >
        Add Product
      </Button>

      <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
        <DataGrid
          rowHeight={80}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
