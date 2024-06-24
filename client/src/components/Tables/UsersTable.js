import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { deleteUser, getUsers } from "../../http/userAPI";

// Компонент таблицы пользователей
const UsersTable = () => {
    // Состояние для хранения списка пользователей
    const [departments, setDepartments] = useState([]);

    // Функция для получения данных о пользователях из БД
    const fetchData = async () => {
        const departmentData = await getUsers();
        setDepartments(departmentData);
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID пользователя</th>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>Роль</th>
                        <th>Преподаватель</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Отображаем список пользователей */}
                    {departments.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.login}</td>
                            <td>{item.password}</td>
                            <td>{item.role}</td>
                            <td>{item.teacher_list.surname_N_P}</td>
                            <td><Button variant="outline-danger" onClick={async () => {await deleteUser(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default UsersTable;
