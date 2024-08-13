import { Row, Col, Card } from "antd";
import LineChart from "./LineChart";

const Dashboard = () => {
    return (
        <Row gutter={[24, 0]} style={{ justifyContent: "center" }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
                <Card bordered={false} className="criclebox h-full">
                    <LineChart />
                </Card>
            </Col>
        </Row>
    )
}
export default Dashboard;