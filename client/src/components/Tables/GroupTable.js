import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteGroup, getGroups } from "../../http/groupAPI";
import CreateGroupModal from "../Modals/CreateGroup";

const GroupTable = () => {

    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        const groupData = await getGroups();
        groupData.sort((a, b) => a.name.localeCompare(b.name));
        setGroups(groupData);
    };

    const [showGroupModal, setShowGroupModal] = useState(false);

    const handleShowGroupModal = () => {
        setShowGroupModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button variant="primary" onClick={handleShowGroupModal} className="mt-3">Добавить группу</Button>

            <Table striped bordered hover className="mt-3">
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
                            <td><Button variant="danger" onClick={async () => {await deleteGroup(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateGroupModal show={showGroupModal} onHide={() => {setShowGroupModal(false);fetchData()}} />
        </>
    );
};

export default GroupTable;
