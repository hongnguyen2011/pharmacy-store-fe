import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Upload } from "antd";
import { useContext, useState } from "react";
import readXlsxFile from "read-excel-file";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const UploadFile = ({ open, onSetOpen }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const { onSetData } = useContext(UserContext);
    const props = {
        name: "file",
        maxCount: 1,
        accept: ".xls, .xlsx",
        beforeUpload: (file) => {
            setFile(file);
            return false;
        },
    };
    const handleCancel = () => {
        onSetOpen();
    };
    const handleOk = async () => {
        const listData = await readXlsxFile(file);
        listData.shift();
        var data = [];
        listData.map((items) => {
            data.push(items[1]);
        });
        onSetData(data);
        onSetOpen();
        navigate("/shop");
    };
    return (
        <>
            <Modal
                title="UPLOAD FILE TÊN THUỐC CẦN TÌM"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <Row className="input" gutter={16}>
                        <Col
                            span={24}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>
                                    Click to upload file excel
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
export default UploadFile;
