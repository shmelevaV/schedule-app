import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteTeacher, getTeachers } from "../../http/TeacherAPI";
import CreateTeacherModal from "../Modals/CreateTeacher";

const TeacherTable = () => {

    const [teachers, setTeachers] = useState([]);

    const fetchData = async () => {
        const teacherData = await getTeachers();
        teacherData.sort((a, b) => a.surname_N_P.localeCompare(b.surname_N_P));    
        setTeachers(teacherData);
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
            <Button variant="primary" onClick={handleShowTeacherModal} className="mt-3">Добавить преподавателя</Button>

            <Table striped bordered hover className="mt-3">
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
                    {teachers.map((item, index) => (
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
        </>
    );
};

export default TeacherTable;
