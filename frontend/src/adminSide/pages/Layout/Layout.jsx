import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/NavBar";
import { getAllProductsApi } from "../../../redux/slices/productSlice";
import { getAllCategoryApi } from "../../../redux/slices/categorySlice";
import { getAllOrderApi } from "../../../redux/slices/orderSlice";


export default function Layout() {
  const dispatch = useDispatch();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentUser =  JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchGetAllProductsApi = async () => {
      await dispatch(getAllProductsApi());
      await dispatch(getAllCategoryApi());
      await dispatch(getAllOrderApi());
    };

    fetchGetAllProductsApi();
  }, []);
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={currentUser || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={currentUser || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}
