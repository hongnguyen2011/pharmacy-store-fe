import React, { useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import "../styles/shop.css";

// import products from "../../assets/data/products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const filterProducts = (products, filterValue, sortValue, searchValue) => {
    const filterProductsSuccess =
        filterValue === "all"
            ? products
            : products.filter((item) => item.Category.category_name === filterValue);

    const filterProductsSuccessClone = [...filterProductsSuccess]
    const sortProductSuccess =
        sortValue === "all"
            ? filterProductsSuccessClone
            : sortValue === "ascending"
                ? filterProductsSuccessClone.sort((a, b) => a.price - b.price)
                : filterProductsSuccessClone.sort((a, b) => b.price - a.price);

    const searchProducts =
        searchValue === ""
            ? sortProductSuccess
            : sortProductSuccess.filter((item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            );
    return searchProducts;
};

const Shop = () => {
    const products = useSelector((state) => state.product.products);
    const [productsData, setProductsData] = useState([]);
    useEffect(() => {
        setProductsData(products);
    }, [products]);
    const [filterValue, setFilterValue] = useState("all");
    const [sortValue, setSortValue] = useState("all");
    const [searchValue, setSearchValue] = useState("");

    const handleFilter = (e) => {
        const currentFilterValue = e.target.value;
        const filterProductsSuccess = filterProducts(
            products,
            currentFilterValue,
            sortValue,
            searchValue
        );

        setFilterValue(currentFilterValue);
        setProductsData(filterProductsSuccess);
    };

    const handleSearch = (e) => {
        const currentSearchValue = e.target.value;
        console.log("currentSearchValue", currentSearchValue);
        const searchedProducts = filterProducts(
            products,
            filterValue,
            sortValue,
            currentSearchValue
        );

        setSearchValue(e.target.value);
        setProductsData(searchedProducts);
    };

    const handleSort = (e) => {
        const sortValue = e.target.value;
        const sortProducts = filterProducts(products, filterValue, sortValue, searchValue);

        setSortValue(sortValue);
        setProductsData(sortProducts);
    };

    return (
        <Helmet title="Shop">
            <CommonSection title="Products" />
            <section>
                <Container>
                    <Row>
                        <Col lg="3" md="6">
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option value="all">Filter By Category</option>
                                    <option value="Sofa">Sofa</option>
                                    <option value="Bàn làm việc">Bàn làm việc</option>
                                    <option value="Đèn">Đèn</option>
                                    <option value="Đồng hồ">Đồng hồ</option>
                                    <option value="Tủ âm tường">Tủ âm tường</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="3" md="6" className="text-end">
                            <div className="filter__widget">
                                <select onChange={handleSort}>
                                    <option value="all">Sort By</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="6" md="12">
                            <div className="search__box" onChange={handleSearch}>
                                <input type="text" placeholder="Search ...." />
                                <span>
                                    <i className="ri-search-line"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        {productsData.length === 0 ? (
                            <h1 className="text-center fs-4">No products are found !</h1>
                        ) : (
                            <ProductsList data={productsData} />
                        )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Shop;
