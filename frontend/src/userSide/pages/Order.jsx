import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "reactstrap";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Order = () => {
    const navigate = useNavigate();
    const orderArray = useSelector((state) => state.orderSlice.listOrder);
    const user = JSON.parse(localStorage.getItem("currentUser"))?.data;
    if (user === undefined) {
        navigate("/login");
    }
    return (
        <div>
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>
                Danh sách lịch sử mua hàng
            </h2>
            {orderArray.length !== 0 ? (
                orderArray.map((item, index) => {
                    return <OrderCard item={item} key={index} />;
                })
            ) : (
                <div className="loading--api">
                    <Spinner animation="grow" variant="success" />
                </div>
            )}
        </div>
    );
};

export default Order;
