import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteType, getTypes } from "../../http/typeAPI";
import CreateAudType from "../Modals/CreateAudType";

const TypeTable = () => {

    const [types, setTypes] = useState([]);

    const fetchData = async () => {
        const typeData = await getTypes();
        setTypes(typeData);
    };
    const [showAudTypeModal, setShowAudTypeModal] = useState(false);

    const handleShowAudTypeModal = () => {
        setShowAudTypeModal(true);
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
                <Button variant="primary" onClick={handleShowAudTypeModal}>Добавить тип</Button>
            </Col>
        </Row>
        <Row className="mt-3 ">
            <Col md={1}>
            </Col>
            <Col md={11} >
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
                            <td><Button variant="danger"  onClick={async () => {await deleteType(item.id);  fetchData();}} >Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Col>
            <CreateAudType show={showAudTypeModal} onHide={() => {setShowAudTypeModal(false);fetchData()}} />
            </Row>
        </>
    );
};

export default TypeTable;
