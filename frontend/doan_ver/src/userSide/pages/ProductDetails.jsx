import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Progress } from "reactstrap";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCartApi } from "../../redux/slices/cartSlice";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ProductsList from "../components/UI/ProductsList";
import { getAllCartItemApi } from "../../redux/slices/cartSlice";
import "../styles/product-details.css";
import { toast } from "react-toastify";
import { getDetailService } from "../../services/productService";
const ProductDetails = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = JSON.parse(localStorage.getItem("token"));
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState({});
    const [countAddCart, setCountAddCart] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingCart, setLoadingCart] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchDetailProductApi = async () => {
            setLoading(true);
            const responeProduct = await getDetailService(id);
            const productDetail = {
                id: responeProduct.data?.id,
                name: responeProduct.data?.name,
                image: responeProduct.data?.pathImg,
                price: responeProduct.data?.price,
                description: responeProduct.data?.detail,
                category: responeProduct.category?.name,
                type: responeProduct.data?.type,
                quantity: responeProduct.data?.quantity,
                idCategory: responeProduct.category?.id,
            };
            setProductDetail(productDetail);
            setLoading(false);
        };
        fetchDetailProductApi();
    }, []);

    const products = useSelector((state) => state.product.products);
    const data = products.filter(
        (item) => item.idCategory === productDetail.idCategory
    );
    const addToCart = () => {
        const data = {
            idProduct: productDetail.id,
            quantity: countAddCart,
            price: productDetail.price,
        };
        const dataCart = {
            accessToken: token,
            data,
        };
        const fetchAddProductToCartApi = async () => {
            setLoadingCart(true);
            dispatch(addProductToCartApi(dataCart));
            dispatch(getAllCartItemApi(token));
            setLoadingCart(false);
            toast.success(
                `Thêm ${productDetail.name} vào giỏ hàng thành công!`
            );
        };
        if (currentUser?.data !== undefined) {
            fetchAddProductToCartApi();
        } else {
            toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productDetail]);

    return (
        <Helmet title={productDetail.name}>
            {loadingCart ? (
                <Progress animated value="100" className="progress"></Progress>
            ) : (
                ""
            )}
            <CommonSection title={productDetail.name} />
            {loading === true ? (
                <div className="loading--api">
                    <Spinner animation="grow" variant="success" />
                </div>
            ) : (
                <>
                    <section>
                        <Container>
                            <Row>
                                <Col lg="6">
                                    <img src={productDetail.image} alt="" />
                                </Col>
                                <Col>
                                    <div className="product__details">
                                        <h2>{productDetail.name}</h2>
                                        <div className="d-flex align-items-center gap-5">
                                            <span className="product__price">
                                                {productDetail.price} VND
                                            </span>
                                            <span>
                                                Loại sản phẩm :{" "}
                                                {productDetail.category
                                                    ? productDetail.category.toUpperCase()
                                                    : ""}
                                            </span>
                                        </div>
                                        <p className="mt-3">
                                            {productDetail.description}
                                        </p>
                                        <div className="btn--group__addCart">
                                            <button
                                                className="btn--sub__addCart"
                                                onClick={() => {
                                                    let count =
                                                        countAddCart === 1
                                                            ? 1
                                                            : countAddCart - 1;
                                                    setCountAddCart(count);
                                                }}
                                            >
                                                <i className="ri-subtract-fill"></i>
                                            </button>

                                            <div className="btn--sub__count">
                                                <p>{countAddCart}</p>
                                            </div>
                                            <button
                                                className="btn--sub__addCart"
                                                onClick={() =>
                                                    setCountAddCart(
                                                        countAddCart + 1
                                                    )
                                                }
                                            >
                                                <i className="ri-add-fill"></i>
                                            </button>
                                        </div>
                                        <motion.button
                                            whileTap={{ scale: 1.2 }}
                                            className="buy__btn btn__addCart"
                                            onClick={addToCart}
                                        >
                                            Thêm vào giỏ
                                        </motion.button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <section>
                        <Container>
                            <Row
                                style={{
                                    textAlign: "center",
                                    marginBottom: "100px",
                                }}
                            >
                                <h1>Các sản phẩm tương tự</h1>
                            </Row>
                            <Row>
                                {products.length === 0 ? (
                                    <h1 className="text-center fs-4">
                                        Hiện tại không có sản phẩm nào!
                                    </h1>
                                ) : (
                                    <ProductsList data={data} />
                                )}
                            </Row>
                        </Container>
                    </section>
                </>
            )}
        </Helmet>
    );
};

export default ProductDetails;
