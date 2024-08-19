import React, { useEffect } from "react";
import Header from "../userSide/components/Header/Header";
import Footer from "../userSide/components/Footer/Footer";
import Routers from "../routers/RoutersUserSide";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsApi } from "../redux/slices/productSlice";
import { getAllCartItemApi } from "../redux/slices/cartSlice";
import { getAllCategoryApi } from "../redux/slices/categorySlice";
import { getAllOrderApi } from "../redux/slices/orderSlice.js";
const LayoutUserSide = () => {
    const dispatch = useDispatch();
    const tokenRedux = useSelector((state) => state.user.token);
    const accessToken =
        JSON.parse(localStorage.getItem("token")) === undefined
            ? tokenRedux
            : JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        const fetchGetAllProductsApi = async () => {
            await dispatch(getAllProductsApi());
            await dispatch(getAllCategoryApi());
            await dispatch(getAllOrderApi());
            await dispatch(getAllCartItemApi(accessToken));
        };

        fetchGetAllProductsApi();
    }, [accessToken]);
    return (
        <>
            <Header />
            <div style={{ minHeight: "600px" }}>
                <Routers />
            </div>
            <Footer />
        </>
    );
};

export default LayoutUserSide;
