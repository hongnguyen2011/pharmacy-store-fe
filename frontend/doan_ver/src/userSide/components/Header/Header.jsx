import React, { useRef, useEffect, useState } from "react";
import {
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
} from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import "./header.css";
import logo from "../../../assets/images/eco-logo.png";
import icon from "../../../assets/images/user-icon.png";
import { Button } from "antd";
import UploadFile from "../UploadFile";
const nav__links = [
    {
        path: "home",
        display: "Trang chủ",
    },
    {
        path: "shop",
        display: "Cửa hàng",
    },
    {
        path: "cart",
        display: "Giỏ hàng",
    },
    {
        path: "order",
        display: "Lịch sử mua hàng",
    },
];

const Header = () => {
    const [open, setOpen] = useState(false);
    const onSetOpen = () => {
        setOpen(!open);
    };
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userAvatar = currentUser?.data.pathImg
        ? currentUser.data.pathImg
        : icon;
    const userName = currentUser ? currentUser?.data.name : "";
    const menuRef = useRef(null);

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const menuToggle = () => menuRef.current.classList.toggle("active__menu");

    const navigate = useNavigate();
    const navigateToCart = () => {
        navigate("/cart");
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        navigate("/home");
        window.location.reload(false);
    };

    const handleClickLogin = () => {
        navigate("/login");
    };
    return (
        <>
            <header className="sticky__header">
                <Container>
                    <Row>
                        <div className="nav__wrapper">
                            <Link to="/home">
                                <div className="logo">
                                    <img src={logo} alt="logo" />
                                    <div>
                                        <h1>LaS</h1>
                                    </div>
                                </div>
                            </Link>
                            <div
                                className="navigation"
                                ref={menuRef}
                                onClick={menuToggle}
                            >
                                <ul className="menu">
                                    {nav__links.map((item, index) => {
                                        return (
                                            <li
                                                className="nav__item"
                                                key={index}
                                            >
                                                <NavLink
                                                    to={item.path}
                                                    className={(navClass) =>
                                                        navClass.isActive
                                                            ? "nav__active"
                                                            : ""
                                                    }
                                                >
                                                    {item.display}
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <Button type="primary" onClick={onSetOpen}>
                                Upload file tên thuốc cần tìm
                            </Button>

                            <div className="nav__icons">
                                {/* <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span> */}
                                <span
                                    className="cart__icon"
                                    onClick={navigateToCart}
                                >
                                    <i className="ri-shopping-bag-line"></i>
                                    <span className="badge">
                                        {totalQuantity}
                                    </span>
                                </span>
                                <div className="user__group">
                                    <div>
                                        <Dropdown
                                            isOpen={dropdownOpen}
                                            toggle={toggle}
                                        >
                                            <DropdownToggle className="bg-white border-0">
                                                <span>
                                                    <motion.img
                                                        whileTap={{
                                                            scale: 1.2,
                                                        }}
                                                        src={userAvatar}
                                                        alt="userIcon"
                                                    />
                                                </span>
                                            </DropdownToggle>
                                            <DropdownMenu
                                                style={{ marginTop: "20px" }}
                                                className="drop__menu"
                                            >
                                                {currentUser ? (
                                                    <>
                                                        {" "}
                                                        <NavLink
                                                            to="/profile"
                                                            className="text-dark"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            <DropdownItem className="drop__menu--item">
                                                                {" "}
                                                                Tài khoản
                                                            </DropdownItem>
                                                        </NavLink>
                                                        <DropdownItem
                                                            className="drop__menu--item"
                                                            onClick={
                                                                handleLogout
                                                            }
                                                        >
                                                            Đăng xuất
                                                        </DropdownItem>
                                                    </>
                                                ) : (
                                                    <DropdownItem
                                                        className="drop__menu--item"
                                                        onClick={
                                                            handleClickLogin
                                                        }
                                                    >
                                                        Đăng nhập
                                                    </DropdownItem>
                                                )}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    <div>
                                        <span>{userName}</span>
                                    </div>
                                </div>
                                <div className="mobile__menu">
                                    <span onClick={menuToggle}>
                                        <i className="ri-menu-line"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </header>
            {open ? <UploadFile open={open} onSetOpen={onSetOpen} /> : <></>}
        </>
    );
};

export default Header;
