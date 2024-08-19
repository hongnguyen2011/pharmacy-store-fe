import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
const Order = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const user = JSON.parse(localStorage.getItem('currentUser'))?.data;
    const token = JSON.parse(localStorage.getItem('token'));
    if (user === undefined) {
        navigate("/login");
    }
    useEffect(() => {
        const id = user?.id;
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
