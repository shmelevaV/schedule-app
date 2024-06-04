import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { deleteDepartment, getDepartments } from "../../http/departmentAPI";
import CreateDepartmentModal from "../Modals/CreateDepartment";

// Компонент таблицы кафедр
const DepartmentTable = () => {
    // Состояние для хранения списка кафедр
    const [departments, setDepartments] = useState([]);
    
    // Функция для получения данных об кафедрах из БД
    const fetchData = async () => {
        const departmentData = await getDepartments();
        departmentData.sort((a, b) => a.name.localeCompare(b.name));
        setDepartments(departmentData);
    };
    
    // Состояние для управления модальным окном
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    // Обработчик открытия модального окна
    const handleShowDepartmentModal = () => {
        setShowDepartmentModal(true);
    };
    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button variant="primary" onClick={handleShowDepartmentModal} className="mt-3">Добавить кафедру</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID кафедры</th>
                        <th>Название кафедры</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Отображаем список кафедр */}
                    {departments.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><Button variant="danger" onClick={async () => {await deleteDepartment(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateDepartmentModal show={showDepartmentModal} onHide={() => {setShowDepartmentModal(false);fetchData()}} />
        </>
    );
};

export default DepartmentTable;
