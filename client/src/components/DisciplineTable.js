import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { getDisciplines } from "../http/disciplineAPI";

const DisciplineTable = () => {

    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        const departmentData = await getDisciplines();
        setDepartments(departmentData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
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
                            <td><Button variant="danger">Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default DisciplineTable;
