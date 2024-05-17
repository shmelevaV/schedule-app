import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { getJoinedAuds } from "../http/audAPI";

const AudTable = () => {

    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        const departmentData = await getJoinedAuds();
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
                        <th>ID аудитории</th>
                        <th>Номер аудитории</th>
                        <th>Вместимость</th>
                        <th>Тип аудитории</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.number}</td>
                            <td>{item.capacity}</td>
                            <td>{item.type_list.name}</td>
                            <td><Button variant="danger">Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default AudTable;
