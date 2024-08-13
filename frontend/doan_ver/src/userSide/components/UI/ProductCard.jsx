import React from "react";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/product-card.css";
import { VND } from "../../../utils/convertVND";
const ProductCard = (props) => {
    const { item } = props;
    return (
        <Col lg="3" md="4" className="mb-2">
            <div className="product__item">
                <div className="product__img">
                    <motion.img
                        whileHover={{ scale: 0.9 }}
                        src={item.pathImg}
                        alt="productImg"
                    />
                    <div className="p-2 product__info">
                        <h3
                            className="product__name"
                            style={{ textOverflow: "ellipsis" }}
                        >
                            <Link reloadDocument to={`/shop/${item.id}`}>
                                {item.name}
                            </Link>
                        </h3>
                        <span>{item.categoryName}</span>
                    </div>
                    <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                        <span className="price">{VND.format(item.price)}</span>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default ProductCard;
