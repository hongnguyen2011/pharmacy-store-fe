import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Order = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const user = useSelector((state) => state.user.currentUser);
    const token = useSelector((state) => state.user.token);
    console.log(user, token);
    if (user === undefined) {
        navigate("/login");
    }
    useEffect(() => {
        const id = user.data.id;
        const result = async () => {
            const data = await getAllOrderAnUserService(id, token);
            if (data.data?.status === 200) {
                setOrder(data.data.data);
            }
        };
        result();
    }, []);
    return (
        <div>
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>
                Danh sách lịch sử mua hàng
            </h2>
            {order.length !== 0 ? (
                order.map((item, index) => {
                    return <OrderCard item={item} key={index} />;
                })
            ) : (
                // <div className="loading--api">
                //     <Spinner animation="grow" variant="success" />
                // </div>
                <div></div>
            )}
        </div>
    );
};

export default Order;
