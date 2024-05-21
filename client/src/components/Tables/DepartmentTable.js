import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteDepartment, getDepartments } from "../../http/departmentAPI";
import CreateDepartmentModal from "../Modals/CreateDepartment";

const DepartmentTable = () => {

    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        const departmentData = await getDepartments();
        setDepartments(departmentData);
    };

    const [showDepartmentModal, setShowDepartmentModal] = useState(false);

    const handleShowDepartmentModal = () => {
        setShowDepartmentModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Row >
                <Col md={1}>
                </Col>
                <Col md={11} >
                    <Button variant="primary" onClick={handleShowDepartmentModal}>Добавить кафедру</Button>
                </Col>
            </Row>

            <Row className="mt-3 ">
                <Col md={1}>
                </Col>
                <Col md={11}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID кафедры</th>
                        <th>Название кафедры</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><Button variant="danger" onClick={async () => {await deleteDepartment(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateDepartmentModal show={showDepartmentModal} onHide={() => {setShowDepartmentModal(false);fetchData()}} />
            </Col>
            </Row>
        </>
    );
};

export default DepartmentTable;
