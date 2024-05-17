import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { getLessons2 } from "../http/lessonAPI";

const LessonsTable = () => {

    const [scheduleReq, setScheduleReq] = useState([]);

    const fetchData = async () => {
        const scheduleDataReq = await getLessons2();
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
                        <th>ID занятия</th>
                        <th>№ аудитории</th>
                        <th>№ пары</th>
                        <th>Преподаватель</th>
                        <th>Предмет</th>
                        <th>Группа</th>
                        <th>Дата первого занятия</th>
                        <th>Периодичность</th>
                        <th>Дата последнего занятия</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleReq.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.auditorium_list.number}</td>
                            <td>{item.number}</td>
                            <td>{item.teacher_list.surname_N_P}</td>
                            <td>{item.discipline_list.short_name}</td>
                            <td>{item.group_list.name}</td>
                            <td>{new Date(item.firstDate).toLocaleDateString()}</td>
                            <td>{item.period}</td>
                            <td>{new Date(item.lastDate).toLocaleDateString()}</td>
                            <td><Button variant="danger">Удалить</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default LessonsTable;
