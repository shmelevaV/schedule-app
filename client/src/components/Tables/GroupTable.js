import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { deleteGroup, getGroups } from "../../http/groupAPI";
import CreateGroupModal from "../Modals/CreateGroup";

// Компонент таблицы групп
const GroupTable = () => {
    // Состояние для хранения списка групп
    const [groups, setGroups] = useState([]);
    // Функция для получения данных о группах из БД
    const fetchData = async () => {
        const groupData = await getGroups();
        groupData.sort((a, b) => a.name.localeCompare(b.name));
        setGroups(groupData);
    };
    // Состояние для управления модальным окном создания группы
    const [showGroupModal, setShowGroupModal] = useState(false);

    // Обработчик открытия модального окна создания группы
    const handleShowGroupModal = () => {
        setShowGroupModal(true);
    };
    // Используем useEffect для вызова fetchData при монтировании компонента
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
                    {/* Отображаем список групп */}
                    {groups.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><Button variant="danger" onClick={async () => {await deleteGroup(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Модальное окно для создания новой группы */}
            <CreateGroupModal show={showGroupModal} onHide={() => {setShowGroupModal(false);fetchData()}} />
        </>
    );
};
export default GroupTable;
