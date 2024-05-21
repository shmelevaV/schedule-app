import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deletePosition, getPositions } from "../../http/positionAPI";
import CreatePositionModal from "../Modals/CreatePosition";

const PositionTable = () => {

    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        const departmentData = await getPositions();
        setDepartments(departmentData);
    };

    const [showPositionModal, setShowPositionModal] = useState(false);

    const handleShowPositionModal = () => {
        setShowPositionModal(true);
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
                    <Button variant="primary" onClick={handleShowPositionModal}>Добавить должность</Button>
                </Col>
            </Row>
            <Row className="mt-3 ">
                <Col md={1}>
                </Col>
                <Col md={11}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID должности</th>
                        <th>Название должности</th>
                        <th>Краткое название должности</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.short_name}</td>
                            <td><Button variant="danger" onClick={async () => {await deletePosition(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreatePositionModal show={showPositionModal} onHide={() => {setShowPositionModal(false);fetchData()}} />
            </Col>
            </Row>
        </>
    );
};

export default PositionTable;
