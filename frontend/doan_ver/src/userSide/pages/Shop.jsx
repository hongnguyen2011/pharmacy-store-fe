import React, { useContext, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CommonSection from "../components/UI/CommonSection";

import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import "../styles/shop.css";

// import products from "../../assets/data/products";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../contexts/UserContext";

const filterProducts = (products, filterValue, sortValue, searchValue) => {
    const filterProductsSuccess =
        filterValue === "all"
            ? products
            : products.filter((item) => item.slug === filterValue);

    const filterProductsSuccessClone = [...filterProductsSuccess];
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
    const { data } = useContext(UserContext);
    const products = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.category.categories);
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
        const sortProducts = filterProducts(
            products,
            filterValue,
            sortValue,
            searchValue
        );

        setSortValue(sortValue);
        setProductsData(sortProducts);
    };
    useEffect(() => {
        if (data.length > 0) {
            const _data = data.map((items) => {
                const result = filterProducts(
                    products,
                    filterValue,
                    sortValue,
                    items
                );
                return result;
            });
            const _result = [].concat(..._data);
            if (_result !== undefined) {
                setProductsData(_result);
            }
        }
    }, [data]);
    console.log(productsData);
    return (
        <Helmet title="Shop">
            <CommonSection title="Sản Phẩm" />
            <section>
                <Container>
                    <Row>
                        <Col lg="3" md="6">
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option value="all">
                                        Lọc theo danh mục
                                    </option>
                                    {categories.map((item, index) => (
                                        <option key={index} value={item.slug}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Col>
                        <Col lg="3" md="6" className="text-end">
                            <div className="filter__widget">
                                <select onChange={handleSort}>
                                    <option value="all">Sắp xếp theo</option>
                                    <option value="ascending">Tăng dần</option>
                                    <option value="descending">Giảm dần</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="6" md="12">
                            <div
                                className="search__box"
                                onChange={handleSearch}
                            >
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
                            <h1 className="text-center fs-4">
                                Hiện tại không có sản phẩm nào!
                            </h1>
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
