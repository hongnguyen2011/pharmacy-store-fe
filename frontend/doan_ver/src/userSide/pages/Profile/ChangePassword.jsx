import { Modal, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePasswordService } from "../../../services/userService";

const ChangePassword = (props) => {
    const [data, setData] = useState();
    const user = JSON.parse(localStorage.getItem("currentUser"))?.data;
    const token = JSON.parse(localStorage.getItem("token"));
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setData({ ...data, [name]: value });
    };
    const handleOk = () => {
        if (data.newPassword.localeCompare(data.pass_confirm) === 0) {
            const handle = async () => {
                delete data.pass_confirm;
                const _data = { ...data, idUser: user.id };
                const result = await changePasswordService(_data, token);
                const _result = result.data;
                if (_result.status === 200) {
                    toast.success(_result.message);
                    props.onOpen();
                } else {
                    toast.error(_result.message);
                }
            };
            handle();
        } else {
            toast.error("Xác nhận mật khẩu không đúng, vui lòng nhập lại!");
        }
    };
    const handleCancel = () => {
        props.onOpen();
    };
    return (
        <Modal
            title="Change Password"
            open={props.open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Input.Password
                name="oldPassword"
                placeholder="Nhập mật khẩu cũ.."
                className="mt-3"
                onChange={handleChange}
            />
            <Input.Password
                placeholder="Nhập mật khẩu mới.."
                className="mt-3"
                name="newPassword"
                onChange={handleChange}
            />
            <Input.Password
                placeholder="Nhập lại mật khẩu mới.."
                className="mt-3"
                name="pass_confirm"
                onChange={handleChange}
            />
        </Modal>
    );
};
export default ChangePassword;
