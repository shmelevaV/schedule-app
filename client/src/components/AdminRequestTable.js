import React, { useState } from "react";
import {Table, Modal, Button, Form} from "react-bootstrap";
import './Table.css'; 

const AdminRequestTable = () => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>№ заявки</th>
                        <th>Дата подачи</th>
                        <th>№ аудитории</th>
                        <th>№ пары</th>
                        <th>Дата занятия</th>
                        <th>Преподаватель</th>
                        <th>Периодичность</th>
                        <th>Предмет</th>
                        <th>Группа</th>
                        <th>Cтатус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>01.01.2024</td>
                        <td>1-204</td>
                        <td>3</td>
                        <td>02.01.2024</td>
                        <td>Иванов И.И.</td>
                        <td>2</td>
                        <td>Математика</td>
                        <td>ПМИ-02</td>
                        <td>На рассмотрении</td>
                        <td><Button variant="success">Одобрить заявку</Button></td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default AdminRequestTable;

