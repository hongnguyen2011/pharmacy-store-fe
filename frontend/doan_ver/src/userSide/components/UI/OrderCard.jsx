import React from "react";
import {
    Card,
    Container,
    Row,
    CardTitle,
    CardBody,
    CardText,
    Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/order-card.css";
import { VND } from "../../../utils/convertVND";
const OrderCard = (props) => {
    const { item } = props;
    const date = new Date(item.createAt);
    const user = JSON.parse(localStorage.getItem("currentUser"))?.data;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/order/${item.id}`);
    };
    return (
        <>
            <Container>
                <Card className="card__container">
                    <CardTitle className="card__title">
                        Đơn hàng được tạo lúc:{" "}
                        <span>{date.toLocaleString()}</span>
                    </CardTitle>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <CardText>
                                    Số điện thoại: <span>{user?.phone}</span>
                                </CardText>
                                <CardText>
                                    Địa chỉ: <span>{user?.address}</span>
                                </CardText>
                            </Col>
                            <Col>
                                <div>
                                    Trạng thái:
                                    {item.status === 1
                                        ? " Chưa thanh toán"
                                        : item.status === 2
                                        ? " Đang chờ phê duyệt"
                                        : item.status === 3
                                        ? " Đã phê duyệt và chưa thanh toán"
                                        : item.status === 4
                                        ? " Đã phê duyệt và đã thanh toán"
                                        : item.status === 5
                                        ? " Đã giao"
                                        : " Khởi tạo"}
                                </div>
                            </Col>
                            <Col md={3} className="drop__detail">
                                <CardText>
                                    Tổng tiền:{" "}
                                    <span>{VND.format(item?.total)}</span>
                                </CardText>
                                <button
                                    className="buy__btn detail__btn"
                                    onClick={handleClick}
                                >
                                    Chi tiết
                                </button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default OrderCard;
