import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { getDetailsOrderService } from "../../../services/orderServices";
import "../../styles/order-detail.css";

export const OrderDetail = () => {
  const { id } = useParams();
  const accessToken = JSON.parse(localStorage.getItem("token"));
  const [cartItems, setCartItems] = useState([]);
  const [date, setDate] = useState();

  useEffect(() => {
    const dataOrderDetail = {
      id,
      accessToken,
    };
    const fetchGetDetailOrderApi = async () => {
      const respone = await getDetailsOrderService(dataOrderDetail);
      console.log(respone.data);
      setCartItems(respone.data);
      const date = new Date(respone.data[0].Order.createdAt);
      setDate(date);
    };

    fetchGetDetailOrderApi();
  }, []);
  return (
    <>
      <Container className="table__order">
        <h5 className="title__order--item">
          {" "}
          The order created at: <span>{date ? date.toLocaleDateString("en-US") : ""}</span>
        </h5>
        <Row>
          <Col lg="12">
            <table className="table bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
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
        <img src={item.Product.image} alt="#" />
      </td>
      <td>{item.Product.name}</td>
      <td>{item.Product.price}</td>
      <td>{item.quantity}</td>
      <td>{item.Order.total_order} VND</td>
    </tr>
  );
};
