import React from "react";
import AdminRequestTable from "../components/AdminRequestTable";
import { Col, Container, Row } from "react-bootstrap";
import TableBar from "../components/TableBar";

const AdminPage = () =>{
    return (
        <Container className="mt-3">
            <Row>
            <Col md={3}>
                <TableBar/>
            </Col>
            <Col md={9}>
                <AdminRequestTable/>
            </Col>
            </Row>
        </Container>
    );
};

export default AdminPage;
