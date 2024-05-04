import React from "react";
import RequestTable from "../components/RequestTable";
import { Container } from "react-bootstrap";

const MyRequests = () =>{
    return (
        <Container className="mt-3">
        <RequestTable/>
        </Container>
    );
};

export default MyRequests;