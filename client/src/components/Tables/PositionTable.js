import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deletePosition, getPositions } from "../../http/positionAPI";
import CreatePositionModal from "../Modals/CreatePosition";

const PositionTable = () => {

    const [positions, setPositions] = useState([]);

    const fetchData = async () => {
        const positionData = await getPositions();
        positionData.sort((a, b) => a.name.localeCompare(b.name));
        setPositions(positionData);
    };

    const [showPositionModal, setShowPositionModal] = useState(false);

    const handleShowPositionModal = () => {
        setShowPositionModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>

            <Button variant="primary" onClick={handleShowPositionModal} className="mt-3">Добавить должность</Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID должности</th>
                        <th>Название должности</th>
                        <th>Краткое название должности</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.short_name}</td>
                            <td><Button variant="danger" onClick={async () => {await deletePosition(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreatePositionModal show={showPositionModal} onHide={() => {setShowPositionModal(false);fetchData()}} />

        </>
    );
};

export default PositionTable;
