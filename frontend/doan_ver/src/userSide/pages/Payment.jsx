import { Modal, Card, Radio, Row, Col, Button } from "antd";
import { useEffect, useState } from "react";
import { createOrderService } from "../../services/orderServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCartItemApi } from "../../redux/slices/cartSlice";
import { getAllOrderApi } from "../../redux/slices/orderSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getOrderNotPayment } from "../../services/cartServices";

const Payment = ({ open, onSetOpen }) => {
    const [isTransport, setIsTransport] = useState(true);
    const [isPayment, setIsPayment] = useState(true);
    const [price, setPrice] = useState();
    const token = JSON.parse(localStorage.getItem("token"));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSuccess = async (type) => {
        const result = await createOrderService(
            type === 0 ? 1 : 2,
            isTransport ? 1 : 0
        );
        if (result.status === 200) {
            toast.success("Đặt hàng thành công!");
            dispatch(getAllCartItemApi(token));
            dispatch(getAllOrderApi());
            navigate("/order");
        } else {
            toast.error("Đặt hàng thất bại!");
        }
    };
    const onCancel = () => {
        onSetOpen();
    };
    const onChange = (e) => {
        setIsTransport(e.target.value);
    };
    const onChangePayment = (e) => {
        setIsPayment(e.target.value);
    };
    const handleGetData = async () => {
        const result = await getOrderNotPayment(token);
        result.status === 200
            ? setPrice((result.total / 23507).toFixed())
            : setPrice();
    };
    useEffect(() => {
        handleGetData();
    }, []);
    return (
        <>
            <Modal
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
                title="THANH TOÁN HOÁ ĐƠN"
                open={open}
            >
                <Card title="HÌNH THỨC VẬN CHUYỂN">
                    <Radio.Group onChange={onChange} value={isTransport}>
                        <Radio value={true}>Chuyển phát nhanh +30.000đ</Radio>
                        <p style={{ marginBottom: "10px" }}>
                            Chúng tôi sẽ liên hệ bạn sớm nhất trong thời gian có
                            thể. Đơn hàng của bạn sẽ được vận chuyển trong thời
                            gian 2-3 ngày làm việc.
                        </p>
                        <Radio value={false}>Giao hàng miễn phí</Radio>
                    </Radio.Group>
                </Card>
                <Card
                    title="HÌNH THỨC THANH TOÁN"
                    style={{ marginTop: "20px" }}
                >
                    <Radio.Group onChange={onChangePayment} value={isPayment}>
                        <Radio style={{ marginBottom: "10px" }} value={true}>
                            Thanh toán bằng thẻ ngân hàng
                        </Radio>
                        <Radio value={false}>Sau khi nhận được hàng</Radio>
                        <p>
                            Nhân viên sẽ liên lạc với bạn và giao hàng. Bạn sẽ
                            trực tiếp thanh toán với nhân viên giao hàng.
                        </p>
                    </Radio.Group>
                </Card>
                <Row style={{ marginTop: "20px" }}>
                    <Col span={10}>
                        <Button block type="primary" ghost onClick={onCancel}>
                            CANCEL
                        </Button>
                    </Col>
                    <Col span={10} offset={4}>
                        {isPayment ? (
                            <PayPalScriptProvider
                                options={{ clientId: "test" }}
                            >
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: price,
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order
                                            .capture()
                                            .then((details) => {
                                                if (
                                                    details.status ===
                                                    "COMPLETED"
                                                ) {
                                                    onSuccess(1);
                                                }
                                            });
                                    }}
                                />
                            </PayPalScriptProvider>
                        ) : (
                            <Button
                                block
                                type="primary"
                                onClick={() => onSuccess(0)}
                            >
                                THANH TOÁN
                            </Button>
                        )}
                    </Col>
                </Row>
            </Modal>
        </>
    );
};
export default Payment;
