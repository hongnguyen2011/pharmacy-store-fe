import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { VND } from "../../../utils/convertVND";
import {
    changeStatusOrderService,
    deleteOrder,
} from "../../../services/orderServices";
import { Table } from "antd";
import { toast } from "react-toastify";
import { getAllOrderApi } from "../../../redux/slices/orderSlice";
import { getAllProductsApi } from "../../../redux/slices/productSlice";
export default function PendingOrder() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("token"));
    const { listOrder } = useSelector((state) => state.orderSlice);
    const listOrderPending = listOrder.filter((order) => {
        return order.status === 2 || order.status === 1;
    });
    const onDelete = async (id) => {
        const result = await deleteOrder(id, token);
        if (result.status === 200) {
            toast.success("Xóa thành công!");
            await dispatch(getAllOrderApi());
            navigate("/admin/orders/pending");
        } else {
            toast.error("Xóa thất bại!");
        }
    };
    const onEdit = async (id, status) => {
        const result = await changeStatusOrderService(id, status === 1 ? 3 : 4, token);
        console.log(result);
        if (result.data.status === 200) {
            toast.success("Phê duyệt thành công!");
            dispatch(getAllOrderApi());
            dispatch(getAllProductsApi());
            navigate("/admin/orders/pending");
        } else {
            toast.error("Phê duyệt thất bại!");
        }
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên khách hàng",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
            render: (value) => <>{VND.format(value)}</>,
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (value) => {
                return (
                    <>{value === 1 ? "Chưa thanh toán" : "Đã thanh toán"}</>
                )
            }
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginLeft: "4px" }}
                        onClick={() => onEdit(record.id, record.status)}
                    >
                        Phê duyệt
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ marginLeft: "4px" }}
                        onClick={() => onDelete(record.id)}
                    >
                        Xóa
                    </Button>
                    <Button
                        variant="contained"
                        style={{ background: "blue" }}
                        sx={{ marginLeft: "4px" }}
                        onClick={() => {
                            navigate(`/admin/orders/detail/${record.id}`, {
                                state: record,
                            });
                        }}
                    >
                        Chi tiết
                    </Button>
                </>
            ),
        },
    ];
    const rows = listOrderPending.length > 0 ? listOrderPending : [];

    return (
        <>
            <div style={{ height: "78vh", width: "100%", padding: "20px" }}>
                <Table columns={columns} dataSource={rows} />
            </div>
        </>
    );
}
