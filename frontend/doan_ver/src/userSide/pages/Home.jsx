import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "../styles/home.css";
import Services from "../components/UI/Services";
import Clock from "../components/UI/Clock";

import ProductsList from "../components/UI/ProductsList";

import Helmet from "../components/Helmet/Helmet";
import heroImg from "../../assets/images/hero-img.png";
import counterImg from "../../assets/images/counter-timer-img.png";

import { useSelector } from "react-redux";
import { getAllProductRecommend } from "../../services/recommendServices";
const Home = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const products = useSelector((state) => state.product.products);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    useEffect(() => {
        const currentDate = new Date();
        if (products.lenght !== 0) {
            const filterNewProducts = products
                .filter((item) => {
                    const productCreatedDate = new Date(item.createAt);
                    return (
                        parseFloat(
                            (currentDate - productCreatedDate) /
                                (1000 * 60 * 60 * 24)
                        ) < 30
                    );
                })
                .slice(0, 8);

            const filterTrendingProducts = products
                .filter((item) => item.slug === "thuc-pham-chuc-nang")
                .slice(0, 4);

            setNewProducts(filterNewProducts);
            setTrendingProducts(filterTrendingProducts);
        }
    }, [products]);
    return (
        <Helmet title={"Home"}>
            <section className="hero__section">
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="6">
                            <div className="hero__content">
                                {/* <p className="hero__subtitle">Trending product in {year}</p> */}
                                <h2>NHÀ THUỐC LAS</h2>
                                <p>Đem đến sự hài lòng cho khách hàng</p>
                                <motion.button
                                    whileTap={{ scale: 1.1 }}
                                    className="buy__btn"
                                >
                                    <Link to={currentUser ? "/shop" : "/login"}>
                                        Mua Ngay
                                    </Link>
                                </motion.button>
                            </div>
                        </Col>
                        <Col lg="6" md="6" sm="6">
                            <img src={heroImg} alt="heroImg" />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Services />
            {/* {productRecommend.length !== 0 ? (
                <section className="trending__products">
                    <Container>
                        <Row>
                            <Col lg="12" className="text-center">
                                <h2 className="section__title">
                                    Đề xuất của bạn
                                </h2>
                            </Col>
                            {trendingProducts ? (
                                <ProductsList data={productRecommend} />
                            ) : (
                                <></>
                            )}
                        </Row>
                    </Container>
                </section>
            ) : (
                <></>
            )} */}

            <section className="best__sales">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section__title">
                                Sản phẩm thịnh hành
                            </h2>
                        </Col>
                        {trendingProducts ? (
                            <ProductsList data={trendingProducts} />
                        ) : (
                            <></>
                        )}
                    </Row>
                </Container>
            </section>
            <section className="timer__count">
                <Container>
                    <Row className="timer__count--row">
                        <Col lg="6" md="6" className="count__down-col">
                            <div className="clock__top-content">
                                <h4 className="text-white fs-6 mb-2">
                                    Ưu đãi số lượng có hạn
                                </h4>
                            </div>
                            <Clock />
                            <motion.button
                                whileTap={{ scale: 1.2 }}
                                className="buy__btn store__btn"
                            >
                                <Link to="shop">Ghé thăm cửa hàng</Link>
                            </motion.button>
                        </Col>
                        <Col lg="6" md="6" className="text-end counter__img">
                            <img src={counterImg} alt="#" />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="new__arrivals">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section__title">
                                Những sản phẩm mới
                            </h2>
                        </Col>
                        {newProducts ? (
                            <ProductsList data={newProducts} />
                        ) : (
                            <></>
                        )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Home;
