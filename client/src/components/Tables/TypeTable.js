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
            <Button variant="primary" onClick={handleShowAudTypeModal} className="mt-3">Добавить тип</Button>
            <Table striped bordered hover className="mt-3">
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
            <CreateAudType show={showAudTypeModal} onHide={() => {setShowAudTypeModal(false);fetchData()}} />
        </>
    );
};

export default TypeTable;
