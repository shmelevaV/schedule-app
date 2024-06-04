import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { deleteType, getTypes } from "../../http/typeAPI";
import CreateAudType from "../Modals/CreateAudType";

// Компонент таблицы типов аудиторий
const TypeTable = () => {
    // Состояние для хранения списка типов аудиторий
    const [types, setTypes] = useState([]);

    // Функция для получения данных о типах аудиторий из БД
    const fetchData = async () => {
        const typeData = await getTypes();
        setTypes(typeData);
    };

    // Состояние для управления модальным окном создания типа аудитории
    const [showAudTypeModal, setShowAudTypeModal] = useState(false);

    // Обработчик открытия модального окна создания типа аудитории
    const handleShowAudTypeModal = () => {
        setShowAudTypeModal(true);
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
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
                    {/* Отображаем список типов аудиторий */}
                    {types.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><Button variant="danger"  onClick={async () => {await deleteType(item.id);  fetchData();}} >Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Модальное окно для создания нового типа аудитории */}
            <CreateAudType show={showAudTypeModal} onHide={() => {setShowAudTypeModal(false);fetchData()}} />
        </>
    );
};

export default TypeTable;
