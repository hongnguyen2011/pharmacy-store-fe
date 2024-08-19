import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { getDetailsOrderService } from "../../../services/orderServices";
import "../../styles/order-detail.css";
import { VND } from "../../../utils/convertVND";
export const OrderDetail = () => {
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        const fetchGetDetailOrderApi = async () => {
            const respone = await getDetailsOrderService(id, token);
            console.log(respone.data);
            setCartItems(respone.data);
        };

        fetchGetDetailOrderApi();
    }, []);
    return (
        <>
            <Container className="table__order">
                <h3 className="title__order--item"> Chi tiết đơn hàng</h3>
                <Row>
                    <Col lg="12">
                        <table className="table bordered">
                            <thead>
                                <tr>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => {
                                    return <Tr item={item} key={index} />;
                                })}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const Tr = (props) => {
    const { item } = props;

    return (
        <tr>
            <td>
                <img src={item.pathImg} alt="#" />
            </td>
            <td>{item.name}</td>
            <td>{VND.format(item.price)}</td>
            <td>{item.quantity}</td>
            <td>{VND.format(item.price * item.quantity)}</td>
        </tr>
    );
};
