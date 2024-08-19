import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/userService";
import { getAllUserService } from "../../../services/userService";

export default function User() {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))?.data;
    const token = JSON.parse(localStorage.getItem("token"));

    const [users, setUsers] = useState([]);
    const fetchUser = async () => {
        const result = await getAllUserService(token);
        if (result.data.status === 200) {
            setUsers(result.data.data);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    const onDelete = async (id) => {
        const result = await deleteUser(id);
        if (result.status === 200) {
            toast.success("Xóa thành công!");
            fetchUser();
        } else {
            toast.error("Xóa thất bại!");
        }
    };
    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Tên tài khoản",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
        },
        {
            title: "Vai trò",
            key: "nameRole",
            dataIndex: "nameRole",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Ngày tạo",
            key: "createAt",
            dataIndex: "createAt",
            render: (value) => {
                var date = new Date(value);
                return <>{date.toLocaleDateString()}</>;
            },
        },

        // {
        //     title: "Hành động",
        //     key: "action",
        //     render: (_, record) => (
        //         <>
        //             <Button
        //                 variant="contained"
        //                 color="error"
        //                 disabled={record.id === currentUser.id ? true : false}
        //                 sx={{ marginLeft: "4px" }}
        //                 onClick={() => onDelete(record.id)}
        //             >
        //                 Xóa
        //             </Button>
        //         </>
        //     ),
        // },
    ];
    const rows = users.length > 0 ? users : [];

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "50px",
                }}
            >
                <h2>Danh sách tài khoản</h2>
                <Button
                    style={{
                        marginRight: "100px",
                        padding: "10px",
                    }}
                    color="success"
                    variant="contained"
                    onClick={() => {
                        navigate("/admin/users/add");
                    }}
                >
                    Thêm tài khoản
                </Button>
            </div>
            <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
                <Table columns={columns} dataSource={rows} />
            </div>
        </>
    );
}
