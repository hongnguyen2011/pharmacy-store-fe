import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";
import User from "./pages/User/User";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme/theme";
import InputProduct from "./pages/Product/InputProduct";
import EditProduct from "./pages/Product/EditProduct";
import PendingOrder from "./pages/Order/PendingOrder";
import DeliveriedOrder from "./pages/Order/DeliveriedOrder";
import OrderDetail from "./pages/Order/OrderDetail";
import InputCategory from "./pages/Category/InputCategory";
import EditCategory from "./pages/Category/EditCategory";
import InputUser from "./pages/User/InputUser";
import Dashboard from "./pages/Home/Home";
const HomeAdmin = () => {
    const mode = useSelector((state) => state.globalSlice.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route
                        path="/*"
                        element={<Navigate to="/admin/products" />}
                    />
                    <Route path="/admin/*" element={<Layout />}>

                        <Route path="users" element={<User />} />
                        <Route path="users/add" element={<InputUser />} />
                        <Route path="products" element={<Product />} />
                        <Route path="categories" element={<Category />} />
                        <Route
                            path="category/add"
                            element={<InputCategory />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route
                            path="category/edit/:idProduct"
                            element={<EditCategory />}
                        />
                        <Route path="product/add" element={<InputProduct />} />
                        <Route
                            path="product/edit/:idProduct"
                            element={<EditProduct />}
                        />
                        <Route path="orders/*">
                            <Route path="pending" element={<PendingOrder />} />
                            <Route
                                path="deliveried"
                                element={<DeliveriedOrder />}
                            />
                            <Route
                                path="detail/:idOrder"
                                element={<OrderDetail />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </ThemeProvider>
        </>
    );
};

export default HomeAdmin;
