import React from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./product.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { VND } from "../../../utils/convertVND";
import { toast } from "react-toastify";
import { deleteProduct } from "../../../services/productService";
import { getAllProductsApi } from "../../../redux/slices/productSlice";
export default function Product() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const listProduct = useSelector((state) => state.product.products);
    const onDelete = async (id) => {
        const result = await deleteProduct(id);
        if (result.status === 200) {
            toast.success("Xóa thành công!");
            await dispatch(getAllProductsApi());
            navigate("/admin/products");
        } else {
            toast.error("Xóa thất bại!");
        }
    };
    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: "pathImg",
            key: "pathImg",
            render: (text) => (
                <img className="img__product--admin" src={text} alt="product" />
            ),
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            width: 200
        },
        {
            title: "Giá sản phẩm",
            key: "price",
            render: (text) => {
                return <>{VND.format(text.price)}</>;
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Trạng thái",
            key: "status",
            render: (value) => <>{value ? "Còn hàng" : "Hết hàng"}</>,
        },

        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ marginLeft: "4px" }}
                        onClick={() => {
                            navigate(`/admin/product/edit/${record.id}`, {
                                state: record,
                            });
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ marginLeft: "4px" }}
                        onClick={() => onDelete(record.id)}
                    >
                        Xóa
                    </Button>
                </>
            ),
        },
    ];
    const rows = listProduct.length > 0 ? listProduct : [];

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "50px",
                }}
            >
                <h2>Danh sách sản phẩm</h2>
                <Button
                    style={{
                        marginRight: "100px",
                        padding: "10px",
                    }}
                    color="success"
                    variant="contained"
                    onClick={() => {
                        navigate("/admin/product/add");
                    }}
                >
                    Thêm sản phẩm
                </Button>
            </div>
            <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
                <Table columns={columns} dataSource={rows} />
            </div>
        </>
    );
}
