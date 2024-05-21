import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { deleteUser, getUsers } from "../../http/userAPI";

const UsersTable = () => {

    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        const departmentData = await getUsers();
        setDepartments(departmentData);
    };

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
                    {departments.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.login}</td>
                            <td>{item.password}</td>
                            <td>{item.role}</td>
                            <td>{item.teacher_list&& item.teacher_list.surname_N_P ? item.teacher_list.surname_N_P : 'NULL'}</td>
                            <td><Button variant="danger" onClick={async () => {await deleteUser(item.id);fetchData();}}>Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default UsersTable;
