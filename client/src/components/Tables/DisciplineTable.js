import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteDiscipline, getDisciplines } from "../../http/disciplineAPI";
import CreateDisciplineModal from "../Modals/CreateDiscipline";

const DisciplineTable = () => {

    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        const departmentData = await getDisciplines();
        setDepartments(departmentData);
    };

    const [showDisciplineModal, setShowDisciplineModal] = useState(false);

    const handleShowDisciplineModal = () => {
        setShowDisciplineModal(true);
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
                    <Button variant="primary" onClick={handleShowDisciplineModal}>Добавить дисциплину</Button>
                </Col>
            </Row>
            <Row className="mt-3 ">
                <Col md={1}>
                </Col>
                <Col md={11}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID дисциплины</th>
                        <th>Название дисциплины</th>
                        <th>Краткое название дисциплины</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.short_name}</td>
                            <td><Button variant="danger" onClick={async () => {await deleteDiscipline(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateDisciplineModal show={showDisciplineModal} onHide={() => {setShowDisciplineModal(false);fetchData()}} />
            </Col>
            </Row>
        </>
    );
};

export default DisciplineTable;
