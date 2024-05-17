import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { getDepartments } from "../http/departmentAPI";

const DepartmentTable = () => {

    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        const departmentData = await getDepartments();
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
                            <td><Button variant="danger">Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default DepartmentTable;
