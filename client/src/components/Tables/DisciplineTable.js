import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { deleteDiscipline, getDisciplines } from "../../http/disciplineAPI";
import CreateDisciplineModal from "../Modals/CreateDiscipline";

const DisciplineTable = () => {

    const [disciplines, setDisciplines] = useState([]);

    const fetchData = async () => {
        const disciplineData = await getDisciplines();
        disciplineData.sort((a, b) => a.name.localeCompare(b.name));
        setDisciplines(disciplineData);
    };

    const [showDisciplineModal, setShowDisciplineModal] = useState(false);

    const handleShowDisciplineModal = () => {
        setShowDisciplineModal(true);
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>

            <Button variant="primary" onClick={handleShowDisciplineModal} className="mt-3">Добавить дисциплину</Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID дисциплины</th>
                        <th>Название дисциплины</th>
                        <th>Краткое название дисциплины</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplines.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.short_name}</td>
                            <td><Button variant="danger" onClick={async () => {await deleteDiscipline(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateDisciplineModal show={showDisciplineModal} onHide={() => {setShowDisciplineModal(false);fetchData()}} />
        </>
    );
};

export default DisciplineTable;
