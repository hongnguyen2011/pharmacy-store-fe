import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

import "./footer.css";
import logo from "../../../assets/images/eco-logo.png";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="4" className="mb-4" md="12">
                        <div className="footer__quick-links">
                            <h1 className="text-white">SHIP HÀNG TOÀN QUỐC</h1>
                        </div>
                        <p className="footer__text mt-4">
                            Bệnh viện Chợ Rẫy, Bệnh viện Hùng Vương, Bệnh viện Đa Khoa Phạm
                            Ngọc Thạch, Bệnh Viện Thủ Đức, Bệnh viện Bạch Mai, Bệnh viện Việt
                            Đức, Bệnh viện 108, Bệnh Viện 103, 105, 198, Bệnh viện E, Bệnh
                            viện Thanh Nhàn, Bệnh viện K1, K2, K3, Bệnh viện Đại Học Y, Bệnh
                            Viện Ung Bướu Thanh Hóa, Nghệ An, Hà Tĩnh, Quảng Ninh, Bệnh viện
                            Đa Khoa Quốc Tế Thái Nguyên, Hải Phòng, Bắc Ninh, Bình Dương, Đà
                            Nẵng, Nha Trang...
                        </p>
                    </Col>
                    <Col lg="5" className="mb-4" md="3">
                        <div className="footer__quick-links">
                            <h1 className="text-white">TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM</h1>
                        </div>
                        <p className="footer__text mt-4">
                            Chúng tôi không chiu bất kỳ trách nhiệm nào đối với việc người
                            bệnh tự ý sử dụng những thông tin trên website chia sẻ mà không
                            được Dược sĩ, Bác sĩ tư vấn. Mọi thông tin chỉ mang tính chất tham
                            khảo và mọi vấn đề cần phải được kiểm tra khám bệnh, không được tự
                            ý sử dụng thuốc mà không được sự cho phép của người có chuyên môn.
                        </p>
                    </Col>
                    <Col lg="3" md="3">
                        <div className="footer__quick-links">
                            <h1 className="text-white">THÔNG TIN LIÊN HỆ</h1>
                            <ListGroup className="mb-3 footer__contact">
                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span>
                                        <i className="ri-map-pin-line"></i>
                                    </span>
                                    <p>Đồng Hới - Quảng Bình</p>
                                </ListGroupItem>
                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span>
                                        <i className="ri-phone-line"></i>
                                    </span>
                                    <p>+84912494763</p>
                                </ListGroupItem>
                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span>
                                        <i className="ri-mail-line"></i>
                                    </span>
                                    <p>ndcuong@gmail.com</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col md="12">
                        <p className="footer__copyright">
                            Copyrignt {year} developed by Cuong. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
