import Button from "@mui/material/Button";
import { Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllOrderApi } from "../../../redux/slices/orderSlice";
import { getAllProductsApi } from "../../../redux/slices/productSlice";
import { changeStatusOrderService } from "../../../services/orderServices";
import { VND } from "../../../utils/convertVND";
export default function DeliveriedOrder() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { listOrder } = useSelector((state) => state.orderSlice);
    const token = JSON.parse(localStorage.getItem('token'));
    const listOrderDeliveried = listOrder.filter((order) => {
        return order.status === 3 || order.status === 4 || order.status === 5;
    });
    const onEdit = async (id) => {
        const result = await changeStatusOrderService(id, 5, token);
        if (result.data.status === 200) {
            toast.success("Phê duyệt thành công!");
            dispatch(getAllOrderApi());
            dispatch(getAllProductsApi());
            navigate("/admin/orders/deliveried");
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
            dataIndex: "status",
            key: "status",
            render: (value) => <>{value === 3 ? "Chưa thanh toán" : value === 4 ? "Đã thanh toán" : "Đã hoàn thành"}</>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
                    {
                        record.status === 5 ? <Button
                            variant="contained"
                            disabled
                            color="success"
                            sx={{ marginLeft: "4px" }}
                            onClick={() => onEdit(record.id)}
                        >
                            Đã Hoàn Thành
                        </Button> : <Button
                            variant="contained"
                            color="success"
                            sx={{ marginLeft: "4px" }}
                            onClick={() => onEdit(record.id)}
                        >
                            Hoàn Thành
                        </Button>
                    }
                    <Button
                        variant="contained"
                        style={{ background: "blue", color: "#fff" }}
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
    const rows = listOrderDeliveried.length > 0 ? listOrderDeliveried : [];

    return (
        <>
            <div style={{ height: "78vh", width: "100%", padding: "20px" }}>
                <Table columns={columns} dataSource={rows} />
            </div>
        </>
    );
}
