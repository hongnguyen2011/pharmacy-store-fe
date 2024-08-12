import React from "react";
import { Row } from "@themesberg/react-bootstrap";
import { GeneralInfoForm } from "./GeneralInfoForm";
import "./profile.css";

export default function Profile() {
    return (
        <div className="container container__profile">
            <Row>
                <GeneralInfoForm />
            </Row>
        </div>
    );
}
