import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { getGroups } from "../http/groupAPI";

const GroupTable = () => {

    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        const groupData = await getGroups();
        setGroups(groupData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID группы</th>
                        <th>Название группы</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((item, index) => (
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

export default GroupTable;
