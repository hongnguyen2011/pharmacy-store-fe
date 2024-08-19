import React, { useEffect, useState } from "react";
import { getDetailsOrderService } from "../../../services/orderServices";
import { useLocation } from "react-router-dom";
import "./order.css";
import { VND } from "../../../utils/convertVND";
import { Table } from "antd";

export default function OrderDetail() {
    const [orderArray, setOrderArray] = useState([]);
    const { state } = useLocation();
    const order = state;
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        const fetchGetAllOrderAnUserApi = async () => {
            const respone = await getDetailsOrderService(state.id, token);
            setOrderArray(respone.data);
        };
        fetchGetAllOrderAnUserApi();
    }, []);
    const columns = [
        {
            title: "Hình ảnh sản phẩm",
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
        },
        {
            title: "Giá sản phẩm",
            key: "price",
            render: (text) => {
                return <>{VND.format(text.price)}</>;
            },
        },
        {
            title: "Số lượng sản phẩm",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Chi tiết",
            dataIndex: "detail",
            key: "detail",
        },
    ];

    const rows = orderArray.length > 0 ? orderArray : [];

    const converDate = (value) => {
        const date = new Date(value);
        const day = date.toLocaleDateString("en-US");
        const time = date.toLocaleTimeString();
        return day + " " + time;
    };

    return (
        <div className="container px-5">
            <h3 className="mb-2">Chi tiết order</h3>
            <div className="mb-3">
                <p>Tạo lúc: {converDate(order.createAt)}</p>
            </div>
            <div style={{ height: "40vh", width: "100%" }}>
                <Table columns={columns} dataSource={rows} />
            </div>
            <div className="container mt-5">
                <div className="row ">
                    <div className=" col-6 "></div>
                    <div className="col-6 ">
                        <div className="info_price--order">
                            <h4>
                                Tổng tiền ({orderArray.length} sản phẩm) :{" "}
                                {VND.format(order.total)}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
