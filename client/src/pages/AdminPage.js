import React from "react";
import AdminRequestTable from "../components/AdminRequestTable";
import { Container } from "react-bootstrap";

const AdminPage = () =>{
    return (
        <Container className="mt-3">
        <AdminRequestTable/>
        </Container>
    );
};

export default AdminPage;
