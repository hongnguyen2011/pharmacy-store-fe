import React from 'react';
import { Col, Row } from '@themesberg/react-bootstrap';
import { GeneralInfoForm } from './GeneralInfoForm';
import { ProfileCardWidget } from './ProfileCardWidget';
import "./profile.css"

export default function Profile() {
  return (
    <div className="container container__profile">
    <Row >
        <Col xs={12} xl={8}>
          <GeneralInfoForm />
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget />
            </Col>
          </Row>
        </Col>
      </Row></div>
  )
}
