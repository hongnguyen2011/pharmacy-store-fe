import React from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCategoryServices } from "../../../services/categoryServices";
import { getAllCategoryApi } from "../../../redux/slices/categorySlice";
export default function Category() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listProduct = useSelector((state) => state.category.categories);
    const onDelete = async (id) => {
        const result = await deleteCategoryServices(id);
        if (result.status === 200) {
            toast.success("Xóa thành công!");
            await dispatch(getAllCategoryApi());
            navigate("/admin/categories");
        } else {
            toast.error("Xóa thất bại!");
        }
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên loại sản phẩm",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Hastag",
            dataIndex: "slug",
            key: "slug",
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
                            navigate(`/admin/category/edit/${record.id}`, {
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
                <h2>Danh sách loại sản phẩm</h2>
                <Button
                    style={{
                        marginRight: "100px",
                        padding: "10px",
                    }}
                    color="success"
                    variant="contained"
                    onClick={() => {
                        navigate("/admin/category/add");
                    }}
                >
                    Thêm loại sản phẩm
                </Button>
            </div>
            <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
                <Table columns={columns} dataSource={rows} />
            </div>
        </>
    );
}
