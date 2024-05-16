import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { getReqLessons } from "../http/lessonAPI";

const RequestTable = () => {

    const [scheduleReq, setScheduleReq] = useState([]);

    const fetchData = async () => {
        const scheduleDataReq = await getReqLessons();
        setScheduleReq(scheduleDataReq);
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                    {scheduleReq.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{new Date(item.submissionDate).toLocaleDateString()}</td>
                            <td>{item.auditorium_list.number}</td>
                            <td>{item.number}</td>
                            <td>{new Date(item.firstDate).toLocaleDateString()}</td>
                            <td>{item.teacher_list.surname_N_P}</td>
                            <td>{item.period}</td>
                            <td>{item.discipline_list.short_name}</td>
                            <td>{item.group_list.name}</td>
                            <td>{item.status}</td>
                            <td><Button variant="danger">Отменить заявку</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default RequestTable;
