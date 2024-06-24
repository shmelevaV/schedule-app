import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { deleteTeacher, getTeachers } from "../../http/TeacherAPI";
import CreateTeacherModal from "../Modals/CreateTeacher";

// Компонент таблицы преподавателей
const TeacherTable = () => {
    // Состояние для хранения списка преподавателей
    const [teachers, setTeachers] = useState([]);

    // Функция для получения данных о преподавателях из БД
    const fetchData = async () => {
        const teacherData = await getTeachers();
        teacherData.sort((a, b) => a.surname_N_P.localeCompare(b.surname_N_P));    
        setTeachers(teacherData);
    };

    // Состояние для управления модальным окном создания преподавателя
    const [showTeacherModal, setShowTeacherModal] = useState(false);

    // Обработчик открытия модального окна создания преподавателя
    const handleShowTeacherModal = () => {
        setShowTeacherModal(true);
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button variant="primary" onClick={handleShowTeacherModal} className="mt-3">Добавить преподавателя</Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID преподавателя</th>
                        <th>Фамилия И.О.</th>
                        <th>Кафедра</th>
                        <th>Должность</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Отображаем список преподавателей */}
                    {teachers.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.surname_N_P}</td>
                            <td>{item.department_list && item.department_list.name ? item.department_list.name : 'NULL'}</td>
                            <td>{item.position_list && item.position_list.short_name ? item.position_list.short_name : 'NULL'}</td>
                            <td><Button variant="outline-danger" onClick={async () => {await deleteTeacher(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Модальное окно для создания нового преподавателя */}
            <CreateTeacherModal show={showTeacherModal} onHide={() => {setShowTeacherModal(false);fetchData()}} />
        </>
    );
};

export default TeacherTable;
