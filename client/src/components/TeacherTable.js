import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { getTeachers } from "../http/TeacherAPI";

const TeacherTable = () => {

    const [types, setTypes] = useState([]);

    const fetchData = async () => {
        const typeData = await getTeachers();
        setTypes(typeData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID преподавателя</th>
                        <th>Фамилия И.О.</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.surname_N_P}</td>
                            <td><Button variant="danger">Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default TeacherTable;
