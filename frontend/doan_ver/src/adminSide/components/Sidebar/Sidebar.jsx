import React from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import {
    CategoryOutlined,
    ChevronLeft,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import "./Sidebar.css";

const navItems = [
    {
        text: "Trang chủ",
        icon: <HomeOutlined />,
        url: "dashboard",
    },
    {
        text: "Sản phẩm",
        icon: <ShoppingCartOutlined />,
        url: "products",
    },
    {
        text: "Loại sản phẩm",
        icon: <CategoryOutlined />,
        url: "categories",
    },
    {
        text: "Tài khoản",
        icon: <Groups2Outlined />,
        url: "users",
    }
];

const subNavItemOrder = [
    {
        text: "Chờ phê duyệt",
        icon: <PendingOutlinedIcon />,
        url: "pending",
    },
    {
        text: "Đã giao hàng",
        icon: <DeliveryDiningOutlinedIcon />,
        url: "deliveried",
    },
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="0.5rem"
                                >
                                    <Typography variant="h4" fontWeight="bold">
                                        LaS
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton
                                        onClick={() =>
                                            setIsSidebarOpen(!isSidebarOpen)
                                        }
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon, url }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{ m: "2.25rem 0 1rem 3rem" }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                }

                                return (
                                    <ListItem
                                        key={text}
                                        disablePadding
                                        className="listItem__sidebar"
                                    >
                                        <NavLink
                                            to={`/admin/${url}`}
                                            className="nav__link--sidebar"
                                            style={({ isActive }) =>
                                                isActive
                                                    ? {
                                                        color: theme.palette
                                                            .secondary[100],
                                                        backgroundColor:
                                                            theme.palette
                                                                .secondary[300],
                                                        textDecoration:
                                                            "none",
                                                    }
                                                    : {
                                                        color: theme.palette
                                                            .secondary[100],
                                                        backgroundColor:
                                                            "transparent",
                                                        textDecoration:
                                                            "none",
                                                    }
                                            }
                                        >
                                            <ListItemButton>
                                                <ListItemIcon
                                                    className="icon_sidebar"
                                                    sx={{
                                                        ml: "2rem",
                                                        color: theme.palette
                                                            .secondary[100],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </NavLink>
                                    </ListItem>
                                );
                            })}

                            <ListItem
                                disablePadding
                                className="listItem__sidebar"
                                onClick={handleClick}
                                sx={{ color: theme.palette.secondary[100] }}
                            >
                                <ListItemButton>
                                    <ListItemIcon
                                        className="icon_sidebar"
                                        sx={{
                                            ml: "2rem",
                                            color: theme.palette.secondary[100],
                                        }}
                                    >
                                        <ReceiptLongOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary="Danh sách order" />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List
                                    component="div"
                                    disablePadding
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {subNavItemOrder.map(
                                        ({ text, icon, url }) => {
                                            return (
                                                <ListItem
                                                    key={text}
                                                    disablePadding
                                                    className="listItem__sidebar"
                                                >
                                                    <NavLink
                                                        to={`/admin/orders/${url}`}
                                                        className="nav__link--sidebar"
                                                        style={({ isActive }) =>
                                                            isActive
                                                                ? {
                                                                    color: theme
                                                                        .palette
                                                                        .secondary[100],
                                                                    backgroundColor:
                                                                        theme
                                                                            .palette
                                                                            .secondary[300],
                                                                    textDecoration:
                                                                        "none",
                                                                    paddingLeft:
                                                                        "20px",
                                                                }
                                                                : {
                                                                    color: theme
                                                                        .palette
                                                                        .secondary[100],
                                                                    backgroundColor:
                                                                        "transparent",
                                                                    textDecoration:
                                                                        "none",
                                                                    paddingLeft:
                                                                        "20px",
                                                                }
                                                        }
                                                    >
                                                        <ListItemButton>
                                                            <ListItemIcon
                                                                className="icon_sidebar"
                                                                sx={{
                                                                    ml: "2rem",
                                                                    color: theme
                                                                        .palette
                                                                        .secondary[100],
                                                                }}
                                                            >
                                                                {icon}
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={text}
                                                            />
                                                        </ListItemButton>
                                                    </NavLink>
                                                </ListItem>
                                            );
                                        }
                                    )}
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
