import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { VND } from "../../../utils/convertVND";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
export default function DeliveriedOrder() {
    const navigate = useNavigate();

    const { listOrder } = useSelector((state) => state.orderSlice);
    const listOrderDeliveried = listOrder.filter((order) => {
        return order.status === 2;
    });
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
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
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
