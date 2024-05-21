import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteTeacher, getTeachers } from "../../http/TeacherAPI";
import CreateTeacherModal from "../Modals/CreateTeacher";

const TeacherTable = () => {

    const [types, setTypes] = useState([]);

    const fetchData = async () => {
        const typeData = await getTeachers();
        setTypes(typeData);
    };

    const [showTeacherModal, setShowTeacherModal] = useState(false);

    const handleShowTeacherModal = () => {
        setShowTeacherModal(true);
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
                    <Button variant="primary" onClick={handleShowTeacherModal}>Добавить преподавателя</Button>
                </Col>
            </Row>
            <Row className="mt-3 ">
                <Col md={1}>
                </Col>
                <Col md={11}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID преподавателя</th>
                        <th>Фамилия И.О.</th>
                        <th>Кафедра</th>
                        <th>Должность</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.surname_N_P}</td>
                            <td>{item.department_list && item.department_list.name ? item.department_list.name : 'NULL'}</td>
                            <td>{item.position_list && item.position_list.short_name ? item.position_list.short_name : 'NULL'}</td>
                            <td><Button variant="danger" onClick={async () => {await deleteTeacher(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateTeacherModal show={showTeacherModal} onHide={() => {setShowTeacherModal(false);fetchData()}} />
            </Col>
            </Row>
        </>
    );
};

export default TeacherTable;
