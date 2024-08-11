import React from "react";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import productImg from "../../../assets/images/arm-chair-01.jpg";
import "../../styles/product-card.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice";

const ProductCard = (props) => {
  const { item } = props;

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.image}
            alt="productImg"
          />
          <div className="p-2 product__info">
            <h3 className="product__name">
              <Link reloadDocument to={`/shop/${item.id}`}>{item.name}</Link>
            </h3>
            <span>{item.Category.category_name}</span>
          </div>
          <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
            <span className="price">{item.price }VND</span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
