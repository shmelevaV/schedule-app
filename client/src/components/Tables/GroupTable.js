import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteGroup, getGroups } from "../../http/groupAPI";
import CreateGroupModal from "../Modals/CreateGroup";

const GroupTable = () => {

    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        const groupData = await getGroups();
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
            <Row >
                <Col md={1}>
                </Col>
                <Col md={11} >
                    <Button variant="primary" onClick={handleShowGroupModal}>Добавить группу</Button>
                </Col>
            </Row>
            <Row className="mt-3 ">
                <Col md={1}>
                </Col>
                <Col md={11}>
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
                            <td><Button variant="danger" onClick={async () => {await deleteGroup(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateGroupModal show={showGroupModal} onHide={() => {setShowGroupModal(false);fetchData()}} />
            </Col>
            </Row>
        </>
    );
};

export default GroupTable;
