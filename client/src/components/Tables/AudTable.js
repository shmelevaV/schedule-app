import React, { useEffect, useState } from "react";
import {Table, Button, Row, Col} from "react-bootstrap";
import { deleteAud, getJoinedAuds } from "../../http/audAPI";
import CreateAudModal from "../Modals/CreateAud";

const AudTable = () => {

    const [auditoriums, setAuditoriums] = useState([]);

    const fetchData = async () => {
        const audData = await getJoinedAuds();
        audData.sort((a, b) => a.number.localeCompare(b.number));
        setAuditoriums(audData);
    };

    const [showAudModal, setShowAudModal] = useState(false);

    const handleShowAudModal = () => {
        setShowAudModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>

            <Button variant="primary" onClick={handleShowAudModal}  className="mt-3">Добавить аудиторию</Button>

            <Table striped bordered hover className="mt-3">
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
                    {auditoriums.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.number}</td>
                            <td>{item.capacity}</td>
                            <td>{item.type_list && item.type_list.name ? item.type_list.name : 'NULL'}</td>
                            <td><Button variant="danger"  onClick={async () => {await deleteAud(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <CreateAudModal show={showAudModal} onHide={() => {setShowAudModal(false);fetchData()}} />

        </>
    );
};

export default AudTable;
