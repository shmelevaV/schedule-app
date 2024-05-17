import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { getTypes } from "../http/typeAPI";

const TypeTable = () => {

    const [types, setTypes] = useState([]);

    const fetchData = async () => {
        const typeData = await getTypes();
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
                        <th>ID типа аудитории</th>
                        <th>Название типа аудитории</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map((item, index) => (
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

export default TypeTable;
