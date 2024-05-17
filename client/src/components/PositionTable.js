import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { getPositions } from "../http/positionAPI";

const PositionTable = () => {

    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        const departmentData = await getPositions();
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
                            <td><Button variant="danger">Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default PositionTable;
