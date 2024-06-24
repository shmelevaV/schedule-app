import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { deleteAud, getJoinedAuds } from "../../http/audAPI";
import CreateAudModal from "../Modals/CreateAud";

// Компонент таблицы аудиторий
const AudTable = () => {
    // Состояние для хранения списка аудиторий
    const [auditoriums, setAuditoriums] = useState([]);

    // Функция для получения данных об аудиториях из БД
    const fetchData = async () => {
        const audData = await getJoinedAuds();
        audData.sort((a, b) => a.number.localeCompare(b.number));
        setAuditoriums(audData);
    };

    // Состояние для управления модальным окном 
    const [showAudModal, setShowAudModal] = useState(false);

    // Обработчик открытия модального окна
    const handleShowAudModal = () => {
        setShowAudModal(true);
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
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
                    {/* Отображаем список аудиторий */}
                    {auditoriums.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.number}</td>
                            <td>{item.capacity}</td>
                            <td>{item.type_list && item.type_list.name ? item.type_list.name : 'NULL'}</td>
                            <td><Button variant="outline-danger"  onClick={async () => {await deleteAud(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Модальное окно для создания новой аудитории */}
            <CreateAudModal show={showAudModal} onHide={() => {setShowAudModal(false);fetchData()}} />
        </>
    );
};

export default AudTable;
