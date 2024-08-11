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
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import "./Sidebar.css";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    url: "dashboard",
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
    url: "products",
  },
  // {
  //   text: "Category",
  //   icon: <Groups2Outlined />,
  //   url: "category",
  // },
  // {
  //   text: "Blog",
  //   icon: <PublicOutlined />,
  //   url: "blog",
  // },
];

const subNavItemOrder = [
  {
    text: "Pending",
    icon: <PendingOutlinedIcon />,
    url: "pending",
  },
  {
    text: "Deliveried",
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
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, url }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
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
                              color: theme.palette.secondary[100],
                              backgroundColor: theme.palette.secondary[300],
                              textDecoration: "none",
                            }
                          : {
                              color: theme.palette.secondary[100],
                              backgroundColor: "transparent",
                              textDecoration: "none",
                            }
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon
                          className="icon_sidebar"
                          sx={{
                            ml: "2rem",
                            color: theme.palette.secondary[100],
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
                  <ListItemText primary="Order" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {/* <ListItemButton sx={{ paddingLeft: "70px" }}>
                    <ListItemIcon>
                      <PendingOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Pending" />
                  </ListItemButton>
                  <ListItemButton sx={{ paddingLeft: "70px" }}>
                    <ListItemIcon>
                      <DeliveryDiningOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Deliveried" />
                  </ListItemButton> */}
                  {subNavItemOrder.map(({ text, icon, url }) => {
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
                                  color: theme.palette.secondary[100],
                                  backgroundColor: theme.palette.secondary[300],
                                  textDecoration: "none",
                                  paddingLeft: "20px",
                                }
                              : {
                                  color: theme.palette.secondary[100],
                                  backgroundColor: "transparent",
                                  textDecoration: "none",
                                  paddingLeft: "20px",
                                }
                          }
                        >
                          <ListItemButton>
                            <ListItemIcon
                              className="icon_sidebar"
                              sx={{
                                ml: "2rem",
                                color: theme.palette.secondary[100],
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
